package edu.kh.haezo.payment.model.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.payment.model.dao.PaymentDAO;
import edu.kh.haezo.payment.model.dto.Payment;

@Service
public class PaymentServiceImpl implements PaymentService{
	
	@Autowired
	private PaymentDAO dao;

	// 포인트 충전 결제
	@Override
	public int insertPayment(Payment payment) {
		return dao.insertPayment(payment);
	}

	// 포인트 출금 신청
	@Override
	public int withdrawPoint(Payment payment, Member loginMember) {
		// 반환할 결과 변수
		int result = -1;
		// 1) 현재 보유한 포인트 총 합계 조회
		int totalAmount = dao.remainingAmount(loginMember);
		
		if(totalAmount >= payment.getAmount()) { // 보유한 포인트가 출금할 포인트보다 많은 경우
			// 2) 포인트 출금신청 정보 삽입
			result = dao.insertBalance(payment);
			
			if(result > 0) { // 출금신청 정보 삽입 성공 시
				// 보유한 포인트 총 합계 다시 한번 조회해서 헤더에서 조회 가능하도록 하기
				return dao.remainingAmount(loginMember);
			} 
		}
		// 보유한 포인트가 출금할 포인트보다 적은 경우 -1 반환
		return result;
	}
	
	// 잔액 조회
	@Override
	public int remainingAmount(Member loginMember) {
		return dao.remainingAmount(loginMember);
	}

	// paymentKey 조회
	@Override
	public List<String> selectPaymentKeys(int memberNo) {
		return dao.selectPaymentKeys(memberNo);
	}

	// 결제 내역 조회(토스페이먼츠 API)
	@Override
	public List<Map<String, Object>> getPaymentList(int memberNo, int offset, int limit) throws IOException, InterruptedException, ParseException {
		
		List<Map<String, Object>> paymentList = new ArrayList<>();
		
		Set<String> addedPaymentKeys = new HashSet<>();

        DateTimeFormatter inputFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        Base64.Encoder encoder = Base64.getEncoder();
        byte[] encodedBytes = encoder.encode((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));
        String authorizations = "Basic " + new String(encodedBytes);
        
        int targetSize = limit;  // 반환할 데이터 개수 (예: 10개)
        int currentOffset = offset;  // 페이징 오프셋
        
        List<String> selectPaymentKeys = dao.selectPaymentKeys(memberNo);
        
        // 우선 최대한 유효한 데이터만 쌓아봄
        while (paymentList.size() < targetSize) {

            // 페이징된 키 리스트만 사용 (offset 적용)
            List<String> pagedKeys = selectPaymentKeys.stream()
                .skip(currentOffset)
                .limit(targetSize - paymentList.size())  // 부족한 만큼만 요청
                .collect(Collectors.toList());

            if (pagedKeys.isEmpty()) break; // 더 이상 불러올 데이터가 없으면 중단

            for (String paymentKey : pagedKeys) {
                if (addedPaymentKeys.contains(paymentKey)) continue; // 이미 추가된 키는 건너뛰기

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://api.tosspayments.com/v1/payments/" + paymentKey))
                        .header("Authorization", authorizations)
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(response.body());

                if (json.get("orderName") != null) { // 유효한 데이터만 추가
                    Map<String, Object> paymentData = new HashMap<>();
                    paymentData.put("orderName", json.get("orderName"));
                    paymentData.put("approvedAt", OffsetDateTime.parse((String) json.get("approvedAt"), inputFormatter).format(outputFormatter));
                    paymentData.put("method", json.get("method"));
                    paymentData.put("totalAmount", String.valueOf(json.get("totalAmount")));

                    if (json.containsKey("card") && json.get("card") != null) {
                        JSONObject card = (JSONObject) json.get("card");
                        paymentData.put("cardType", card.get("cardType"));
                    }
                    if (json.containsKey("receipt") && json.get("receipt") != null) {
                        JSONObject receipt = (JSONObject) json.get("receipt");
                        paymentData.put("receiptUrl", receipt.get("url"));
                    }
                    
                    paymentList.add(paymentData);
                    addedPaymentKeys.add(paymentKey);  // 이미 추가한 키는 Set에 기록
                }
                
            	// orderName이 null인 경우에도 추가 데이터 요청을 위해 넘어가게 처리
                // 무한 루프 방지 및 offset 갱신
                currentOffset++;  // 적어도 하나의 키가 처리되었으므로 offset 갱신
            }
            
            // 현재 offset 갱신
            currentOffset += pagedKeys.size();

            // 이미 필요한 개수만큼 데이터가 쌓였다면 중단
            if (paymentList.size() >= targetSize) {
                break;
            }
        }

        // 만약 유효한 데이터가 targetSize(10개)보다 적을 경우 부족한 만큼 추가로 요청
        if (paymentList.size() < targetSize) {
            int additionalSize = targetSize - paymentList.size();
            
            // 부족한 데이터만큼 추가로 요청
            List<String> pagedKeys = selectPaymentKeys.stream()
                .skip(currentOffset)
                .limit(additionalSize)
                .collect(Collectors.toList());

            for (String paymentKey : pagedKeys) {
                if (addedPaymentKeys.contains(paymentKey)) continue; // 이미 추가된 키는 건너뛰기

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("https://api.tosspayments.com/v1/payments/" + paymentKey))
                        .header("Authorization", authorizations)
                        .method("GET", HttpRequest.BodyPublishers.noBody())
                        .build();

                HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
                JSONParser parser = new JSONParser();
                JSONObject json = (JSONObject) parser.parse(response.body());

                if (json.get("orderName") != null) { // 유효한 데이터만 추가
                    Map<String, Object> paymentData = new HashMap<>();
                    paymentData.put("orderName", json.get("orderName"));
                    paymentData.put("approvedAt", OffsetDateTime.parse((String) json.get("approvedAt"), inputFormatter).format(outputFormatter));
                    paymentData.put("method", json.get("method"));
                    paymentData.put("totalAmount", String.valueOf(json.get("totalAmount")));

                    if (json.containsKey("card") && json.get("card") != null) {
                        JSONObject card = (JSONObject) json.get("card");
                        paymentData.put("cardType", card.get("cardType"));
                    }
                    if (json.containsKey("receipt") && json.get("receipt") != null) {
                        JSONObject receipt = (JSONObject) json.get("receipt");
                        paymentData.put("receiptUrl", receipt.get("url"));
                    }

                    paymentList.add(paymentData);
                    addedPaymentKeys.add(paymentKey);  // 이미 추가한 키는 Set에 기록
                }
            }
            // 추가 데이터 요청 후 offset 갱신
            currentOffset += pagedKeys.size();
        }

        // 만약 여전히 유효한 데이터가 부족하다면, 처음에 쌓은 데이터만 반환
        if (paymentList.size() < targetSize) {
            return paymentList.subList(0, paymentList.size());  // 쌓인 데이터만 반환
        }
        return paymentList;
	}
	
}
