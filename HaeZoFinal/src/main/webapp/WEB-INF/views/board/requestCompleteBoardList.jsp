<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>의뢰 완료 목록 게시판</title>
    <link rel="stylesheet" href="../resources/css/request/requestCompleteBoardList.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    
    <div class="content-wrapper">
        <h2 class="board-title">
            <c:choose>
                <c:when test="${not empty helperNick}">
                  ${helperNick} 님의 의뢰 완료 리뷰 목록
                </c:when>
                <c:otherwise>
                  의뢰 완료 리뷰 목록
                </c:otherwise>
            </c:choose>      
        </h2>
        
        <!-- 검색창 영역 (helperNick 검색) -->
        <div class="search-container">
            <form action="${pageContext.request.contextPath}/completeReviewList" method="get">
                <input type="text" name="helperNick" placeholder="조력자 닉네임 검색" class="search-input"
                       value="${helperNick}" />
                <button type="submit" class="search-button">검색</button>
            </form>
        </div>
        
        <!-- 리뷰 리스트 -->
        <c:if test="${not empty completeReviewList}">
            <c:forEach var="review" items="${completeReviewList}">
                <a href="${pageContext.request.contextPath}/reviewDetail?boardNo=${review.boardNo}" class="request-item-link">
                    <div class="request-item">
                        <div class="request-item-left">
                            <c:choose>
                                <c:when test="${not empty review.clientProfile}">
                                    <img src="${review.clientProfile}" alt="의뢰인 프로필">
                                </c:when>
                                <c:otherwise>
                                    <img src="../resources/images/user.png" alt="의뢰인 프로필">
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="request-item-center">
                            <div class="nickname">의뢰인 : ${review.clientNick}</div>
                            <div class="request-title">의뢰 제목: ${review.boardTitle}</div>
                            <div class="status">의뢰 완료 등록</div>
                            <div class="comment-line">한줄평: ${review.reviewContent}</div>
                        </div>
                        <div class="request-item-right">
                            <span class="star">★</span>
                            ${review.reviewRating}
                        </div>
                    </div>
                </a>
            </c:forEach>
        </c:if>
        
        <!-- 리뷰 없을 때 -->
        <c:if test="${empty completeReviewList}">
            <p class="noSelect">현재 의뢰 완료된 리뷰가 없습니다.</p>
        </c:if>
        
        <!-- 페이지네이션 -->
        <div class="pagination">
            <c:if test="${pagination.currentPage > 1}">
                <a href="?cp=1" class="page-link">&laquo;&laquo;</a>
                <a href="?cp=${pagination.prevPage}" class="page-link">&laquo;</a>
            </c:if>
            
            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
                <c:choose>
                    <c:when test="${i == pagination.currentPage}">
                        <span class="page-number active">${i}</span>
                    </c:when>
                    <c:otherwise>
                        <a href="?cp=${i}" class="page-number">${i}</a>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
            
            <c:if test="${pagination.currentPage < pagination.maxPage}">
                <a href="?cp=${pagination.nextPage}" class="page-link">&raquo;</a>
                <a href="?cp=${pagination.maxPage}" class="page-link">&raquo;&raquo;</a>
            </c:if>
        </div>
    </div>

    <!-- footer include 필요 시 아래 주석 해제 -->
    <%-- <jsp:include page="/WEB-INF/views/common/footer.jsp"/> --%>
</body>
</html>
