<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>의뢰 요청 게시판 상세조회</title>
    
    <link rel="stylesheet" href="/resources/css/kds/common-style.css">
    <link rel="stylesheet" href="/resources/css/kds/requestBoardDetail.css">

<!-- CSS -->
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css">
<link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.css">

<!-- JS -->
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
<script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.js"></script>

<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <nav>
        <p class="navP">
            <a href="/requestBoard/0?cp=1">홈</a> > 
            <a href="/requestBoard/${requestBoard.parentCategoryId}?cp=1">${requestBoard.parentCategoryName}</a>
        </p>
        <br>
        <p class="navP2">
                ${requestBoard.categoryName}
        </p>
        <br>
        <h3>주요 카테고리</h3>
        <ul>
            
            <li class="categoryLi"><a href="/requestBoard/1?cp=1"><div class="category-icon"><i class="fas fa-briefcase"></i></div><span>취업/직무</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/2?cp=1"><div class="category-icon"><i class="fas fa-video"></i></div><span>영상/사진</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/3?cp=1"><div class="category-icon"><i class="fas fa-tools"></i></div><span>설치/수리</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/4?cp=1"><div class="category-icon"><i class="fas fa-palette"></i></div><span>취미/자기계발</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/5?cp=1"><div class="category-icon"><i class="fas fa-hands-helping"></i></div><span>단순 의뢰</span></a></li>

        </ul>
        
    </nav>
    <main>
        <section class="requestBoardTitle">
            <div>${requestBoard.boardTitle}</div>
        </section>
        <section class="requestBoardMember">
            <div>
                <c:if test="${empty requestBoard.profileImage}">
                    <img src="/resources/images/Logo.WebP" class="requestBoardProfile">
                </c:if>
                <c:if test="${!empty requestBoard.profileImage}">
                    <img src="${requestBoard.profileImage}" class="requestBoardProfile">
                </c:if>
                <div>
                    <div class="requestBoardNickname">
                        ${requestBoard.memberNickname}
                    </div>
                    <div>
                        ${requestBoard.boardCreateDate}
                    </div>
                </div>
            </div>
            <div class="requestBoardRegion">
                <img width="96" height="96" src="https://img.icons8.com/color/96/map-marker--v2.png" alt="map-marker--v2"/>${requestBoard.requestLocation}
            </div>
        </section>
        
        <section class="requestBoardStatement">
            <c:if test="${requestBoard.requestStatus == '대기'}">
                <span class="requestBoardSupporter">조력자 요청 목록 확인</span>
            </c:if>
            <c:if test="${requestBoard.requestStatus == '진행 중' || requestBoard.requestStatus == '완료'}">
                <span id="selectedOneSupporter">선택한 조력자 확인</span>
            </c:if>
            <span class="requestBoardCheck">의뢰 ${requestBoard.requestStatus}</span>
        </section>


        <section class="requestBoardContent">
            <form action="#" name="requestBoardForm" id="requestBoardForm" method="POST" enctype="multipart/form-data">
                <div class="requestBoardnputDiv">
                    <div>의뢰 내용</div>
                    <div id="toastContent" style="display:none;">${requestBoard.boardContent}</div>
                    <div id="viewer"></div>
                </div>
                <div class="requestBoardnputDiv">
                    <div>의뢰 기한</div>
                    <div>${requestBoard.requestDueDate}까지</div>
                </div>
                <div class="requestBoardnputDiv">
                    <div>의뢰 가격</div>
                    <div>${requestBoard.requestPrice}원</div>
                </div>
            </form>
        </section>

        <section class="requestBoardBtnBox">
            <div class="requestBoardReportChat">
                <c:if test="${!empty loginMember}">
                    <c:if test="${loginMember.memberNo != requestBoard.memberNo}">
                        <button id="singo">
                            <span>신고</span>
                            <img src="/resources/images/hsj/singo.png" alt="">
                        </button>
                    </c:if>
                    <c:if test="${checkAlreadySupport == 1}">
                        <button id="chatButton">1:1 채팅</button>
                    </c:if>
                </c:if>
            </div>
            <div class="requestBoardAccept">
                <c:if test="${checkAcceptSupport == 0 && !empty loginMember}">
                    <c:if test="${(loginMember.memberNo != requestBoard.memberNo) && checkAlreadySupport == 0}">
                        <button id="requestBtn">해줄게요~!</button>
                    </c:if>
                    <c:if test="${(loginMember.memberNo != requestBoard.memberNo) && checkAlreadySupport == 1}">
                        <button id="withdrawRequestBtn">조력자 신청 철회</button>
                    </c:if>
                </c:if>
                <c:if test="${checkAcceptSupport == 1 && !empty loginMember}">
                    <c:if test="${( loginMember.memberNo == requestBoard.memberNo )&& requestBoard.requestStatus != '완료'}">
                        <button id="requestCompleteBtn">의뢰 완료</button>
                    </c:if>
                    <c:if test="${( loginMember.memberNo == requestBoard.memberNo )&& requestBoard.requestStatus == '완료' && reviewCount == 0}">
                        <button id="requestReviewBtn">리뷰 작성</button>
                    </c:if>
                </c:if>
            </div>
            <div class="requestBoardDml">
                <c:if test="${(loginMember.memberNo == requestBoard.memberNo) && requestBoard.requestStatus == '대기'}">
                    <button id="updateBtn">수정</button>
                    <button id="deleteBtn">삭제</button>
                </c:if>
                <button id="goToListBtn">목록으로</button>
            </div>
        </section>

        <!-- modal -->
        <jsp:include page="/WEB-INF/views/common/requestBoardModal.jsp"/>
    </main>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>


    <script type="application/json" id="requestSupportersJson">
        ${requestSupportersJson}
    </script>
    
    <script>
        const categoryId = "${requestBoard.hiddenCategoryId}";

        const loginMember = "${loginMember}";

        const loginMemberNo = "${loginMember.memberNo}";

        const requestBoardMemberNo = "${requestBoard.memberNo}";
        
        const requestBoardMemberNickname = "${requestBoard.memberNickname}";

        const requestSupporterArr = "${requestSupporterArr}";

        const jsonStr = document.getElementById("requestSupportersJson").textContent.trim();
        const requestSupporters = JSON.parse(jsonStr);
        console.log(requestSupporters);

        const requestPrice = "${requestBoard.requestPrice}";
        
        const loginMemberSupporterNo = "${loginMemberSupporterNo}";
        
        const boardNo = "${requestBoard.boardNo}";

        const boardTitle = "${requestBoard.boardTitle}";

        const checkAlreadySupport = "${checkAlreadySupport}";

        const checkLoginMemberEqualsRequester = "${checkLoginMemberEqualsRequester}";

        const acceptRequestSupporter = "${acceptRequestSupporter}";

        const acceptRequestSupporterNickname = "${acceptRequestSupporter.supporterNickname}";

        const acceptRequestSupporterMemberNo = "${acceptRequestSupporter.memberNo}";

        const acceptRequestSupporterSupporterNo = "${acceptRequestSupporter.supporterNo}";




    </script>

    <script src="/resources/js/kds/requestBoardCommon.js"></script>
    <script src="/resources/js/kds/requestBoardDetail.js"></script>
    <script src="/resources/js/singo.js"></script>
    <script>
        // console.log("checkAlreadySupport =", "${checkAlreadySupport}");

    </script>
</body>
</html>