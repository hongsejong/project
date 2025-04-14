<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

<c:set var="locationParts" value="${fn:split(requestBoard.requestLocation, ' ')}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>의뢰 요청 게시판 게시글 수정 페이지</title>

    <link rel="stylesheet" href="/resources/css/kds/common-style.css">
    <link rel="stylesheet" href="/resources/css/kds/requestBoardUpdate.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>

    <!-- 토스트 에디터 CSS -->
    <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
    <!-- 토스트 에디터 JS -->
    <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>

    <!-- 웹 폰트 CSS -->
    <link rel="stylesheet" href="/resources/fonts/pretendard-webfont/pretendard.css">

<!-- flatpickr CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<!-- flatpickr JS -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<!-- flatpickr 한국어 locale 추가 -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ko.js"></script>

</head>
<body>
    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <nav>
        <h3>주요 카테고리</h3>
        <ul>
            
            <li class="categoryLi"><a href="/requestBoard/1?cp=1"><div class="category-icon"><i class="fas fa-briefcase"></i></div><span>취업/직무</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/2?cp=1"><div class="category-icon"><i class="fas fa-video"></i></div><span>영상/사진</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/3?cp=1"><div class="category-icon"><i class="fas fa-tools"></i></div><span>설치/수리</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/4?cp=1"><div class="category-icon"><i class="fas fa-palette"></i></div><span>취미/자기계발</span></a></li>
            <li class="categoryLi"><a href="/requestBoard/5?cp=1"><div class="category-icon"><i class="fas fa-hands-helping"></i></div><span>단순 의뢰</span></a></li>

        </ul>
        
    </nav>
    <main>
        <form action="/requestBoard2/${categoryId}/${requestBoard.boardNo}/update" name="requestBoardForm" id="requestBoardUpdateForm" method="POST">
            <section class="requestBoardTitle">
                <div class="requestBoardTitleDiv">
                    <input type="text" name="boardTitle" id="boardTitle" placeholder="제목 입력" value="${requestBoard.boardTitle}" autocomplete="off" maxlength="20">
                </div>
            </section>
            
            <section class="requestBoardRegionCategory">
                <div class="requestBoardRegionRowLayout">
                    <div class="select-group">
                        <label for="regionSido">시/도</label>
                        <select id="regionSido" name="regionSido">
                            <option value="" id="sido">${locationParts[0]}</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label for="regionSigungu">시/군/구</label>
                        <select id="regionSigungu" name="regionSigungu">
                            <option value="" id="sigungu">${locationParts[1]}</option>
                        </select>
                    </div>
                    <div class="select-group">
                        <label for="categoryBtn">카테고리</label>
                        <button type="button" id="categoryBtn" >${requestBoard.categoryName}</button>
                    </div>
                    
                    <div class="input-group">
                        <label for="requestDueDate">의뢰 기한</label>
                        <input type="text" id="requestDueDate" name="requestDueDate" placeholder="날짜 선택" value="${requestBoard.requestDueDate}">
                    </div>
                    <div class="input-group">
                        <label for="requestPrice" id="requestPriceLabel">의뢰 가격</label>
                        <div class="inputWon">
                            <input type="text" id="requestPrice" name="requestPrice" placeholder="가격 입력" value="${requestBoard.requestPrice}" autocomplete="off">
                            <div class="divWon">원</div>
                        </div>
                    </div>

                </div>
                
            </section>
            
            <section class="requestBoardContent">
                <div id="toastEditor">${requestBoard.boardContent}</div>
                <input type="hidden" name="boardContent" id="hiddenContent">
            </section>

            <input type="hidden" id="hiddenCategoryId" name="hiddenCategoryId" value="${requestBoard.hiddenCategoryId}">
            <input type="hidden" id="hiddenRegionSido" name="hiddenRegionSido" value="${requestBoard.hiddenRegionSido}">
            <input type="hidden" id="hiddenRegionSigungu" name="hiddenRegionSigungu" value="${requestBoard.hiddenRegionSigungu}" >
            <input type="hidden" name="hiddenThumbnailUrl" id="hiddenThumbnailUrl" value="${requestBoard.hiddenThumbnailUrl}">
        </form>

        <!-- modal -->
        <jsp:include page="/WEB-INF/views/common/requestBoardModal.jsp"/>


        <section class="requestBoardBtnBox">
            <div>
                <button id="requestUpdateBtn">수정</button>
            </div>
            <div>
                <button id="goToListBtn">목록으로</button>
            </div>
        </section>
    </main>
    <!-- footer -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script>
        const locationParts1 = "${locationParts[0]}";
        const locationParts2 = "${locationParts[1]}";
        const categoryId = "${requestBoard.hiddenCategoryId}";
    </script>
    
    
    <script src="/resources/js/kds/requestBoardCommon.js"></script>
    <script src="/resources/js/kds/requestBoardUpdate.js"></script>
</body>
</html>