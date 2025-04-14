<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" href="/resources/css/member/login.css">

<section class="logo-area">
  <a href="/"><img src="/resources/images/Logo.WebP" alt="로고" /></a>
</section>

<form action="/member/login" method="post" id="loginFrm">
  <section class="input-box">
    <input type="text" name="memberEmail" placeholder="Email" value="${cookie.saveId.value}" />
  </section>

  <section class="input-box">
    <input type="password" name="memberPw" placeholder="Password" />
  </section>

  <c:if test="${message eq 'fail'}">
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const loginModal = document.getElementById("loginModal");
        if (loginModal) {
          loginModal.style.display = "flex";
          alert("아이디 또는 비밀번호가 일치하지 않습니다");
        }
      });
    </script>
  </c:if>


  <button class="login-btn">Login</button>

  <div class="saveId-area">
    <input type="checkbox" name="saveId" id="saveId"
           <c:if test="${!empty cookie.saveId.value}">checked</c:if> />
    <label for="saveId"><i class="fas fa-check"></i> 아이디 저장</label>
  </div>

  <p class="text-area">
    <a href="${pageContext.request.contextPath}/member/signUp">회원가입</a> |
    <a href="${pageContext.request.contextPath}/member/findIdChangePw">ID/PW 찾기</a>
  </p>
</form>

<div class="sns-buttons">
  <button class="kakao-btn" onclick="location.href='${pageContext.request.contextPath}/auth/kakao/login'">
    <img src="/resources/images/kakao.jpg" alt="카카오 로고" class="btn-icon" />
    카카오로 시작하기
  </button>
  <button class="naver-btn" onclick="location.href='${pageContext.request.contextPath}/naverRedirect.jsp'">
    <img src="/resources/images/naver.png" alt="네이버 로고" class="btn-icon" />
    네이버로 시작하기
  </button>
</div>
