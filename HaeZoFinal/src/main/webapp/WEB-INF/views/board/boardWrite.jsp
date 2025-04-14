<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>게시글 등록</title>
    
    <!-- Toast UI Editor 기본 CSS/JS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>

    <!-- 기타 스타일 -->
    <link rel="stylesheet" href="/resources/css/board.css">
    <link rel="stylesheet" href="/resources/css/board/boardDetail.css">
    <link rel="stylesheet" href="/resources/css/board/boardWrite.css">
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
    <form action="#" method="POST" enctype="multipart/form-data" autocomplete="off" id="boardWriteFrm">
        <section id="boardDetail">
            <!-- 게시글 작성 제목 -->
            <div>
                <h1 id="boardTitle">
                    <input type="text" name="boardTitle" placeholder="제목">
                </h1>
            </div>
            <!-- 게시글 작성 회원 정보 -->
            <div id="boardInfo">
                <div>
                    <a href="#" id="boardProfile">
                        <img src="${empty loginMember.profileImg ? '/resources/images/user2.gif' : loginMember.profileImg}" alt="" class="profileImage">
                        <span>${loginMember.memberNickname}</span>
                    </a>
                </div>
            </div>
            <!-- 게시글 작성 본문 내용 (토스트 에디터 영역) -->
            <section class="BoardContent">
                <div id="toastEditor"></div>
            </section>
            <!-- 게시글 등록 버튼 -->
            <section id="BtnSection">
                <div></div>
                <div>
                    <button type="submit">등록</button>
                </div>
            </section>
        </section>
        <!-- 에디터 내용을 담을 hidden input -->
        <input type="hidden" name="content" id="hiddenContent">
    </form>
    
    <script>
        const boardCode = "${boardCode}";
    </script>
    
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="/resources/js/board/board.js"></script>
    <script src="/resources/js/board/boardWrite.js"></script>
</body>
</html>
