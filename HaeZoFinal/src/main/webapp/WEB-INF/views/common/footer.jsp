<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/common/footer.css">

<footer>
    <section id="footer-menu">
        <div id="footer-menu-logo">
            <img src="/resources/images/Logo.WebP" alt="">
            <p>해조~!</p>
            <p>최병규 | 권대성 | 임경묵 | 정택정 | 홍세종</p>
            <p>주소 : 강남지원 1관 : 서울특별시 강남구 테헤란로10길 9</p>
            <p>대표번호 : 1234-5678 팩스 : 02-1234-5678</p>
            <p>E-mail : haezofinal@kh.or.kr</p>
        </div>
        <div id="footer-menu-list">
            <a href="#">서비스 소개</a>
            <span> | </span>
            <a href="#">이용약관</a>
            <span> | </span>
            <a href="#">개인정보 처리방침</a>
            <span> | </span>
            <a href="/customer">고객센터</a>
        </div>
    </section>
    <div>
        <p>© 해조~! 2025</p>
    </div>
</footer>

<%--  message가 존재할 경우 --%>
<c:if test="${!empty message}">
    <script>
        alert('${message}');
    </script>
</c:if>