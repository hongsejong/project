<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chargePoint-포인트 충전 화면</title>
</head>
<section id="withdrawPointBody">
    <div id="title"><p>금액 선택</p></div>

    <!-- 금액 선택 (2열 배치) -->
    <div class="price-container" id="radio-container1"></div>

    <!-- 수량 입력 -->
    <div class="quantity-container">
        <label for="quantity1">수량:</label>
        <input type="number" id="quantity1" value="1" min="1" max="100">
        <button id="updateQuantity1" type="button">변경</button>
    </div>

    <!-- 총 결제 금액 표시 -->
    <div class="totalAmountDisplay" id="totalAmountDisplay1">총 금액 : 0원</div>

    <!-- 결제 버튼 -->
    <div id="btnArea">
        <button id="chargeBtn">결제하기</button>
    </div>

    <script src="/resources/js/chargePoint.js"></script>
</section>
</html>
