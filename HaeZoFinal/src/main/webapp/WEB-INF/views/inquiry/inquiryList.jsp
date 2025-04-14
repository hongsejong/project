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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
</head>
<body>

<header>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
</header>

<div id="main-container">
    <div id="header">
        <p id="mytext"><a href="/inquiryList">📬전체 문의내역</a></p>
        <!-- <div id="search-area">
            <input type="text" id="search-box" placeholder="검색어 입력">
            <button id="search-btn">검색</button>
        </div> --> 
    </div>
    <div id="check-area">
        <select onchange="changeListCount(this.value)">
            <option value="10" ${listCount == 10 ? 'selected' : ''}>10개씩 보기</option>
            <option value="20" ${listCount == 20 ? 'selected' : ''}>20개씩 보기</option>
            <option value="50" ${listCount == 50 ? 'selected' : ''}>50개씩 보기</option>
        </select>
        
        
        <br>
        답변 전만 보기
        <input type="checkbox" id="boardStatus" onclick="boardStatus()">
        
    </div>

    <table id="table">
        <thead>
            <tr>
                <th>문의번호</th>
                <th>문의제목</th>
                <th>처리결과</th>
                <!-- <th>관리</th> -->
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
                    <!-- <td>
                        <button class="edit-btn">수정</button>
                        <button class="delete-btn">삭제</button>
                    </td> -->
                </tr>
            </c:forEach>
        </tbody>
    </table>

    <section id="page-search">
        <div class="pagination-area">
            <c:set var="url" value="/inquiryList?cp="/>
            <ul class="pagination">
                <li><a href="${url}1&listCount=${listCount}">&lt;&lt;</a></li>
                <li><a href="${url}${pagination.prevPage}&listCount=${listCount}">&lt;</a></li>
                <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
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


