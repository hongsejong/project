package edu.kh.haezo.payment.controller;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.payment.model.dto.Payment;
import edu.kh.haezo.payment.model.service.PaymentService;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
public class WidgetController {
	
	@Autowired
	private PaymentService service;
		
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    // 결제 화면 전환
    @GetMapping("/checkout")
    public String checkOut(@RequestParam String totalAmount, Model model) {
    	int amount = Integer.parseInt(totalAmount);
    	model.addAttribute("amount", amount);
    	return "payment/checkout";
    }

    // 포인트 충전 결제
    @Transactional // 트랜잭션 적용 : DB 저장 & API 요청을 하나로 묶음
    @RequestMapping(value = "/confirm")
    public ResponseEntity<JSONObject> confirmPayment(@RequestBody String jsonBody, @SessionAttribute("loginMember") Member loginMember) throws Exception {

    	// 로깅을 위한 Logger 선언
    	Logger logger = LoggerFactory.getLogger(getClass());
    	
        JSONParser parser = new JSONParser();
        String orderId;
        String amount;
        String paymentKey;
        
        try {
            // 클라이언트에서 받은 JSON 요청 바디(JSON 파싱)
            JSONObject requestData = (JSONObject) parser.parse(jsonBody);
            paymentKey = (String) requestData.get("paymentKey");
            orderId = (String) requestData.get("orderId");
            amount = (String) requestData.get("amount");
            
            // 결제 정보 객체 생성
            Payment payment = new Payment();
            payment.setPaymentKey(paymentKey);
            payment.setOrderId(orderId);
            payment.setAmount(Integer.parseInt(amount));
            payment.setMemberNo(loginMember.getMemberNo());
            payment.setPaymentType("charge");
            payment.setPaymentDesc((String)requestData.get("orderName"));
            
            // DB에 결제 정보 저장
            int result = service.insertPayment(payment);
            
            // DB에 결제 정보 저장 실패 시 예외 발생
            if(result == 0) {
            	String errorMessage = "DB 결제 정보 저장 실패 : orderId=" + orderId;
            	logger.error(errorMessage); // 로그에 기록
            	throw new RuntimeException(errorMessage);
            }
            
            // 토스페이먼츠 API 결제 승인 요청
            String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
            Base64.Encoder encoder = Base64.getEncoder();
            byte[] encodedBytes = encoder.encode((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));
            String authorizations = "Basic " + new String(encodedBytes);
            
            // JSON 객체 생성
            JSONObject obj = new JSONObject();
            obj.put("orderId", orderId);
            obj.put("amount", amount);
            obj.put("paymentKey", paymentKey);
            
            // HTTP 요청 전송
            URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Authorization", authorizations);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            
            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(obj.toString().getBytes("UTF-8"));
            
            // 응답 코드 확인
            int code = connection.getResponseCode();
            boolean isSuccess = code == 200;
            
            // 결제 승인 실패 시 예외 발생 + 트랜잭션 롤백
            if(!isSuccess) {
            	InputStream errorStream = connection.getErrorStream();
            	Reader errorReader = new InputStreamReader(errorStream, StandardCharsets.UTF_8);
            	JSONObject errorResponse = (JSONObject) parser.parse(errorReader);
            	errorStream.close();
            	
            	String errorMessage = "토스페이먼츠 결제 승인 실패 :" + errorResponse.toJSONString();
            	logger.error(errorMessage);
            	throw new RuntimeException(errorMessage);
            }
            
            // 결제승인 성공 처리
            InputStream responseStream = connection.getInputStream();
            Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8);
            JSONObject jsonObject = (JSONObject) parser.parse(reader);
            responseStream.close();
            
            String successMessage = "결제 승인 성공 : " + jsonObject.toJSONString();
            logger.info(successMessage);
            
            return ResponseEntity.status(code).body(jsonObject);
            
        } catch (ParseException e) {
        	String errorMessage = "JSON 파싱 오류" + e.getMessage();
        	logger.error(errorMessage);
        	throw new RuntimeException(errorMessage);
        } catch (Exception e) {
        	// 기타 예외 처리
        	String errorMessage = "알 수 없는 오류 발생 : " + e.getMessage();
        	logger.error(errorMessage);
        	throw new RuntimeException(errorMessage);
        }
    }
    
    // 충전 결제 성공 시 화면 전환
    @GetMapping("/success")
    public String paymentSuccess(Payment payment, Model model) {
    	model.addAttribute("payment", payment);
    	return "payment/success";
    }
    
    // 포인트 출금
    @PostMapping("/withdrawPoint")
    @ResponseBody
    public Map<String, Object> withdrawPoint(@RequestParam Map<String, Object> paramMap,
    		@SessionAttribute("loginMember") Member loginMember) {
    	
    	Map<String, Object> response = new HashMap<>();
    	
    	Payment payment = new Payment();
    	payment.setAmount(Integer.parseInt((String)paramMap.get("amount")));
    	payment.setMemberNo(loginMember.getMemberNo());
    	payment.setOrderId((String)paramMap.get("accountHolder")); // 예금주명
    	// 은행명과 계좌번호를 하나의 문자열로 합치기
        String bankAndAccountNumber = (String)paramMap.get("bank")+"-"+(String)paramMap.get("accountNumber");
        payment.setPaymentKey(bankAndAccountNumber); // 은행 + 계좌번호
    	
    	int afterTotalAmount = service.withdrawPoint(payment, loginMember);
    	
    	if(afterTotalAmount != -1) {
    		// 출금 정보 삽입 성공 시
    		response.put("amount", Integer.parseInt((String)paramMap.get("amount")));
    		response.put("afterTotalAmount", afterTotalAmount);
    		response.put("withdrawResult", "success");
    	} else {
    		response.put("withdrawResult", "fail");
    	}
    	return response;
    }
    
    /** 잔액 조회
     * @param loginMember
     * @return amount
     */
    @GetMapping("/remainingAmount")
    @ResponseBody
    public int remainingAmount(@SessionAttribute("loginMember") Member loginMember) {
    	return service.remainingAmount(loginMember);
    }
    
    /** 내역 조회 화면 페이지로 이동
     * @return
     */
    @GetMapping("/selectPayment2")
    public String selectPayment2() {
    	return "payment/selectPayment2";
    }
    
    /** 내역 조회
     * @param loginMember
     * @param offset
     * @param limit
     * @return 결제 내역(토스페이먼츠 API)
     * @throws IOException
     * @throws InterruptedException
     * @throws ParseException
     */
    @GetMapping("/selectPaymentData")
    @ResponseBody
    public ResponseEntity<List<Map<String, Object>>> selectPaymentData(
            @SessionAttribute("loginMember") Member loginMember,
            @RequestParam("offset") int offset,
            @RequestParam("limit") int limit) throws IOException, InterruptedException, ParseException {

        List<Map<String, Object>> paymentList = service.getPaymentList(loginMember.getMemberNo(), offset, limit);
        
        return ResponseEntity.ok(paymentList);
    }
    
    
}