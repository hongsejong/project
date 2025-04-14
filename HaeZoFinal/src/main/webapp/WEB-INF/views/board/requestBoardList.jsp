<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>



<c:set var="requestBoardList" value="${map.requestBoardList}"/>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="categoryId" value="${map.categoryId}"/>
<c:set var="querySearch" value="${map.querySearch}"/>
<c:set var="searchCategory" value="${map.searchCategory}"/>
<%-- 현재 페이지의 카테고리 번호 --%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>의뢰 요청 게시판</title>
    <!-- 웹 폰트 CSS -->
    <link rel="stylesheet" href="/resources/fonts/pretendard-webfont/pretendard.css">

    <!-- flatpickr CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <!-- flatpickr JS -->
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <!-- flatpickr 한국어 locale 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ko.js"></script>
    <link rel="stylesheet" href="/resources/css/kds/common-style.css">
    <link rel="stylesheet" href="/resources/css/kds/requestBoardList.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <nav>
        <p class="navP">
            <a href="/requestBoard/0?cp=1">홈</a> > 
            <a href="/requestBoard/${requestBoardList[0].hiddenCategoryId}?cp=1">${requestBoardList[0].parentCategoryName}</a>
        </p>
        <br>
        <p class="navP2">
            <c:if test="${categoryId == 0}">
                전체
            </c:if>
            <c:if test="${categoryId == 1}">
                취업 / 직무 / 입시
            </c:if>
            <c:if test="${categoryId == 2}">
                영상 / 사진 / 음향
            </c:if>
            <c:if test="${categoryId == 3}">
                설치 / 수리
            </c:if>
            <c:if test="${categoryId == 4}">
                취미 / 자기계발
            </c:if>
            <c:if test="${categoryId == 5}">
                단순의뢰
            </c:if>
            <c:if test="${categoryId >= 6}">
                ${requestBoardList[0].categoryName}
            </c:if>
            </p>
        <br>
        <h3>주요 카테고리</h3>
        <ul>
            
            <li class="categoryLi"><a href="/requestBoard/1?cp=1"><div class="category-icon"><i class="fas fa-briefcase"></i></div><span>취업/직무</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/2?cp=1"><div class="category-icon"><i class="fas fa-video"></i></div><span>영상/사진</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/3?cp=1"><div class="category-icon"><i class="fas fa-tools"></i></div><span>설치/수리</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/4?cp=1"><div class="category-icon"><i class="fas fa-palette"></i></div><span>취미/자기계발</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/5?cp=1"><div class="category-icon"><i class="fas fa-hands-helping"></i></div><span>단순 의뢰</span></a></li>

        </ul>
        <div class="searchDiv">
            <form action="/requestBoard/search" method="GET" name="searchForm" id="searchForm">

                <div class="searchDivCondition">
                    <div class="price">가격 </div>
                    <input type="text" class="priceInput" placeholder="최소" autocomplete="off" id="minPriceInput"> 
                    <input type="text" class="priceInput" placeholder="최대" autocomplete="off" id="maxPriceInput">
                    <div class="requestBoardRegionRowLayout">
                        <div class="select-group">
                            <select id="regionSido">
                                <option value="sido" id="sido">시/도 선택</option>
                            </select>
                        </div>
                        <div class="select-group">
                            <select id="regionSigungu">
                                <option value="sigungu" id="sigungu">시/군/구 선택</option>
                            </select>
                        </div>
                        <div class="select-group">
                            <button type="button" id="categoryBtn" >카테고리 선택</button>
                        </div>
                        <div class="input-group">
                            <input type="text" id="requestDueDate" name="requestDueDate" placeholder="날짜 선택">
                        </div>
                    </div>
                    <fieldset class="searchFieldset">
                        <div class="searchInputBox">
                            <input type="text" name="query" id="query" placeholder="검색어를 입력해주세요." autocomplete="off">
                            <button id="searchBtn"><i class="fa fa-search"></i></button>
                        </div>
                    </fieldset>
                    <div class="searchCategoryBox">
                        <button type="button" id="searchCategoryBtn">전체</button>
                        <ul class="searchCategoryUl" id="searchCategoryUl">
                            <li>
                                <input type="radio" name="searchCategory" id="searchTitle" value="searchTitle">
                                <label for="searchTitle">제목</label>
                            </li>
                            <li>
                                <input type="radio" name="searchCategory" id="searchRequester" value="searchRequester">
                                <label for="searchRequester">의뢰인</label>
                            </li>
                            <li>
                                <input type="radio" name="searchCategory" id="searchContent" value="searchContent">
                                <label for="searchContent">내용</label>
                            </li>
                            <li>
                                <input type="radio" name="searchCategory" id="searchAll" value="searchAll">
                                <label for="searchAll">전체</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <input type="hidden" id="hiddenCategoryId" name="hiddenCategoryId" value="0">
                <input type="hidden" id="hiddenRegionSido" name="hiddenRegionSido" value="regionSidoAll">
                <input type="hidden" id="hiddenRegionSigungu" name="hiddenRegionSigungu" value="regionSigunguAll">
                <input type="hidden" id="hiddenSearchCategory" name="hiddenSearchCategory" value="searchAll">
                <input type="hidden" id="hiddenMinPrice" name="hiddenMinPrice" min="0" value="0">
                <input type="hidden" id="hiddenMaxPrice" name="hiddenMaxPrice" max="10000000" value="10000000">
            </form>
        </div>
    </nav>
    <main>
        <section class="mainSection">
            <aside class="sideBar">
                <div class="sideLinkBox"> 
                    <div class="linkContent">
                        <div>취업/직무/입시</div>
                        <a href="/requestBoard/6?cp=1">면접 컨설팅</a>
                        <a href="/requestBoard/7?cp=1">취업 컨설팅</a>
                        <a href="/requestBoard/8?cp=1">포트폴리오 컨설팅</a>
                        <a href="/requestBoard/9?cp=1">입시 컨설팅</a>
                    </div>
                    <div class="linkContent">
                        <div>영상/사진/음향</div>
                        <a href="/requestBoard/10?cp=1">영상 외주</a>
                        <a href="/requestBoard/11?cp=1">사진 외주</a>
                        <a href="/requestBoard/12?cp=1">음향 외주</a>
                    </div>
                    <div class="linkContent">
                        <div>설치/수리</div>
                        <a href="/requestBoard/13?cp=1">가전제품 설치</a>
                        <a href="/requestBoard/14?cp=1">문/창문 설치</a>
                        <a href="/requestBoard/15?cp=1">수도/보일러/전기 설치</a>
                    </div>
                    <div class="linkContent">
                        <div>취미/자기계발</div>
                        <a href="/requestBoard/16?cp=1">악기</a>
                        <a href="/requestBoard/17?cp=1">스포츠</a>
                        <a href="/requestBoard/18?cp=1">미술</a>
                        <a href="/requestBoard/19?cp=1">그 외</a>
                    </div>
                    <div class="linkContent">
                        <div>단순의뢰</div>
                        <a href="/requestBoard/20?cp=1">단순의뢰</a>
                    </div>
                </div>
            </aside>
            <section class="requestBoardItemBox">
                <div class="requestBoardItemDiv">
                    
                    <c:forEach items="${requestBoardList}" var="requestBoard">
                        <div class="requestBoardItem" boardNo="${requestBoard.boardNo}" categoryId="${requestBoard.hiddenCategoryId}">
                            <div class="imgBox">
                                <c:if test="${empty requestBoard.hiddenThumbnailUrl}">
                                    <img src="/resources/images/Logo.WebP" loading="lazy">
                                </c:if>
                                <c:if test="${!empty requestBoard.hiddenThumbnailUrl}">
                                    <img src="${requestBoard.hiddenThumbnailUrl}" loading="lazy">
                                </c:if>
                            </div>
                            <p>${requestBoard.boardTitle}</p>
                            <p>${requestBoard.memberNickname}</p>
                            <p>${requestBoard.categoryName}</p>
                            <p>${requestBoard.requestLocation}</p>
                            <p>${requestBoard.requestPrice}원</p>
                            <p>${requestBoard.requestDueDate}까지</p>
                            <p>의뢰 ${requestBoard.requestStatus}</p>
                        </div>
                        
                    </c:forEach>

                </div>
            </section>
        </section>
        <section class="paginationDiv">
            <div class="pagination-area">
                <!-- 페이지네이션 a 태그에 사용할 공통 주소를 저장할 변수 선언 -->
                <c:set var="url" value="${map.categoryId}?cp="></c:set>

                <c:if test="${pagination.maxPage > 1}">
                    <ul class="pagination">
                        <!-- 첫 페이지로 이동 -->
                        <li><a href="${url}1${qs}">&lt;&lt;</a></li>
    
                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li><a href="${url}${pagination.prevPage}${qs}">&lt;</a></li>
    
                        <!-- <li><a class="current">1</a></li>-->
                        <!-- <li><a href="${contextPath}/board/list?type=1&cp=2">2</a></li> -->
                        
                        <!-- 범위가 정해진 일반 for문 사용 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
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
                </c:if>
            </div>
        </section>
        <section class="requestBoardBtnBox">
            <c:if test="${!empty loginMember}">
                <button id="requestBtn">요청글 작성</button>
            </c:if>
        </section>

        <!-- modal -->
        <jsp:include page="/WEB-INF/views/common/requestBoardModal.jsp"/>

    </main>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    <input type="hidden" id="hiddenSearchCategory" name="hiddenSearchCategory" value="${searchCategory}">


    <script>
        const categoryId = "${map.categoryId}";
        const loginMember = "{loginMember}";
        const cp = "${pagination.currentPage}";
        const querySearch = "${querySearch}";
        const searchCategory = "${searchCategory}";
        const hiddenSearchCategory2  = document.getElementById("hiddenSearchCategory").value;
        console.log("제대로 갖고오는지 테스트용 : "+hiddenSearchCategory2);
        
    </script>
    <script src="/resources/js/kds/requestBoardCommon.js"></script>
    <script src="/resources/js/kds/requestBoardList.js"></script>
</body>
</html>