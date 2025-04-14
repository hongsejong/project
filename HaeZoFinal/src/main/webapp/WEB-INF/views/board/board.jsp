<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="boardList" value="${map.boardList}" />
<c:set var="pagination" value="${map.pagination}" />
<c:set var="cp" value="${param.cp}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판 목록</title>
    <link rel="stylesheet" href="/resources/css/board.css">
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    
    <!-- 헤더 영역: 게시판 메뉴 + 글쓰기 버튼 -->
    <div id="boardHeader">
        <div id="boardMenu">
            <c:forEach var="boardType" items="${boardTypeList}">
                <c:if test="${boardType.BOARD_CODE <= 4}">
                    <a href="/board/${boardType.BOARD_CODE}?cp=1" class="boardType">
                        ${boardType.BOARD_NAME}
                    </a>
                </c:if>
            </c:forEach>
        </div>
        <!-- 로그인 상태이며 특정 boardCode일 때만 글쓰기 버튼 보임 -->
        <c:if test="${boardCode == 3 && !empty loginMember || loginMember.memberDeleteFlag == 'H'}">
            <div id="writeButton">
                <a href="/board/${boardCode}/insert">
                    <button id="insertBtn">글쓰기</button>
                </a>
            </div>
        </c:if>
    </div>
    <!-- 게시판 목록 및 페이지네이션 -->
    <section id="page-search">
        <div class="pagination-area">
            <c:set var="url" value="/board/${boardCode}?cp="/>
            <ul class="pagination">
                <li><a href="${url}1${qs}">&lt;&lt;</a></li>
                <li><a href="${url}${pagination.prevPage}${qs}">&lt;</a></li>
                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
                    <c:choose>
                        <c:when test="${pagination.currentPage == i}">
                            <li><a class="current">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="${url}${i}${qs}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
                <li><a href="${url}${pagination.nextPage}${qs}">&gt;</a></li>
                <li><a href="${url}${pagination.maxPage}${qs}">&gt;&gt;</a></li>
            </ul>
        </div>
        
        <form action="${boardCode}" method="get" id="boardSearch">
            <select name="key" id="searchKey">
                <option value="t">제목</option>
                <option value="c">내용</option>
                <option value="tc">제목+내용</option>
                <option value="w">작성자</option>
            </select>
            <input type="text" name="query"  id="searchQuery" placeholder="검색어를 입력해주세요."
                   autocomplete="off">
            <button class="button" id="boardSearchBtn">검색</button>
        </form>
    </section>
    
    <section id="boardList">
        <!-- 게시글 목록 출력 -->
        <c:choose>
            <c:when test="${empty boardList}">
                <h1>게시글이 존재하지 않습니다.</h1>
            </c:when>
            <c:otherwise>
                <c:forEach var="board" items="${map.boardList}">
                    <div class="board-item">
                        <!-- 썸네일 -->
                        <div class="thumbnail" onclick="openModalFromDiv(this)">
                            <c:if test="${empty board.thumbnail}">
                                <img src="/resources/images/Logo.WebP" loading="lazy" alt="썸네일">
                            </c:if>
                            <c:if test="${!empty board.thumbnail}">
                                <img src="${board.thumbnail}" loading="lazy" alt="썸네일">
                            </c:if>
                        </div>
                        <!-- 게시글 제목 -->
                        <div class="title-wrap">
                            <a href="/board/${board.boardCode}/${board.boardNo}?cp=${cp}" class="title">
                                ${board.boardTitle} <span class="comment-count">[${board.commentCount}]</span>
                            </a>
                        </div>
                        <!-- 작성자 정보 -->
                        <div class="writer-info">
                            <a href="#" class="writer-upper" 
                               onclick="window.open('/myPage/viewPopUp?memNo=${board.memberNo}&bCode=${freeBoardCode}', '_blank', 'width=625,height=1200,top=200,left=620');">
                                <span class="writer-name">${board.memberNickname}</span>
                                <c:if test="${empty board.profileImage}">
                                    <img class="profile-image" src="/resources/images/hsj/info.png" alt="프로필">
                                </c:if>
                                <c:if test="${!empty board.profileImage}">
                                    <img class="profile-image" src="${board.profileImage}" alt="프로필">
                                </c:if>
                            </a>
                            <div class="writer-lower">${board.boardCreateDate}</div>
                        </div>
                        <!-- 조회수 / 좋아요 -->
                        <div class="etc-info">
                            <div class="etc-upper">조회수: ${board.readCount}</div>
                            <div class="etc-lower">좋아요: ${board.likeCount}</div>
                        </div>
                    </div>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </section>
    
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <script src="/resources/js/board/board.js"></script>
</body>
</html>
