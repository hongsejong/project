<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="singoList" value="${map.boardList}" />
<c:set var="pagination" value="${map.pagination}" />
<c:set var="searchParam" value=""/>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고 관리</title>
    <link rel="stylesheet" href="../../resources/css/hsj/singoList.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
</head>
<header>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
</header>
<body>

    <div id="main-container">
        <div id="header">
            <p id="mytext">🚨&nbsp;신고 관리</p>
            <!-- <div id="search-area">
                <input type="text" id="search-box" placeholder="검색어 입력">
                <button id="search-btn">검색</button>
            </div> -->
        </div>

        <div id="check-area">
            <div id="check-area">
                <select onchange="changeListCount(this.value)">
                    <option value="10" ${listCount == 10 ? 'selected' : ''}>10개씩 보기</option>
                    <option value="20" ${listCount == 20 ? 'selected' : ''}>20개씩 보기</option>
                    <option value="50" ${listCount == 50 ? 'selected' : ''}>50개씩 보기</option>
                </select>
            <br>
            처리 전만 보기
            <input type="checkbox" id="boardStatus" onclick="boardStatus()">
        </div>
        <form id="reportForm" action="/handleReport" method="post">
        <table id="table">
            <thead>
                <tr>
                    <th>선택</th>
                    <th>신고 번호</th>
                    <th>제목</th>
                    <th>글 작성자</th>
                    <th>신고자</th>
                    <th>신고유형</th>
                    <th>처리결과</th>
                </tr>
            </thead>
            <c:if test="${empty singoList}">
                <tr><td colspan="7">게시글이 존재하지 않습니다.</td></tr>
            </c:if>
            <tbody>
                <c:forEach var="singo" items="${singoList}">
                <!-- 하나 시작 -->
                 
                <tr class="tr">
                    <td><input type="checkbox" name="reportNos" value="${singo.reportNo}"></td> <!-- 선택 체크박스 -->
                    <td>${singo.reportNo}</td>
                    <td><a href="#" class="singoDetailOpen" data-report-no="${singo.reportNo}">${singo.reportTitle}</a></td>
                    <!-- <c:if test="${singo.boardCode ne '5'}">
                        <td><a href="/board/${singo.boardCode}/${singo.boardNo}">${singo.reportTitle}</a></td>
                    </c:if>
                    <c:if test="${singo.boardCode eq '5'}">
                        <td><a href="/requestBoard/0/${singo.boardNo}">${singo.reportTitle}</a></td>
                    </c:if> -->
                    <td>${singo.reportedNickname}</td>
                    <td>${singo.reporterNickname}</td>
                    <td>
                        <c:if test="${singo.reportType eq '1'}">
                            <span>허위 정보를 기재하였습니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '2'}">
                            <span>부적절한 사진입니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '3'}">
                            <span>부적절한 내용입니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '4'}">
                            <span>규정을 위반하였습니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '5'}">
                            <span>기타</span>
                        </c:if>
                    </td>
                    <td>
                        <c:if test="${singo.reportResult eq 'A'}">
                            <span class="status-pending">처리 전</span>
                        </c:if>
                        <c:if test="${singo.reportResult eq 'B'}">
                            <span class="status-complete">무효</span>
                        </c:if>
                        <c:if test="${singo.reportResult eq 'C'}">
                            <span class="status-cancel">글 삭제</span>
                        </c:if>
 
                    </td>


                </tr>
            </c:forEach>
                <!-- 하나 끝 -->
                

              
            </tbody>
        </table>
        <div id="btn2-area">
            <button name="action" value="ignore">신고 무시</button>
            <button name="action" value="delete">글 삭제</button>
        </form>
        </div>
        <section id="page-search">
            <div class="pagination-area">
                <c:set var="url" value="/singo?cp="/>
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

   



    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
    <script src="/resources/js/singo.js"></script>
    <script SRC="/resources/js/singoList.js"></script>
    <!-- listCount 전역변수 -->
<script>
    let currentListCount = '${listCount}';  
</script>
<jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
<!-- footer -->

</html>