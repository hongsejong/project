<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="boardList" value="${map.boardList}" />
<c:set var="pagination" value="${map.pagination}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판</title>
    <link rel="stylesheet" href="/resources/css/board.css">
    <link rel="stylesheet" href="/resources/css/board/thread-style.css">
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    
    <div id="boardHeader">
        <span id="boardMenu">
            <c:forEach var="boardType" items="${boardTypeList}">
                <c:if test="${boardType.BOARD_CODE <= 4}">
                    <a href="/board/${boardType.BOARD_CODE}?cp=1" class="boardType">${boardType.BOARD_NAME}</a>
                </c:if>
            </c:forEach>
        </span>
    </div>
    <div id="threadBoardArea">
        <!-- 쓰레드 게시판 목록 -->
        <section id="thread">
            <div id="inputThread">
                <img src="${!empty loginMember.profileImg ? loginMember.profileImg : '/resources/images/user2.gif'}" alt="프로필이미지" class="profile-image">
                <div>
                    <textarea name="threadContent" id="threadContent" placeholder="댓글을 입력해주세요"></textarea>
                    <span>
                        <button id="addThread">등록</button>
                    </span>
                </div>
            </div>
        </section>
        <!-- 댓글 목록 -->
        <div class="thread-list-area">
            <ul id="threadList">
                <c:forEach var="threadItem" items="${thread.boardList}">
                    <li class="thread-row ${threadItem.parentBoardNo != 0 ? 'child-thread' : ''}" data-thread-no="${threadItem.boardNo}">

                        
                        <!-- 프로필 이미지 -->
                        <img src="${not empty threadItem.profileImage ? threadItem.profileImage : '/resources/images/user2.gif'}" alt="프로필이미지" class="profile-image">
                        
                        <!-- 댓글 내용 -->
                        <div class="thread-content-wrapper">
                            <p class="thread-writer">
                                <span>${threadItem.memberNickname}</span>
                                <span class="thread-date">( ${threadItem.boardCreateDate} )</span>
                            </p>
            
                            <p class="thread-content">${threadItem.boardContent}</p>
            
                            <!-- 버튼 영역 -->
                            <div class="thread-btn-area">
                                <c:if test="${not empty loginMember}">
                                    <button onclick="showInsertThread(`${threadItem.boardNo}`, this)">답글</button>
                                </c:if>

                                <c:if test="${loginMember.memberNo == threadItem.memberNo}">
                                    <button onclick="showUpdateThread(`${threadItem.boardNo}`, this)">수정</button>
                                    <button onclick="deleteThread(`${threadItem.boardNo}`)">삭제</button>
                                </c:if>
                            </div>
                        </div>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </div>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <script>
        const loginMember = '${loginMember}';
        const memberNo = '${loginMember.memberNo}';
    </script>

    
    <script src="/resources/js/board/threadBoard.js"></script>
    <script src="/resources/js/board/board.js"></script>
    
</body>
</html>