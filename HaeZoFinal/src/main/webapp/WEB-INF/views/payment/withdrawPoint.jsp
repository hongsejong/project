<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>withdrawPoint-포인트 출금 화면</title>
</head>
<section id="withdrawPointBody">
    <div id="title"><p>금액 선택</p></div>

    <form action="/withdrawPoint" name="withdrawPointFrm" id="withdrawPointFrm" method="POST">
        <!-- 금액 선택 (2열 배치) -->
        <div class="price-container" id="radio-container2"></div>
    
        <!-- 수량 입력 -->
        <div class="quantity-container">
            <label for="quantity2">수량:</label>
            <input type="number" id="quantity2" value="1" min="1" max="100">
            <button id="updateQuantity2" type="button">변경</button>
        </div>
    
        <!-- 총 출금 금액 표시 -->
        <div class="totalAmountDisplay" id="totalAmountDisplay2">총 금액 : 0원</div>

        <!-- 계좌번호(은행/예금주) 받기 -->
        <div class="account-container">
            <label for="bank">은행 선택:</label>
            <select id="bank" name="bank">
                <option value="">은행을 선택하세요</option>
                <option value="KB국민은행">KB국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="우리은행">우리은행</option>
                <option value="하나은행">하나은행</option>
                <option value="농협은행">농협은행</option>
                <option value="카카오뱅크">카카오뱅크</option>
                <option value="토스뱅크">토스뱅크</option>
                <option value="토스뱅크">SC제일은행</option>
                <option value="토스뱅크">한국씨티은행</option>
            </select>
        </div>
        <div class="account-container">
            <label for="accountNumber">계좌번호:</label>
            <input type="text" id="accountNumber" name="accountNumber" placeholder="계좌번호 입력">
        </div>
        <div class="account-container">
            <label for="accountHolder">예금주명:</label>
            <input type="text" id="accountHolder" name="accountHolder" placeholder="예금주명 입력">
        </div>
        <!-- 출금 버튼 -->
        <div id="btnArea">
            <button id="chargeBtn">출금하기</button>
        </div>
    </form>

    <!-- 출금신청 성공화면 모달(ajax) -->
    <div id="withdrawSuccess" class="childModal">
        <div class="childModal-content"></div>
    </div>

    <!-- 출금신청 실패화면 모달(ajax) -->
    <div id="withdrawFail" class="childModal">
        <div class="childModal-content"></div>
    </div>

    <!-- js 연결 -->
    <script src="/resources/js/withdrawPoint.js"></script>
</section>
</html>
