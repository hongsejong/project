<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8"/>
    <script src="https://js.tosspayments.com/v2/standard"></script>
    <link rel="stylesheet" href="/resources/css/payment-style.css">
    <title>토스페이먼츠 샘플 프로젝트(TossPayments API 호출)</title>
  </head>
  <body>
    <!-- 결제 UI -->
    <div id="payment-method"></div>
    <!-- 이용약관 UI -->
    <div id="agreement"></div>
    <!-- 결제하기 버튼 -->
    <button class="button" id="payment-button" style="margin-top: 30px">결제하기</button>

    <!-- 전역 변수 -->
    <script>
      const loginMemberEmail = "${loginMember.memberEmail}";
      const loginMemberTel = "${loginMember.memberTel}";
      const amount = "${amount}";
    </script>

    <script type="module">
        // 랜덤 문자 생성(UUIDV4) - orderId 생성용
        import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@9.0.1/dist/esm-browser/index.js";
        document.addEventListener("DOMContentLoaded", main);
      main();
      async function main() {
        const button = document.getElementById("payment-button");
        // ------  결제위젯 초기화 ------
        const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
        const tossPayments = TossPayments(clientKey);
        // 회원 결제
        const customerKey = "UY_YOAOhPPO86ohAsiU-t";
        const widgets = tossPayments.widgets({
          customerKey,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: TossPayments.ANONYMOUS });
        // ------ 주문의 결제 금액 설정 ------
        await widgets.setAmount({
          currency: "KRW",
          value: Number(amount),
        });
        await Promise.all([
          // ------  결제 UI 렌더링 ------
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          // ------  이용약관 UI 렌더링 ------
          widgets.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
        ]);
        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
        button.addEventListener("click", async function () {
          await widgets.requestPayment({
            orderId: loginMemberTel.trim() + "_" + uuidv4(), // ex) orderId: "yYf4Oh8bBM2wRxA91oT1B",
            orderName: "포인트 충전", // DB_PAYMENT_DESC 컬럼
            successUrl: window.location.origin + "/success?orderName=" + encodeURIComponent("포인트 충전"),
            failUrl: window.location.origin + "/fail",
            customerEmail: loginMemberEmail, 
            customerMobilePhone: loginMemberTel.trim(),
          });
        });
      }
    </script>
  </body>
</html>