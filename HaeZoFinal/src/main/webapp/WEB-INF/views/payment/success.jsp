<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-Logo.WebP" />
    <link rel="stylesheet" type="text/css" href="/resources/css/payment-style.css" />
    <title>토스페이먼츠 샘플 프로젝트(TossPayments API 승인 성공 시)</title>
  </head>

  <body>
    <div class="box_section" style="width: 600px">
      <div id="imgAndTitle">
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
        <h2>결제를 완료했어요</h2>
      </div>
      <div class="p-grid typography--p">
        <div class="p-grid-col text--left"><b>결제금액</b></div>
        <div class="p-grid-col text--right" id="amount"></div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>주문번호</b></div>
        <div class="p-grid-col text--right" id="orderId"></div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>paymentKey</b></div>
        <div class="p-grid-col text--right" id="paymentKey" style="white-space: initial; width: 250px"></div>
      </div>
    </div>
    <div class="box_section" style="width: 600px; text-align: left">
      <b>포인트 충전 결과를 안내드립니다.</b>
      <div id="response" style="white-space: initial"></div>
    </div>

    <script>
      // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
      // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.

      // URL 파라미터에서 결제 정보 가져오기
      const urlParams = new URLSearchParams(window.location.search);

      // 서버로 결제 승인 요청 보내기
      async function confirm() {
        var requestData = {
          paymentKey: urlParams.get("paymentKey"),
          orderId: urlParams.get("orderId"),
          amount: urlParams.get("amount"),
          orderName : urlParams.get("orderName"),
        };

        try{
          const response = await fetch("/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });
  
          const json = await response.json();
          
          // 결제 실패인 경우
          if (!response.ok) {
            console.error("결제 승인 실패:", json);
            // 실패 로그 저장
            alert("결제가 실패했습니다." + json.message + "(코드:" + json.code + ")");
            // 실패 페이지로 이동
            window.location.href = `/fail?message=${json.message}&code=${json.code}`;
            return;
          }

          // 결제 성공 시 화면에 정보 업데이트
          const paymentKeyElement = document.getElementById("paymentKey");
          const orderIdElement = document.getElementById("orderId");
          const amountElement = document.getElementById("amount");

          paymentKeyElement.textContent = urlParams.get("paymentKey");
          orderIdElement.textContent = urlParams.get("orderId");
          amountElement.textContent = urlParams.get("amount") + "원";

          // 결제 성공 알림
          alert("결제가 성공적으로 완료되었습니다.");
          
          return json; // confirm().then(function (data) {...}) 코드의 data

        } catch(error){
          console.error("결제 처리 중 오류 발생: ", error);
          alert("결제 처리 중 오류가 발생했습니다.");
          // 결과 확인 팝업 종료
          window.close();
        }
      }

      confirm().then(function (data) {
      console.log("결제 응답 데이터:", JSON.stringify(data, null, 4));

      if(data){
        // 필요한 정보 추출
        // 결제 상태
        const status = data.status === "DONE" ? "성공" : "결제 상태 표기 오류 - 고객센터로 문의 바랍니다."; 
        // 결제 항목
        const orderId = data.orderId ? data.totalAmount.toLocaleString("ko-KR") + "원 포인트 충전" : "결제 항목 표기 오류 - 고객센터로 문의 바랍니다."; 
        // 결제 금액
        const amount = data.totalAmount.toLocaleString("ko-KR"); 
        // 결제 방법
        const method = data.method == "카드" ? data.card.cardType + data.method : data.method; 
        // 승인 일자
        const approvedAt = data.approvedAt 
          ? new Intl.DateTimeFormat("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(new Date(data.approvedAt))
          : "승인 일자 표기 오류 - 고객센터로 문의 바랍니다.";

        // JSON 데이터 HTML에 표시
        document.getElementById("response").innerHTML =
"<pre>" + 
" <b>결제 상태</b> : " + status + 
" <br> <b>결제 항목</b> : " + orderId + 
" <br> <b>결제 금액</b> : " + amount + "원" + 
" <br> <b>결제 방법</b> : " + method + 
" <br> <b>승인 일자</b> : " + approvedAt + 
"</pre>";
      } else{
        console.error("데이터가 존재하지 않거나 비정상적인 데이터 입니다.");
      }
    });

    // 팝업창 종료 시 메인 페이지 이동
    window.addEventListener("beforeunload", function () {
      if (window.opener) {
        window.opener.location.href = "/";
      }
    });
    </script>
  </body>
</html>
