<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>상세 의뢰 후기</title>
  <link rel="stylesheet" href="/resources/css/request/requestCompleteReviewDetail.css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- 헤더 (include) -->
  <jsp:include page="/WEB-INF/views/common/header.jsp"/>

  <div class="content-wrapper">

    <div class="top-controls">
      <h2 class="detail-review-title">상세 의뢰 후기</h2>
      <!-- 완료된 리뷰 목록으로 이동 -->
      <a href="${pageContext.request.contextPath}/completeReviewList?helperId=${review.helperId}&helperNick=${review.helperNick}" class="review-list-link">
        완료된 의뢰 리뷰 보기
      </a>
    </div>

    <div class="helper-highlight">
      <strong>${review.helperNick}</strong> 조력자님에 대한 의뢰 완료 상세 후기입니다.
    </div>

    <!-- 의뢰 정보 -->
    <div class="info-section">
      <div class="info-item">의뢰 제목: ${review.boardTitle}</div>
      <div class="info-item">의뢰 날짜: ${review.boardCreateDate}</div>
      <div class="info-item">의뢰 내용: ${review.boardContent}</div>
      <div class="info-item">의뢰 비용: ${review.requestPrice}원</div>
    </div>

    <!-- 리뷰 섹션 -->
    <div class="review-section">
      <div class="review-left">
        <c:choose>
          <c:when test="${not empty review.supporterProfile}">
            <img src="${review.supporterProfile}" alt="프로필 이미지" class="profile-img">
          </c:when>
          <c:otherwise>
            <img src="/resources/images/user.png" alt="프로필 이미지" class="profile-img">
          </c:otherwise>
        </c:choose>

        <div class="supporter-nickname">${review.helperNick}</div>

        <div class="star-rating">
          ${review.reviewRating}
        </div>
      </div>
      <div class="review-right">
        <div class="review-content">
          ${review.reviewContent}
        </div>
        <div class="review-writer">
          작성자: ${review.clientNick}
        </div>
      </div>
    </div>

    <!-- 제공 서비스 -->
    <div class="service-section">
      의뢰자 제공 서비스: <br>
      - ${review.categoryName}
    </div>
  </div>

  <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
</body>
</html>
