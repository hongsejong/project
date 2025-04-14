<%@ page language="java" contentType="text/event-stream; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/common/header.css">

<!-- font awesome 라이브러리 추가 + key 등록 -->
<script src="https://kit.fontawesome.com/25e7d0397b.js" crossorigin="anonymous"></script>
<header>
    <div>
        <a href="/" id="logo">
            <img src="/resources/images/Logo.WebP" loading="lazy" alt="">
        </a>
        <a href="#" data-url="/requestBoard/0?cp=1" class="nav-link" id="service">서비스</a>
        <a href="#" data-url="/board/1?cp=1" class="nav-link" id="community">커뮤니티</a>
        <a href="#" data-url="/customer" class="nav-link" id="customer">고객센터</a>


        <!-- 검색 영역 -->
        <div class="search-area">

            <div id="searchTable">
                <input type="text" id="search" placeholder="검색어를 입력하세요">
                <button id="searchBtn">
                    <img src="/resources/images/search-icon.png" alt="검색">
                </button>
            </div>

            <!-- 자동완성 검색 결과 -->
            <ul id="searchResult" class="close"></ul>

        </div>

        <div class="header-top-menu">
            <c:choose>
                <c:when test="${empty loginMember}">
                    <a href="#" class="button" id="loginBtn">로그인</a>
                    <a href="#" class="button" id="signUpBtn">회원가입</a>
                </c:when>
                <c:otherwise>
                    <!-- 로그인 O -->
                    <section>
                        <!-- 알림 영역 -->
                        <div class="notification-container">
                            <!-- 알림 버튼 -->
                            <button class="notification-btn fa-regular fa-bell" id="my-element">
                                <!-- 알림 개수 표시 -->
                                <div class="notification-count-area"></div>
                            </button>
                            <!-- 알림 목록 -->
                            <ul class="notification-list"></ul>
                        </div>
                    </section>

                    <label for="headerMenuToggle" class="button" id="nickName" >
                        <i class="fa-solid fa-caret-down">${loginMember.memberNickname}</i>
                        <c:if test="${empty loginMember.profileImg}">
                            <img src="/resources/images/user2.gif" loading="lazy" alt="프로필이미지">
                        </c:if>
                        <c:if test="${!empty loginMember.profileImg}">
                            <img src="${loginMember.profileImg}" loading="lazy" alt="프로필이미지">
                        </c:if>
                        <input type="checkbox" id="headerMenuToggle">
                        <div class="header-menu">
                            <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                                <a href="#" class="button" id="myPageInfo">마이페이지</a>
                            </c:if>
                            <c:if test="${loginMember.memberDeleteFlag eq 'H'}">
                                <a href="/admin" class="button" id="adminPage1">관리자페이지</a>
                            </c:if>
                            <!-- 로그아웃 주소는 popUp.js에서 연결(로그아웃 시 마이 페이지 팝업을 닫기 위함) -->
                            <a class="button" id="amount">얼마있냐?</a>
                            <a href="#" class="button" id="charge">충전하기</a>
                            <a href="#" class="button" id="Withdraw">출금하기</a>
                            <a href="#" class="button" id="selectPayment">내역조회</a>
                            <a href="#"class="button" id="logout">로그아웃</a>
                        </div>
                    </label>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</header>



<!-- 포인트 충전 화면 모달 -->
<div id="chargePointModal" class="mainModal">
    <div class="mainModal-content">
        <span id="chargePointModal-close">&times;</span>
        <jsp:include page="/WEB-INF/views/payment/chargePoint.jsp"/>
    </div>
</div>

<!-- 출금신청 화면 모달 -->
<div id="withdrawModal" class="mainModal">
    <div class="mainModal-content">
        <span id="withdrawModal-close">&times;</span>
        <jsp:include page="/WEB-INF/views/payment/withdrawPoint.jsp"/>
    </div>
</div>

<!-- nav 버튼  잠시 숨기기 -->
<!-- <div id="nav">
    <button id="goTop">⬆</button>
    <button id="chatBtn">💬</button>
    <button id="goBot">⬇</button>
</div> -->

<div id="loginModal" class="modal-overlay">
    <div class="login-modal">
      <button class="close-modal" id="loginModal-close">&times;</button>
      <jsp:include page="/WEB-INF/views/member/login.jsp" />
    </div>
  </div>
  

<c:if test="${empty loginMember}">
    <!-- 회원가입 모달 -->
    <div id="signUpModal" class="signUp-modal">
        <div class="signUp-modal-content">
          <span class="signUp-close" id="signUpModal-close">&times;</span>
          <jsp:include page="/WEB-INF/views/member/signUp.jsp" />
        </div>
    </div>
</c:if>

<!-- 전역 변수 설정-->
<script>
    // session scope에 저장된 전역 변수(main 화면에서 사용)
    const loginMemberNoToMyPage = "${loginMember.memberNo}"
    const freeBoardCode = "${freeBoardCode}"
    const loginMemberForChatting = "${loginMember}";
    // 알림 관련 전역 변수 : 현재 접속한 클라이언트가 로그인한 상태인지 확인하는 변수
    const notificationLoginCheck = "${loginMember}" ? true : false;
</script>

<!-- js 순서 변경할 경우, 팝업 제어 기능 제대로 수행 X -->
<script src="/resources/js/common/popUp.js"></script>
<script src="/resources/js/common/header.js"></script>

<c:if test="${not empty sessionScope.loginFail}">
  <script>
    window.addEventListener("DOMContentLoaded", () => {
      const loginModal = document.getElementById("loginModal");
      if (loginModal) {
        loginModal.style.display = "flex";
        alert("아이디 또는 비밀번호가 일치하지 않습니다");
      }
    });
  </script>
  <c:remove var="loginFail" scope="session" />
</c:if>
