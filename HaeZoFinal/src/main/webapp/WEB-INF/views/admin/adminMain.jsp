<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>관리자 페이지</title>
    <link rel="stylesheet" href="../../resources/css/hsj/adminPage.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
<style>
body {
    font-family: 'Pretendard', sans-serif;
}
</style>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <div id="main-container">
        <div id="left">
            <div id="adp-text">관리자 페이지</div>
            <div class="adcontent" id="bun">📊&nbsp;분석</div>
            <div class="adcontent" id="inquiry2">📬&nbsp;문의 관리</div>
            <div class="adcontent" id="singo2">🚨&nbsp;신고 관리</div>
            <div class="adcontent" id="calendarBtn">📆&nbsp;오늘의할일</div>
            <div class="adcontent" id="adminChatBtn">💬&nbsp;1:1채팅 관리</div>
            <div class="adcontent" id="settingBtn">⚙️&nbsp;설정</div>

        </div><!-- left끝 -->
        <div id="right">
            <div id="first">
                <h1>📅&nbsp;Today</h1>
                <span id="clock"></span>
            </div>

            <div id="secend">
                <div id="today">
                    <div id="today-text">
                        👥&nbsp;전체 방문자수
                        <div id="today-count" class="counting" data-count="${visitCount + 1471}">${visitCount}</div>
                    </div>
                        <!-- <div id="img-box">
                            <div id="today-img" class="fa-solid fa-arrow-up">1</div>
                        </div> -->
                        
                    </div>
                    <!--  -->
                <div id="today">
                    <div id="today-text">
                        📝&nbsp;오늘의 게시글 수
                        <div id="today-count" class="counting" data-count="${todayBoardCount}">${todayBoardCount}</div>
                    </div>
                        <div id="img-box">
                            <c:if test="${0 <= yesCount}">
                                <div id="today-img" class="fa-solid fa-arrow-up " ><div>${yesCount}</div></div>
                            </c:if>
                            <c:if test="${0 > yesCount}">
                                <div id="today-img" class="fa-solid fa-arrow-down "  style="color: blue;"><div>${yesCount}</div></div>
                            </c:if>
                        </div>
                        
                    </div>
                    <!--  -->
                <div id="today">
                    <div id="today-text">
                        📩&nbsp;오늘의 문의횟수
                        <div id="today-count"class="counting" data-count="${todayInquiryCount}">${todayInquiryCount}</div>
                    </div>
                        <div id="img-box">
                            <c:if test="${0<=iyesCount}">
                                <div id="today-img" class="fa-solid fa-arrow-up" ><div>${iyesCount}</div></div>
                            </c:if>
                            <c:if test="${0>iyesCount}">
                                <div id="today-img" class="fa-solid fa-arrow-down"  style="color: blue;"><div>${iyesCount}</div></div>
                            </c:if>
                        </div>
                        
                    </div>
                    <!--  -->
                </div>


<!-- 설정 버튼을 누르면 이 영역 드래그 정렬 가능 -->
<div class="board-container bsize" id="sortable-wrap">
    
    <div class="sortable-box" id="notice-box" data-type="notice">
        <!-- 공지사항 내용 -->
        <div class="notice">
            <div class="notice-text">
                <div class="notice-board news-text" >📢&nbsp;공지사항</div>
                <a href="/board/2?cp=1" class="all-text">전체보기&gt;</a>
            </div>
            <div class="notice-in">
                <!-- 공지사항 목록 4개 -->
                <c:forEach var="b" begin="0" end="3">
                    <div >
                        <span class="notice-icon">공지</span>
                        <a href="/board/2/${map.boardList[b].boardNo}" class="news-title">
                            ${map.boardList[b].boardTitle}
                        </a>
                        <span class="notice-date">${map.boardList[b].boardCreateDate}</span>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>

    <div class="sortable-box" id="news-box" data-type="news">
        <!-- 새소식 내용 -->
        <div class="news">
            <div class="news-text">
                <div> 📰&nbsp;새소식</div>
                <a href="/board/1?cp=1" class="all-text">전체보기&gt;</a>
            </div>
            <div class="news-in">
                <c:forEach var="b" begin="0" end="3">
                    <div >
                        <c:choose>
                            <c:when test="${map2.boardList[b].boardCode eq '3'}">
                                <span class="news-icon">자유</span>
                                <a href="/board/3/${map2.boardList[b].boardNo}" class="news-title">
                                    ${map2.boardList[b].boardTitle}
                                </a>
                            </c:when>
                            <c:otherwise>
                                <span class="news-icon" style="color: #3B7F65;">의뢰</span>
                                <a href="/requestBoard/0/${map2.boardList[b].boardNo}" class="news-title">
                                    ${map2.boardList[b].boardTitle}
                                </a>
                            </c:otherwise>
                        </c:choose>
                        <span class="news-date">${map2.boardList[b].boardCreateDate}</span>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>

    <div class="sortable-box" id="report-box" data-type="report">
        <!-- 새로운 신고 -->
        <div class="notice">
            <div class="notice-text">
                <div class="notice-board news-text"> 🚨&nbsp;새로운 신고</div>
                <a href="/singo" class="all-text">전체보기&gt;</a>
            </div>
            <div class="notice-in">
                <c:forEach var="r" begin="0" end="3">
                    <div>
                        <span class="singo-icon">신고</span>
                        <a href="#" class="singoDetailOpen news-title" data-report-no="${map3.boardList[r].reportNo}" return false>
                            ${map3.boardList[r].reportTitle}
                        </a>
                        <c:choose>
                            <c:when test="${map3.boardList[r].reportResult eq 'A'}">
                                <span class="news-date">처리 결과 : 처리 전</span>
                            </c:when>
                            <c:when test="${map3.boardList[r].reportResult eq 'B'}">
                                <span class="news-date">처리 결과 : 무효</span>
                            </c:when>
                            <c:otherwise>
                                <span class="news-date">처리 결과 : 글 삭제</span>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>

    <div class="sortable-box" id="inquiry-box" data-type="inquiry">
        <!-- 새로운 문의 -->
        <div class="news">
            <div class="news-text">
                <div>	📩&nbsp;새로운 문의</div>
                <a href="/inquiryList" class="all-text">전체보기&gt;</a>
            </div>
            <div class="news-in">
                <c:forEach var="q" begin="0" end="3">
                    <div >
                        <span class="inq-icon">문의</span>
                        <a href="/inquiryList/${map4.boardList[q].boardNo}" class="news-title">
                            ${map4.boardList[q].boardTitle}
                        </a>
                        <span class="news-date">${map4.boardList[q].boardCreateDate}</span>
                    </div>
                </c:forEach>
            </div>
        </div>
    </div>

</div>

                <div id="btsize"></div>
            </div> <!-- right닫는거--> 
        </div>
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
<script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="../../resources/js/singo.js"></script>
<script src="../../resources/js/adminPage.js"></script>
</body>
</html>