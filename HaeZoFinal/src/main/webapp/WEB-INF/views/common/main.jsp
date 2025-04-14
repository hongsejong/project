<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="requestList" value="${mainMap.requestList}"/>
<c:set var="recentRvList" value="${mainMap.recentRvList}"/>
<c:set var="mostBoardLikeList" value="${mainMap.mostBoardLikeList}"/>
<c:set var="popularSupporterList" value="${mainMap.popularSupporterList}"/>
<c:set var="topSupporterList" value="${mainMap.topSupporterList}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Toast UI Editor 기본 CSS/JS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-viewer.min.js"></script>

    <link rel="stylesheet" href="/resources/css/common/main-style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
    <title>main</title>
</head>
<body id="mainBody">
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <main>
        <section id="container">
            <!-- 메인-타이틀 -->
            <div id="titleArea">
                <p><h1 id="mainTitle"><h1 class="slogan">You <span>take care</span> of everything!</h1></h1></p>
            </div>
            <!-- 메인-메뉴(카테고리) -->
            <div id="categoryImgArea" >
                <a href="/requestBoard/1?cp=1"><div class="category-icon"><i class="fas fa-briefcase"></i></div><span>취업/직무</span></a>
                <a href="/requestBoard/2?cp=1"><div class="category-icon"><i class="fas fa-video"></i></div><span>영상/사진</span></a>
                <a href="/requestBoard/3?cp=1">
                    <div class="category-icon"><i class="fas fa-tools"></i></div>
                    <span>설치/수리</span>
                  </a>
                  
                  <a href="/requestBoard/4?cp=1">
                    <div class="category-icon"><i class="fas fa-palette"></i></div>
                    <span>취미/자기계발</span>
                  </a>
                  
                  <a href="/requestBoard/5?cp=1">
                    <div class="category-icon"><i class="fas fa-hands-helping"></i></div>
                    <span>단순 의뢰</span>
                  </a>
            </div>
            <!-- 컨테이너 -->
            <div id="containerArea">
                <!-- 1) 최신 의뢰 -->
                <div class="item-container scroll-section">
                    <p class="containerTitle"><h2>방금 올라온 의뢰들을 확인해보세요!&nbsp;👀</h2></p>
                    <!-- 의뢰 카테고리 -->
                    <div class="categoryArea">
                        <span class="category-itemT" data-index="0">취업/직무</span>
                        <span class="category-itemT" data-index="1">영상/사진</span>
                        <span class="category-itemT" data-index="2">설치/수리</span>
                        <span class="category-itemT" data-index="3">취미/자기계발</span>
                        <span class="category-itemT" data-index="4">단순 의뢰</span>
                    </div>
                    <!-- 의뢰 게시글 -->
                    <c:if test="${!empty requestList}">
                        <div class="card-container-1 scroll-section">
                            <c:forEach var="i" begin="0" end="${fn:length(requestList)-1}" step="2">
                                <div class="card" data-request-board-no = "${requestList[i].boardNo}" data-category-id="${requestList[i].categoryId}">
                                    <c:if test="${!empty requestList[i].thumbnail}">
                                        <img src="${requestList[i].thumbnail}" class="cardImg">
                                    </c:if>
                                    <c:if test="${empty requestList[i].thumbnail}">
                                        <img src="/resources/images/Logo.WebP" class="cardImg">
                                    </c:if>
                                    <p class="card-title">${requestList[i].boardTitle}</p>
                                    <p><span>${requestList[i].requestPrice}</span></p>
                                    <p><span>${requestList[i].memberNickname}</span></p>
                                </div>
                            </c:forEach>
                        </div>
                        <div class="card-container-2 scroll-section">
                            <c:forEach var="i" begin="1" end="${fn:length(requestList) - 1}" step="2">
                                <div class="card" data-request-board-no = "${requestList[i].boardNo}" data-category-id="${requestList[i].categoryId}">
                                    <c:if test="${!empty requestList[i].thumbnail}">
                                        <a href="#"><img src="${requestList[i].thumbnail}" class="cardImg"></a>
                                    </c:if>
                                    <c:if test="${empty requestList[i].thumbnail}">
                                        <a href="#"><img src="/resources/images/Logo.WebP" class="cardImg"></a>
                                    </c:if>
                                    <p class="card-title">${requestList[i].boardTitle}</p>
                                    <p><span>${requestList[i].requestPrice}</span></p>
                                    <p><span>${requestList[i].memberNickname}</span></p>
                                </div>
                            </c:forEach>
                        </div>
                    </c:if>
                    <c:if test="${empty requestList}">
                        <p class="noSelect">현재 작성된 의뢰 게시글이 없습니다..</p>
                    </c:if>
                </div>
                <!-- 2) 조력자 발견 -->
                <div class="item-container scroll-section">
                    <div id="title-area">
                        <span class="containerTitle"><h2>훌륭한 조력자를 발견했어요!&nbsp;👁‍🗨</h2></span>
                        <div>
                            <a href="${pageContext.request.contextPath}/completeReviewList" class="btn-review-complete">완료된 의뢰 리뷰 보기<button type="button">&gt;</button></a>
                        </div>
                    </div>
                    <c:if test="${!empty recentRvList}">
                        <!-- 조력자 발견_컨테이너 -->
                        <div id="caContainer" class="scroll-section">
                            <!-- 버튼 -->
                            <button id="carouselBtnLeft">&lt;</button>
                            <button id="carouselBtnRight">&gt;</button>
                            <!-- 캐러셀 영역 -->
                            <div id="caArea" class="scroll-section">
                                <!-- 리뷰 영역 -->
                                <div id="reviewArea" class="scroll-section">
                                    <!-- 리뷰 개별 항목 -->
                                    <c:forEach var="reviewCard" items="${recentRvList}">
                                        <a href="${pageContext.request.contextPath}/reviewDetail?boardNo=${reviewCard.boardNo}" style="text-decoration:none; color:inherit;">
                                        <div class="review-card">
                                            <p><span>${reviewCard.reviewRating}</span></p>
                                            <span class="reviewStar">
                                                <i class="star"></i>
                                                <i class="star"></i>
                                                <i class="star"></i>
                                                <i class="star"></i>
                                                <i class="star"></i>
                                            </span>
                                            <p id="reviewContent">${reviewCard.reviewContent}</p>
                                            <p id="reviewWriter">${reviewCard.supporterNick}</p>
                                        </div>
                                        </a>
                                    </c:forEach>
                                </div>
                                <!-- 프로필 영역 -->
                                <div id="avatarArea">
                                    <!-- 조력자 프로필 사진 -->
                                    <c:forEach var="reviewCard" items="${recentRvList}">
                                        <div class="review-avatar">
                                            <c:if test="${empty reviewCard.supporterProfile}">
                                                <img src="/resources/images/user.png" class="profileImg">
                                            </c:if>
                                            <c:if test="${!empty reviewCard.supporterProfile}">
                                                <img src="${reviewCard.supporterProfile}" class="profileImg">
                                            </c:if>
                                        </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                    </c:if>
                    <c:if test="${empty recentRvList}">
                        <p class="noSelect">현재 새로 발견된 훌륭한 조력자가 없습니다..</p>
                    </c:if>
                </div>
                <!-- 3) 커뮤니티 인기글 -->
                <div class="item-container scroll-section">
                    <div id="title-area">
                        <span class="containerTitle"><h2>해조 커뮤니티 인기글&nbsp;🔥</h2></span>
                        <div>
                            <span>자유게시판 전체보기</span>
                            <button onclick="location.href='/board/3'">&gt;</button>
                        </div>
                    </div>
                    <c:if test="${!empty mostBoardLikeList}">
                        <div id="popContentArea-1">
                            <c:forEach var="i" begin="0" end="1">
                                <div class="popular-content-card" data-board-No="${mostBoardLikeList[i].boardNo}">
                                    <div class="popContentTop">
                                        <div>
                                            <p id="popContTitle">${mostBoardLikeList[i].boardTitle}</p>
                                            <!-- Toast UI Viewer 적용할 부분 -->
                                            <div id="popConContentViewer_${mostBoardLikeList[i].boardNo}">
                                            </div>
                                        </div>
                                        <div>
                                            <c:if test="${empty mostBoardLikeList[i].thumbnail}">
                                                <img src="/resources/images/Logo.WebP" loading="lazy" id="popContentImg">
                                            </c:if>
                                            <c:if test="${!empty mostBoardLikeList[i].thumbnail}">
                                                <img src="${mostBoardLikeList[i].thumbnail}" loading="lazy" id="popContentImg">
                                            </c:if>
                                        </div>
                                    </div>
                                    <div class="popContentBottom">
                                        <div class="icon-area">
                                            <i id="view-comment-icon">👁‍🗨</i>
                                            <span>${mostBoardLikeList[i].readCount}</span>
                                            <i id="view-comment-icon">💬</i>
                                            <span>${mostBoardLikeList[i].commentCount}</span>
                                        </div>
                                        <div class="content-writer">
                                            <span>${mostBoardLikeList[i].memberNickname}</span>
                                            <c:if test="${empty mostBoardLikeList[i].profileImage}">
                                                <img src="/resources/images/user.png" loading="lazy" id="profileImg">
                                            </c:if>
                                            <c:if test="${!empty mostBoardLikeList[i].profileImage}">
                                                <img src="${mostBoardLikeList[i].profileImage}" loading="lazy" id="profileImg">
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                            </c:forEach>
                            <c:set var="boardNoJson">
                                [<c:forEach var="board1" items="${mainMap.mostBoardLikeList}" varStatus="status">"${board1.boardNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
                            </c:set>
                            <c:set var="boardContentJson">
                                [<c:forEach var="board2" items="${mainMap.mostBoardLikeList}" varStatus="status">"${fn:escapeXml(board2.boardContent)}"<c:if test="${!status.last}">,</c:if></c:forEach>]
                            </c:set>
                            <!-- Toast UI Viewer 적용 스크립트 -->
                            <script>
                                const boardNos1 = JSON.parse('${boardNoJson}');
                                const boardContents1 = JSON.parse('${boardContentJson}');
                                for(let i=0; i<=1; i++){
                                    let viewerElementInMain1 = document.querySelector("#popConContentViewer_" + boardNos1[i]);
                                    if (viewerElementInMain1) {
                                        viewerElementInMain1.classList.add("viewer");

                                        // data-content 속성에 HTML 복원된 값 저장
                                        let tempDiv1 = document.createElement("div");
                                        tempDiv1.innerHTML = boardContents1[i]; // HTML 디코딩
                                        let decodedContent1 = tempDiv1.textContent || tempDiv1.innerText;
                                        viewerElementInMain1.setAttribute("data-content", decodedContent1);

                                        applyToastViewerInMain1(viewerElementInMain1);
                                    }
                                }
                                function applyToastViewerInMain1(viewerElementInMain1) {
                                    let contentHtmlInMain1 = viewerElementInMain1.getAttribute("data-content");
                                    if (contentHtmlInMain1) {
                                        try {
                                            // Toast UI Viewer 생성 (HTML을 그대로 렌더링)
                                            new toastui.Editor({
                                                el: viewerElementInMain1,
                                                initialValue: contentHtmlInMain1, // HTML 그대로 사용
                                                viewer: true
                                            });
                                        } catch (error) {
                                            console.error("Viewer Rendering Error:", error);
                                        }
                                    }
                                }
                            </script>
                        </div>
                        <div id="popContentArea-2">
                            <c:forEach var="i" begin="2" end="3">
                                <div class="popular-content-card" data-board-No="${mostBoardLikeList[i].boardNo}" data-board-Code="${mostBoardLikeList[i].boardCode}">
                                    <div class="popContentTop">
                                        <div>
                                            <p id="popContTitle">${mostBoardLikeList[i].boardTitle}</p>
                                            <!-- Toast UI Viewer 적용할 부분 -->
                                            <div id="popConContentViewer_${mostBoardLikeList[i].boardNo}">
                                            </div>
                                        </div>
                                        <div>
                                            <c:if test="${empty mostBoardLikeList[i].thumbnail}">
                                                <img src="/resources/images/Logo.WebP" loading="lazy" id="popContentImg">
                                            </c:if>
                                            <c:if test="${!empty mostBoardLikeList[i].thumbnail}">
                                                <img src="${mostBoardLikeList[i].thumbnail}" loading="lazy" id="popContentImg">
                                            </c:if>
                                        </div>
                                    </div>
                                    <div class="popContentBottom">
                                        <div class="icon-area">
                                            <i id="view-comment-icon">👁‍🗨</i>
                                            <span>${mostBoardLikeList[i].readCount}</span>
                                            <i id="view-comment-icon">💬</i>
                                            <span>${mostBoardLikeList[i].commentCount}</span>
                                        </div>
                                        <div class="content-writer">
                                            <span>${mostBoardLikeList[i].memberNickname}</span>
                                            <c:if test="${empty mostBoardLikeList[i].profileImage}">
                                                <img src="/resources/images/user.png" loading="lazy" id="profileImg">
                                            </c:if>
                                            <c:if test="${!empty mostBoardLikeList[i].profileImage}">
                                                <img src="${mostBoardLikeList[i].profileImage}" loading="lazy" id="profileImg">
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                            </c:forEach>
                            <c:set var="boardNoJson">
                                [<c:forEach var="board1" items="${mainMap.mostBoardLikeList}" varStatus="status">"${board1.boardNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
                            </c:set>
                            <c:set var="boardContentJson">
                                [<c:forEach var="board2" items="${mainMap.mostBoardLikeList}" varStatus="status">"${fn:escapeXml(board2.boardContent)}"<c:if test="${!status.last}">,</c:if></c:forEach>]
                            </c:set>
                            <!-- Toast UI Viewer 적용 스크립트 -->
                            <script>
                                const boardNos2 = JSON.parse('${boardNoJson}');
                                const boardContents2 = JSON.parse('${boardContentJson}');
                                for(let i=2; i<=3; i++){
                                    let viewerElementInMain2 = document.querySelector("#popConContentViewer_" + boardNos2[i]);
                                    if (viewerElementInMain2) {
                                        viewerElementInMain2.classList.add("viewer");

                                        // data-content 속성에 HTML 복원된 값 저장
                                        let tempDiv2 = document.createElement("div");
                                        tempDiv2.innerHTML = boardContents2[i]; // HTML 디코딩
                                        let decodedContent2 = tempDiv2.textContent || tempDiv2.innerText;
                                        viewerElementInMain2.setAttribute("data-content", decodedContent2);

                                        applyToastViewerInMain2(viewerElementInMain2);
                                    }
                                }
                                function applyToastViewerInMain2(viewerElementInMain2) {
                                    let contentHtmlInMain2 = viewerElementInMain2.getAttribute("data-content");
                                    if (contentHtmlInMain2) {
                                        try {
                                            // Toast UI Viewer 생성 (HTML을 그대로 렌더링)
                                            new toastui.Editor({
                                                el: viewerElementInMain2,
                                                initialValue: contentHtmlInMain2, // HTML 그대로 사용
                                                viewer: true
                                            });
                                        } catch (error) {
                                            console.error("Viewer Rendering Error:", error);
                                        }
                                    }
                                }
                            </script>
                        </div>
                    </c:if>
                    <c:if test="${empty mostBoardLikeList}">
                        <p class="noSelect">현재 커뮤니티 인기 게시글이 없습니다..</p>
                    </c:if>
                </div>
                <!-- 4) 인기 조력자 -->
                <div class="item-container scroll-section">
                    <!-- 타이틀 -->
                    <p class="containerTitle"><h2>해조 인기 조력자&nbsp;🌟</h2></p>
                    <!-- 카테고리 영역 -->
                    <div class="categoryArea">
                        <span class="category-itemB" data-index="0">취업/직무</span>
                        <span class="category-itemB" data-index="1">영상/사진</span>
                        <span class="category-itemB" data-index="2">설치/수리</span>
                        <span class="category-itemB" data-index="3">취미/자기계발</span>
                        <span class="category-itemB" data-index="4">단순 의뢰</span>
                    </div>
                    <!-- 조력자 프로필 영역 -->
                    <div class="supporterProfileArea">
                        <c:if test="${!empty popularSupporterList}">
                            <!-- 조력가 개별 프로필 -->
                            <c:forEach var="supporter" items="${popularSupporterList}">
                                <div class="supporter-profile-card">
                                    <div>
                                        <c:if test="${empty supporter.supporterProfile}">
                                            <img src="/resources/images/user.png" loading="lazy" class="supporterProfileImgP">
                                        </c:if>
                                        <c:if test="${!empty supporter.supporterProfile}">
                                            <img src="${supporter.supporterProfile}" loading="lazy" class="supporterProfileImgP">
                                        </c:if>
                                    </div>
                                    <div class="supporterStars-area">
                                        <i class="supporterStar"></i>
                                        <i class="supporterStar"></i>
                                        <i class="supporterStar"></i>
                                        <i class="supporterStar"></i>
                                        <i class="supporterStar"></i>
                                    </div>
                                    <p class="supporterNickname">${supporter.supporterNickname}</p>
                                    <p class="supporterService">${supporter.topChildCategory}</p>
                                </div>
                            </c:forEach>
                        </c:if>
                        <c:if test="${empty popularSupporterList}">
                            <p class="noSelect">현재 해조의 인기 조력자가 없습니다..</p>
                        </c:if>
                    </div>
                </div>
                <!-- 5) 조력자 랭킹 -->
                <div class="item-container scroll-section">
                    <p class="containerTitle"><h2>해조 조력자 랭킹&nbsp;👑</h2></p>
                    <p id="ranking-ex">회원들에게 가장 많은 도움을 준 조력자예요</p>
                    <div class="supporterProfileArea">
                        <c:if test="${!empty topSupporterList}">
                            <c:forEach var="i" begin="0" end="${fn:length(topSupporterList)-1}">
                                <div class="supporter-profile-card">
                                    <div>
                                        <c:if test="${empty topSupporterList[i].supporterProfile}">
                                            <img src="/resources/images/user.png" loading="lazy" class="supporterProfileImgT">
                                        </c:if>
                                        <c:if test="${!empty topSupporterList[i].supporterProfile}">
                                            <img src="${topSupporterList[i].supporterProfile}" loading="lazy" class="supporterProfileImgT">
                                        </c:if>
                                    </div>
                                    <p class="supporterNickname">${topSupporterList[i].supporterNickname}</p>
                                    <p class="supporterService">${topSupporterList[i].parentCategoryName}</p>
                                    <p><img class="ranking" src="/resources/images/main/number-${i+1}.png" loading="lazy"></img></p>
                                </div>
                            </c:forEach>
                        </c:if>
                        <c:if test="${empty topSupporterList}">
                            <div class="supporter-profile-card">
                                <p class="noSelect">현재 해조 조력자 랭킹은 공석 입니다..</p>
                            </div>
                        </c:if>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <!-- 전역변수 설정(2_리뷰 & 4_조력자 별점 부여) -->
    <c:set var="reviewRatingsJson">
        [<c:forEach var="reviewCard" items="${mainMap.recentRvList}" varStatus="status">"${reviewCard.reviewRating}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <c:set var="supporterRatingsJson">
        [<c:forEach var="supporter" items="${mainMap.popularSupporterList}" varStatus="status">"${supporter.reviewRating}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <!-- 전역변수 설정(마이페이지 팝업창 띄우기 위한 회원 번호) -->
    <c:set var="reviewMemNoJson">
        [<c:forEach var="review" items="${mainMap.recentRvList}" varStatus="status">"${review.memberNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <c:set var="boardMemNoJson">
        [<c:forEach var="popularBoard" items="${mainMap.mostBoardLikeList}" varStatus="status">"${popularBoard.memberNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <c:set var="popularSupporterMemNoJson">
        [<c:forEach var="popularSupporter" items="${mainMap.popularSupporterList}" varStatus="status">"${popularSupporter.memberNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <c:set var="topSupporterMemNoJson">
        [<c:forEach var="topSupporter" items="${mainMap.topSupporterList}" varStatus="status">"${topSupporter.memberNo}"<c:if test="${!status.last}">,</c:if></c:forEach>]
    </c:set>
    <script>
        const reviewRatings = JSON.parse('${reviewRatingsJson}');
        const supporterRatings = JSON.parse('${supporterRatingsJson}');
        const reviewMemNos = JSON.parse('${reviewMemNoJson}');
        const popBoardMemNos = JSON.parse('${boardMemNoJson}');
        const popularSupporterMemNos = JSON.parse('${popularSupporterMemNoJson}');
        const topSupporterMemNos = JSON.parse('${topSupporterMemNoJson}');
    </script>
    <!-- js 연결 -->
    <script src="/resources/js/common/main.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
          const sections = document.querySelectorAll('.scroll-section');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
              }
            });
          }, {
            threshold: 0.1
          });
      
          sections.forEach(section => observer.observe(section));
        });
      </script>
      

</body>
</html>