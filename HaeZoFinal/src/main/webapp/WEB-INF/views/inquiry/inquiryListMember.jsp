<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<c:set var="boardList" value="${map.boardList}" />
<c:set var="pagination" value="${map.pagination}" />
<c:set var="searchParam" value=""/>

<!-- YNStatus 값이 있으면 searchParam에 추가 -->
<c:if test="${not empty param.YNStatus}">
    <c:set var="searchParam" value="&YNStatus=${param.YNStatus}" />
</c:if>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>고객센터 메인</title>
    <link rel="stylesheet" href="../../resources/css/hsj/InquiryList.css">
</head>
<body>

<header>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
</header>

<div id="main-container">
    <div id="header">
        <p id="mytext"><a href="/inquiryListMember">📬내 문의내역</a></p>
        <!-- <div id="search-area">
            <input type="text" id="search-box" placeholder="검색어 입력">
            <button id="search-btn">검색</button>
        </div> -->
    </div>

 
    <table id="table">
        <thead>
            <tr>
                <th>문의번호</th>
                <th>문의제목</th>
                <th>처리결과</th>
            </tr>
        </thead>
        <tbody>
            <c:if test="${empty boardList}">
                <tr><td colspan="4">게시글이 존재하지 않습니다.</td></tr>
            </c:if>
            <c:forEach var="board" items="${boardList}">
                <tr class="tr">
                    <td>${board.boardNo}</td>
                    <td><a href="/inquiryList/${board.boardNo}?cp=${pagination.currentPage}">${board.boardTitle}</a></td>
                    <td>
                        <c:choose>
                            <c:when test="${board.boardStatus eq 'N'}">
                                <span class="status-pending">답변 전</span>
                            </c:when>
                            <c:otherwise>
                                <span class="status-complete">답변 완료</span>
                            </c:otherwise>
                        </c:choose>
                    </td>

                </tr>
            </c:forEach>
        </tbody>
    </table>
    <section id="page-search">
        <div class="pagination-area">
            <c:set var="url" value="/inquiryListMember?cp="/>
            <ul class="pagination">
                <li><a href="${url}1&listCount=${listCount}">&lt;&lt;</a></li>
                <li><a href="${url}${pagination.prevPage}&listCount=${listCount}">&lt;</a></li>
                <c:forEach var="i" begin="${map.pagination.startPage}" end="${map.pagination.endPage}">
                    <c:choose>
                        <c:when test="${pagination.currentPage == i}">
                            <li><a class="current">${i}</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="${url}${i}&listCount=${listCount}">${i}</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
                <li><a href="${url}${pagination.nextPage}&listCount=${listCount}">&gt;</a></li>
                <li><a href="${url}${pagination.maxPage}&listCount=${listCount}">&gt;&gt;</a></li>
            </ul>
        </div>
    </section>
    

    <div id="add-post">
        <a href="/inquiryWrite">
            <button id="add-btn">새 문의 등록</button>
        </a>
    </div>
</div>

    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

<script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>

<!-- listCount 전역변수 -->
<script>
    let currentListCount = '${listCount}';  
</script>
<script src="/resources/js/inquiryList.js"></script>


</body>
</html>


