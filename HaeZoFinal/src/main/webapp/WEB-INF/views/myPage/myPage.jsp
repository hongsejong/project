<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="member" value="${myPageMap.member}"/>
<c:set var="memBoardList" value="${myPageMap.memBoardList}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>myPage</title>

    <!-- Toast UI Editor 기본 CSS/JS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.js"></script>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
</head>
<body>
    <section id="myPageProfile">
        <div id="myPageProfileHead">
            <div id="myPageProfileHead-top">
                <img src="/resources/images/Logo.WebP"  alt="Logo" id="logoImage">
                <!-- 말풍선 요소 -->
                <div id="speechBubble" class="hidden">
                    You take care of everything!
                </div>
            </div>
            <div id="myPageProfileHead-bottom">
                <div id="mph-bot-left">
                    <div></div>
                </div>
                <div id="mph-bot-right">
                    <div>
                        <p><span id="myPageNick">${member.memberNickname}</span></p>
                        <div class="profileStars">
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <span id="profileStarScore">${member.reviewRating}</span>
                        </div>
                    </div>
                    <div id="btnArea">
                        <c:if test="${loginMember.memberNo == member.memberNo}">
                            <button id="updateBtn">회원정보 조회 및 수정</button>
                        </c:if>
                    </div>
                </div>
            </div>
            <form action="profileImg" method="POST" name="profileImgFrm" id="profileImgFrm" enctype="multipart/form-data">
                <c:if test="${!empty member.profileImg}">
                    <img src="${member.profileImg}" id="profileImg">    
                </c:if>
                <c:if test="${empty member.profileImg}">
                    <img src="/resources/images/user.png" id="profileImg">
                </c:if>
                <div id="profileImgBtnArea" class="hidden">
                    <button  id="deleteProfileImgBtn">삭제</button>
                    <label for="inputImage">선택</label>
                    <button id="updateProfileImgBtn">변경</button>
                    <input type="file" name="profileImg" id="inputImage" accept="image/*">
                </div>
            </form>
        </div>
        <div id="myPageProfileNav">
            <div class="selfProduceArea">
                <c:if test="${empty member.memberSelfIntro}">
                    <p class="selfProduce-content">작성된 자기 소개가 없습니다.</p>
                </c:if>
                <c:if test="${!empty member.memberSelfIntro}">
                    <p class="selfProduce-content">${member.memberSelfIntro}</p>
                </c:if>
                <c:if test="${loginMember.memberNo == member.memberNo}">
                    <div>
                        <button class="updateBtn2" onclick="showUpdateIntro(this)">자기소개 작성</button>
                    </div>           
                </c:if>
            </div>
            <ul id="navMenu">
                <li class="contentMenu" data-my-index="0"><span>작성한 게시글</span></li>
                <li class="contentMenu" data-my-index="1"><span>요청한 의뢰</span></li>
                <li class="contentMenu" data-my-index="2"><span>처리한 의뢰</span></li>
                <li class="contentMenu" data-my-index="3"><span>좋아요 게시글</span></li>
            </ul>
        </div>
        <div id="myPageProfileMain"></div>
    </section>

    <!-- 전역변수 설정 -->
    <script>
        const reviewRating = "${member.reviewRating}";
        const myPMemNo = "${member.memberNo}";                   // 회원 번호
        const loginMemberNoInMyPage = "${loginMember.memberNo}"; // 로그인한 회원의 회원 번호
        const freeBoardCode = "${freeBoardCode}";                // 자유게시판 게시판 코드
        const requestBoardCode = "${requestBoardCode}";          // 의뢰게시판 게시판 코드
    </script>

    <!-- Toast UI Viewer 적용 스크립트 -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
        if(loginMemberNoInMyPage == myPMemNo){
            freeBoardList(loginMemberNoInMyPage, freeBoardCode);
        } else{
            freeBoardList(myPMemNo, freeBoardCode);
        }
        });
    </script>

    <c:if test="${not empty message}">
        <script>
            alert("${message}");
        </script>
    </c:if>
    
    <!-- js 연결 -->
    <script src="/resources/js/myPage.js"></script>
</body>
</html>
