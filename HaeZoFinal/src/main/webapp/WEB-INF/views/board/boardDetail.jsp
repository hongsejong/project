<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 상세조회</title>

    <!-- Toast UI Editor 기본 CSS/JS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.js"></script>

    <link rel="stylesheet" href="/resources/css/board.css">
    <link rel="stylesheet" href="/resources/css/board/boardDetail.css">
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <div>
        <h1>게시판</h1>
        <span id="boardMenu">
            <c:forEach var="boardType" items="${boardTypeList}">
                <c:if test="${boardType.BOARD_CODE <= 4}">
                    <a href="/board/${boardType.BOARD_CODE}?cp=1" class="boardType">${boardType.BOARD_NAME}</a>
                </c:if>
            </c:forEach>
        </span>
        
    </div>
    <!-- 게시글 상세 페이지 -->
    <section id="boardDetail">
        <div>
            <h1 id="boardTitle">${board.boardTitle}</h1>
        </div>
        <div id="boardInfo">
            <div>
                <a href="#" id="boardProfile">
                    <c:if test="${empty board.profileImage}">
                        <img src="/resources/images/user2.gif" alt="" class="profileImage">
                    </c:if>
                    <c:if test="${!empty board.profileImage}">
                        <img src="${board.profileImage}" alt="" class="profileImage">
                    </c:if>
                    <span>${board.memberNickname}</span>
                </a>
            </div>
            <div>
                <p>생성일 : ${board.boardCreateDate}</p>
                <c:if test="${!empty board.boardUpdateDate}">
                    <p>수정일 : ${board.boardUpdateDate}</p>
                </c:if>
            </div>
            <div>
                
                <p>조회수 : ${board.readCount}</p>
                <p>좋아요 수 : <b id="likeCount">${board.likeCount}</b></p>
            </div>
        </div>
        <!-- <section class="boardContent">
            <div id="viewer"></div>
        </section> -->

        <!-- Viewer 전용 래퍼 -->
        <section class="boardContent" id="viewerWrapper">
            <div id="viewer"></div>
        </section>
        
        <!-- Editor 전용 래퍼 (초기에 숨김) -->
        <section class="boardContent" id="editorWrapper"  style='display: none'>
            <div id="editor"></div>
            <div style="margin-top: 10px; text-align: right;">
                <button id="saveBtn">저장</button>
                <button id="cancelBtn">취소</button>
            </div>
        </section>



        <section id="BtnSection">
            <div>
                <button onclick="goBack()">목록</button>
                <c:if test="${!empty loginMember}">
                    <button id="boardLike">
                        <span>좋아요</span>
                        <img id="likeIcon" src="${empty likeCheck 
                                ? '/resources/images/board/icons8-heart-50.png' 
                                : '/resources/images/board/icons8-heart-48.png'}"
                        alt=""/>
                    </button>
                    <c:if test="${board.boardCode != 2 && loginMember.memberNo != board.memberNo}">
                        <button id="singo">
                            <span>신고</span>
                            <img src="/resources/images/hsj/singo.png" alt="">
                        </button>
                    </c:if>
                </c:if>
            </div>
            <div>
                <c:if test="${loginMember.memberNo == board.memberNo }">
                    <button id="updateBtn">수정</button>
                    <button id="deleteBtn">삭제</button>
                </c:if>
            </div>
        </section>
    </section>
    
    <script>
        const memberNo = "${loginMember.memberNo}";
        const boardNo = "${board.boardNo}";
        const boardCode = "${board.boardCode}";
        let likeCheck = "${empty likeCheck ? 'false' : 'true'}";
        // 로그인한 회원의 닉네임
        const memberNickname = "${loginMember.memberNickname}";
        // 게시글 제목
        const boardTitle = "${board.boardTitle}";
    </script>

    <script>
        const boardContentMarkdown = `<c:out value='${board.boardContent}' escapeXml='false'/>`.replace(/\n/g, '  \n');
        
        const viewer = new toastui.Editor({
            el: document.getElementById('viewer'),
            initialValue: boardContentMarkdown,
            viewer : true
        });

    </script>

    <jsp:include page="comment.jsp"/>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="/resources/js/board/board.js"></script>
    <script src="/resources/js/board/boardDetail.js"></script>
    <script src="/resources/js/singo.js"></script>
    
</body>
</html>