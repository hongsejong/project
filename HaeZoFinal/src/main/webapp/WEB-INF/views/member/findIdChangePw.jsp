<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>아이디 찾기 및 새 비밀번호 변경</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/member/findIdChangePw.css" />
  <!-- jQuery 반드시 포함 (외부 js 파일에서 $ 사용을 위해) -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <main>

    <div class="back-button">
      <button id="goBackBtn">&#8592; 돌아가기</button>
    </div>

    
    <section class="findId-content">
      <!-- 전화번호 입력 및 아이디 찾기 -->
      <div class="input-group">
        <label for="memberTel"><span class="required">*</span> 전화번호</label>
        <div class="input-area">
          <input type="text" id="memberTel" placeholder="전화번호 (- 제외)" maxlength="11" />
          <button id="searchPhoneBtn" type="button">아이디 찾기</button>
        </div>
        <span class="message" id="telMessage">전화번호를 입력해주세요.</span>
      </div>
      
      <!-- 조회된 이메일(아이디) 결과 영역 -->
      <div class="result-group" id="phoneResult" style="display:none;">
        <label>회원 아이디(이메일)</label>
        <div class="result-box">
          <span id="resultEmail"></span>
        </div>
      </div>
      
      <!-- 이메일 인증 영역 (초기에는 숨김 처리) -->
      <div class="input-group" id="emailAuthSection" style="display:none;">
        <label for="authCode"><span class="required">*</span> 이메일 인증번호</label>
        <div class="input-area">
          <input type="text" id="authCode" placeholder="인증번호 입력" maxlength="6" />
          <button id="sendAuthCodeBtn" type="button" class="auth-btn">인증코드 받기</button>
          <button id="verifyAuthBtn" type="button" class="auth-btn" style="display:none;">인증하기</button>
        </div>
        <span class="message" id="authMessage">인증코드를 받으신 후 입력하세요.</span>
      </div>
      
      <!-- 새 비밀번호 변경 영역 (초기에는 숨김 처리) -->
      <div class="input-group" id="changePwSection" style="display:none;">
        <label for="newPw"><span class="required">*</span> 새 비밀번호</label>
        <div class="input-area">
          <input type="password" id="newPw" placeholder="새 비밀번호" maxlength="20" />
        </div>
        <label for="confirmPw"><span class="required">*</span> 비밀번호 확인</label>
        <div class="input-area">
          <input type="password" id="confirmPw" placeholder="비밀번호 확인" maxlength="20" />
        </div>
        <span class="message" id="changePwMessage"></span>
        <div class="button-group" style="text-align: right;">
          <button id="changePwBtn" type="button" class="auth-btn">비밀번호 변경</button>
          <button id="cancelBtn" type="button" class="auth-btn" style="margin-left: 10px;">취소</button>
        </div>
      </div>
      
    </section>
  </main>
  
  <!-- findIdChangePw.js 파일 포함 -->
  <script src="${pageContext.request.contextPath}/resources/js/member/findIdChangePw.js"></script>
</body>
</html>
