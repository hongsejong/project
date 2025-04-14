<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <title>회원 탈퇴</title>
  <link rel="stylesheet" href="/resources/css/myPage/myPage-secession-style.css">
</head>
<body>
  <div class="container">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header-left">
        <div class="box">회원 탈퇴</div>
      </div>
      <div class="header-right">
        <img src="../resources/images/Logo.WebP" alt="이모티콘" />
      </div>
    </div>

    <!-- 회원탈퇴 유의사항 섹션 -->
    <div class="withdrawal-notice">
      <h3>회원탈퇴 시 꼭 확인해주세요</h3>
      <ul>
        <li>탈퇴 후 모든 회원 정보는 복구되지 않습니다.</li>
        <li>저장된 데이터와 거래 기록이 모두 삭제됩니다.</li>
        <li>재가입 시 일부 정보가 초기화될 수 있습니다.</li>
      </ul>
    </div>

    <!-- 메인 영역 -->
    <div class="main">
      <div class="content-area">
        <!-- 전체 폼 -->
        <form id="secessionForm" action="${pageContext.request.contextPath}/myPage/secession" method="post">
          <!-- 로그인된 회원의 이메일(hidden) -->
          <input type="hidden" name="email" value="${loginMember.memberEmail}">
          
          <!-- 탈퇴 사유 섹션 (라디오 버튼) -->
          <div class="box-title">탈퇴 사유</div>
          <div class="box-content">
            <div class="radio-item">
              <input type="radio" id="reason1" name="withdrawReason" value="service">
              <label for="reason1">서비스 불만</label>
            </div>
            <div class="radio-item">
              <input type="radio" id="reason2" name="withdrawReason" value="privacy">
              <label for="reason2">개인정보 우려</label>
            </div>
            <div class="radio-item">
              <input type="radio" id="reason3" name="withdrawReason" value="usage">
              <label for="reason3">이용 빈도 낮음</label>
            </div>
            <div class="radio-item">
              <input type="radio" id="reason4" name="withdrawReason" value="other">
              <label for="reason4">기타</label>
            </div>
            <div id="otherReasonContainer" style="display: none; margin-top: 10px;">
              <textarea name="otherReason" placeholder="기타 사유를 작성해주세요"></textarea>
            </div>
          </div>
        
          <!-- 비밀번호 입력 -->
          <div class="email-verification">
            <input type="password" id="memberPw" name="memberPw" class="email-box" placeholder="비밀번호 입력">
          </div>
        
          <!-- 이메일 인증번호 입력 및 버튼 -->
          <div class="email-verification">
            <input type="text" name="emailAuthCode" class="email-box" placeholder="인증번호 입력">
            <button class="verify-btn" type="button" id="requestAuthCodeBtn">인증번호 받기</button>
            <button class="verify-btn" type="button" id="verifyAuthCodeBtn">인증번호 확인</button>
          </div>
        
          <!-- 하단 버튼들 -->
          <div class="bottom-btns">
            <div class="btn-box" onclick="location.href='${pageContext.request.contextPath}/myPage/goUpdateInfo'">취소 버튼</div>
            <!-- 모달 호출을 위한 "확인 버튼" -->
            <div class="btn-box" id="confirmBtn">확인 버튼</div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- 모달 오버레이 (기존 모양 유지) -->
  <div class="modal-overlay" id="modalOverlay" style="display: none;">
    <div class="modal-container">
      <div class="modal-content">
        <h2>계정탈퇴</h2>
        <p>계정 탈퇴 시 다음 사항들을 꼭 확인해 주세요.</p>
        <ul class="notice-list">
          <li>보유 포인트, 쿠폰 등 모든 혜택이 사라집니다.</li>
          <li>진행 중인 주문 및 거래 내역은 복구할 수 없습니다.</li>
          <li>프로필, 닉네임 등 회원정보가 완전히 삭제됩니다.</li>
          <li>재가입하더라도 이전 데이터는 복원되지 않습니다.</li>
          <li>탈퇴 후에는 동일 아이디로 재가입이 불가할 수 있습니다.</li>
        </ul>
        <div class="modal-btn-group">
          <button id="modalCancelBtn" type="button">취소</button>
          <button id="modalWithdrawBtn" type="button">계정 탈퇴</button>
        </div>
      </div>
    </div>
  </div>

  
  <script src="/resources/js/myPage-secession.js"></script>

  <c:if test="${!empty message}">
      <script>
          alert('${message}');
      </script>
  </c:if>
  
</body>
</html>
