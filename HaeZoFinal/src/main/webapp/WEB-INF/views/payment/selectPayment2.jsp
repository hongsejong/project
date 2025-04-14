<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/selectPayment-style.css">
    <title>결제 내역 조회</title>
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>

    <main id="selectPaymentMain">
        <div id="container">
            <h2>결제내역 조회</h2>
            <!-- 결제 내역 -->
            <table class="payment-table">
                <thead>
                    <tr>
                        <th onclick="sortTable(0)">결제 항목 ⬍</th>
                        <th onclick="sortTable(1)">승인 시각 ⬍</th>
                        <th onclick="sortTable(2)">결제 방법 ⬍</th>
                        <th onclick="sortTable(3)">총 금액 ⬍</th>
                        <th onclick="sortTable(4)">카드 종류 ⬍</th>
                        <th>영수증</th>
                    </tr>
                </thead>
                <tbody id="paymentTableBody"></tbody>
            </table>
            <!-- 더 보기 버튼 -->
            <button id="loadMoreBtn">더 보기</button>
        </div>
    </main>
    
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <!-- js 연결 -->
    <script src="/resources/js/selectPayment2.js"></script> 
</body>
</html>
