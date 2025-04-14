<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/kds/requestBoardModal.css">

<!-- 조력자 요청 동의 -->
<div class="modal-overlay" id="modalOverlay">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">조력자 신청 시 다음 주의사항에 모두 동의해주세요.</h2>
            <button class="close-modal" id="closeModal">X</button>
        </div>
        <div class="modal-body">
            <p>주의사항 1 : 의뢰인에게 조력자로 선택된 이후에는 조력자 신청을 철회할 수 없습니다.</p>
            <p>주의사항 2 : 의뢰인에게 조력자로 선택된 이후 의뢰를 기한까지 완수하지 못할 경우 불이익을 받습니다.</p>
            <p>주의사항 3 : 의뢰를 완수했음에도 의뢰인이 의뢰를 완료하지 않을 경우 고객센터에 신고해 주십시오.</p>
            <p>주의사항 4 : 해조 운영정책 및 이용약관, 법에 저촉되는 의뢰 수락 시 처벌을 받을 수 있습니다.</p>
        </div>
        <div class="modal-agree">
            <label for="agreeCheck">
                <input type="checkbox" name="agreeCheck" id="agreeCheck"> 위 주의사항에 동의합니다.
            </label>
        </div>
        <div class="modal-footer">
            <button id="requestConfirmBtn">해줄게요~!</button>
            <button id="requestNoConfirm">안할게요</button>
        </div>
    </div>
</div>

<!-- 조력자 요청 확인 -->
<div class="modal-overlay" id="modalOverlay2">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">이 의뢰의 조력자로 요청하시겠습니까?</h2>
            <button class="close-modal" id="closeModal2">X</button>
        </div>
        <div class="modal-body">
            <p>의뢰인이 조력자 요청을 받아들이기 전까지 언제든지 요청을 취소할 수 있으며 이로 인한 불이익은 없습니다.</p>
        </div>
        <div class="modal-footer">
            <button id="requestConfirmBtn2">해줄게요~!</button>
            <button id="requestNoConfirm2">안할게요</button>
        </div>
    </div>
</div>

<!-- 조력자 요청 철회 -->
<div class="modal-overlay" id="modalOverlay3">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">이 의뢰의 조력자 요청을 철회하시겠습니까?</h2>
            <button class="close-modal" id="closeModal3">X</button>
        </div>
        <div class="modal-body">
            <p>의뢰인이 조력자 요청을 받아들이기 전까지 언제든지 요청을 취소할 수 있으며 이로 인한 불이익은 없습니다.</p>
        </div>
        <div class="modal-footer">
            <button id="requestNoConfirm3">철회할게요</button>
            <button id="requestConfirmBtn3">안할게요</button>
        </div>
    </div>
</div>

<!-- 조력자 목록 -->
<div class="modal-overlay" id="modalOverlay4">
    <div class="modal">
    <div class="modal-header">
        <c:if test="${loginMember.memberNo != requestBoard.memberNo}">
            <h2 class="modal-h2">조력자 신청 목록</h2>
        </c:if>
        <c:if test="${loginMember.memberNo == requestBoard.memberNo}">
            <h2 class="modal-h2">누구를 조력자로 선택하시겠습니까?</h2>
        </c:if>
        <button class="close-modal" id="closeModal4">X</button>
    </div>

    <!-- 캐러셀 -->
    <div class="carousel">
        <button id="prevSupporter" class="carousel-arrow">&#10094;</button>
        <div class="carousel-container">
        <div class="carousel-items" id="carouselItems">
            <c:forEach var="supporter" items="${requestSupporterArr}">
            <div class="supporter-card" 
            data-supporterno="${supporter.supporterNo}"
            data-memberno="${supporter.memberNo}"
            data-supporternickname="${supporter.supporterNickname}">
                <c:if test="${empty supporter.supporterProfile}">
                    <img src="/resources/images/Logo.WebP" alt="조력자 이미지" class="supporter-img">
                </c:if>
                <c:if test="${not empty supporter.supporterProfile}">
                    <img src="${supporter.supporterProfile}" alt="조력자 이미지" class="supporter-img">
                </c:if>
                <div class="supporter-nickname">${supporter.supporterNickname}</div>
                <div class="supporter-service">
                <c:choose>
                    <c:when test="${not empty supporter.categoryName}">
                    ${supporter.categoryName}
                    </c:when>
                    <c:otherwise><br></c:otherwise>
                </c:choose>
                </div>
                <div class="supporter-rating">${supporter.reviewRating}</div>
                <div class="supporter-detail">조력자 상세보기</div>
            </div>
            </c:forEach>
        </div>
        </div>
        <button id="nextSupporter" class="carousel-arrow">&#10095;</button>
    </div>

    <div class="modal-footer">
        <c:if test="${loginMember.memberNo == requestBoard.memberNo}">
            <button id="selectSupporter" class="select-button">선택</button>
        </c:if>
        <c:if test="${loginMember.memberNo != requestBoard.memberNo}">
            <button id="notSelectSupporter" class="select-button">확인</button>
        </c:if>
    </div>
    </div>
</div>

<!-- 조력자 선택 확인 -->
<div class="modal-overlay" id="modalOverlay5">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">이 회원을 조력자로 선택하시겠습니까?</h2>
            <button class="close-modal" id="closeModal5">X</button>
        </div>
        <div class="modal-body">
            <p>조력자 선택 시 보유 금액에서 ${requestBoard.requestPrice}원만큼 선입금됩니다.</p>
            <p>의뢰를 완료하면 조력자에게 그 금액이 지급됩니다.</p>
        </div>
        <div class="modal-footer">
            <button id="selectSupporter2">선택</button>
            <button id="cancelSupporter2">취소</button>
        </div>
    </div>
</div>

<!-- 조력자 선택 완료 -->
<div class="modal-overlay" id="modalOverlay6">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">조력자 선택이 완료되었습니다.</h2>
            <button class="close-modal" id="closeModal6">X</button>
        </div>
        <div class="modal-body">
            <p>조력자가 의뢰를 기한까지 완료하지 못하는 경우 고객센터에 먼저 신고해 주십시오.</p>
        </div>
        <div class="modal-footer">
            <button id="selectSupporter3">확인</button>
        </div>
    </div>
</div>

<!-- 조력자 요청 취소 -->
<div class="modal-overlay" id="modalOverlay7">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">조력자 요청을 취소했습니다.</h2>
            <button class="close-modal" id="closeModal7">X</button>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
            <button id="selectSupporter4">확인</button>
        </div>
    </div>
</div>

<!-- 조력자 요쳥 받아들여짐 -->
<div class="modal-overlay" id="modalOverlay8">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">조력자 요청이 받아들여졌습니다.</h2>
            <button class="close-modal" id="closeModal8">X</button>
        </div>
        <div class="modal-body">
            <p>의뢰 기한까지 의뢰를 완료하지 못하는 경우 큰 불이익을 받을 수 있습니다.</p>
            <p>현재 맡은 의뢰는 마이페이지에서 확인하실 수 있습니다.</p>
        </div>
        <div class="modal-footer">
            <button id="selectSupporter5">확인</button>
        </div>
    </div>
</div>


<!-- 동의 모달창 -->
<div class="modal-overlay" id="modalOverlay9">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">의뢰를 등록하시려는 경우 다음 주의사항에 모두 동의해주세요.</h2>
            <button class="close-modal" id="closeModal9">X</button>
        </div>
        <div class="modal-body">
            <p>주의사항 1 : 해조 운영정책 및 이용약관에 위배되는 내용 작성 시 제재를 받을 수 있습니다.</p>
            <p>주의사항 2 : 해조 운영정책 및 이용약관, 법에 저촉되는 의뢰 등록 시 처벌을 받을 수 있습니다.</p>
        </div>
        <div class="modal-agree">
            <label for="agreeCheck2">
                <input type="checkbox" name="agreeCheck2" id="agreeCheck2"> 위 주의사항에 동의합니다.
            </label>
        </div>
        <div class="modal-footer">
            <button type="submit" id="requestAddBtn">등록</button>
            <button id="requestNoAddBtn">취소</button>
        </div>
    </div>
</div>

<!-- 카테고리 모달창 -->
<div class="modal-overlay" id="modalOverlay10">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">다음 카테고리 중 하나를 선택하세요.</h2>
            <button class="close-modal" id="closeModal10">X</button>
        </div>
        <div class="modal-body">
            <div class="sideCheckBox">
                <div class="checkBoxContent">
                    <p class="categoryP">취업/직무/입시 ▽</p>
                    <label><input type="checkbox" name="category" id="interviewCon" value="6"> 면접 컨설팅</label>
                    <label><input type="checkbox" name="category" id="jobCon" value="7"> 취업 컨설팅</label>
                    <label><input type="checkbox" name="category" id="portfolioCon" value="8"> 포트폴리오 컨설팅</label>
                    <label><input type="checkbox" name="category" id="examCon" value="9"> 입시 컨설팅</label>
                </div>
                <div class="checkBoxContent">
                    <p class="categoryP">영상/사진/음향 ▽</p>
                    <label><input type="checkbox" name="category" id="videoOut" value="10"> 영상 외주</label>
                    <label><input type="checkbox" name="category" id="pictureOut" value="11"> 사진 외주</label>
                    <label><input type="checkbox" name="category" id="soundOut" value="12"> 음향 외주</label>
                </div>
                <div class="checkBoxContent">
                    <p class="categoryP">설치/수리 ▽</p>
                    <label><input type="checkbox" name="category" id="homeAppliancesSet" value="13"> 가전제품 설치</label>
                    <label><input type="checkbox" name="category" id="doorSet" value="14"> 문/창문 설치</label>
                    <label><input type="checkbox" name="category" id="boilerSet" value="15"> 수도/보일러/전기 설치</label>
                </div>
                <div class="checkBoxContent">
                    <p class="categoryP">취미/자기계발 ▽</p>
                    <label><input type="checkbox" name="category" id="instrumentLearn" value="16"> 악기</label>
                    <label><input type="checkbox" name="category" id="sportLearn" value="17"> 스포츠</label>
                    <label><input type="checkbox" name="category" id="paintingLearn" value="18"> 미술</label>
                    <label><input type="checkbox" name="category" id="etcLearn" value="19"> 그 외</label>
                </div>
                <div class="checkBoxContent">
                    <p class="categoryP">기타 ▽</p>
                    <label><input type="checkbox" name="category" id="etcRequest" value="20"> 단순의뢰</label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="categoryConfirmBtn">선택</button>
            <button id="categoryNoConfirmBtn">취소</button>
        </div>
    </div>
</div>


<!-- 의뢰 수정 동의 모달창 -->
<div class="modal-overlay" id="modalOverlay11">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">의뢰를 수정하시려는 경우 다음 주의사항에 모두 동의해주세요.</h2>
            <button class="close-modal" id="closeModal11">X</button>
        </div>
        <div class="modal-body">
            <p>주의사항 1 : 해조 운영정책 및 이용약관에 위배되는 내용 작성 시 제재를 받을 수 있습니다.</p>
            <p>주의사항 2 : 해조 운영정책 및 이용약관, 법에 저촉되는 의뢰 등록 시 처벌을 받을 수 있습니다.</p>
        </div>
        <div class="modal-agree">
            <label for="agreeCheck3">
                <input type="checkbox" name="agreeCheck3" id="agreeCheck3"> 위 주의사항에 동의합니다.
            </label>
        </div>
        <div class="modal-footer">
            <button type="submit" id="requestUpdateBtnModal">등록</button>
            <button id="requestNoUpdateBtnModal">취소</button>
        </div>
    </div>
</div>

<!-- 조력자 하나만 선택 -->
<div class="modal-overlay" id="modalOverlay12">
    <div class="modal supporter-modal">
    <div class="modal-header">
        <h2 class="modal-h2">이 의뢰의 조력자</h2>
        <button class="close-modal" id="closeModal12">X</button>
    </div>

    <div class="modal-body">
        <div class="supporter-card selected-supporter-card">

        <img src="${acceptRequestSupporter.supporterProfile}" alt="조력자 이미지" class="supporter-img">
        <div class="supporter-nickname">${acceptRequestSupporter.supporterNickname}</div>
        <div class="supporter-service">
            <c:choose>
            <c:when test="${not empty acceptRequestSupporter.categoryName}">
                ${acceptRequestSupporter.categoryName}
            </c:when>
            <c:otherwise><br></c:otherwise>
            </c:choose>
        </div>
        <div class="supporter-rating">${acceptRequestSupporter.reviewRating}</div>
        <div class="supporter-detail2">조력자 상세보기</div>
        </div>
    </div>

    <div class="modal-footer">
        <button id="oneSupporter" class="select-button">확인</button>
    </div>
    </div>
</div>

<!-- 의뢰 완료 확인창 -->
<div class="modal-overlay" id="modalOverlay13">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-h2">조력자가 의뢰를 완료했다면 아래 완료 버튼을 클릭해 주세요.</h2>
            <button class="close-modal" id="closeModal13">X</button>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
            <button id="requestCompleteConfirm">완료</button>
            <button id="requestCompleteCancel">취소</button>
        </div>
    </div>
</div>

<!-- 리뷰 작성창 -->
<div  class="modal-overlay" id="modalOverlay14">
    <div class="supporter-modal"> <!-- 이게 핵심 -->
        <div class="modal-header">
            <h2>의뢰가 성공적으로 완수되었습니다!<br>고생하신 조력자에게 따뜻한 리뷰와 별점을 남겨주세요!</h2>
            <button class="close-modal" id="closeModal14">X</button>
        </div>
        <div class="modal-body">
            <div class="requestReviewDiv">

                <!-- 조력자 카드 -->
                <div class="supporter-card selected-supporter-card">
                    <img src="${acceptRequestSupporter.supporterProfile}" alt="조력자 이미지" class="supporter-img">
                    <div class="supporter-nickname">${acceptRequestSupporter.supporterNickname}</div>
                    <div class="supporter-service">
                    <c:choose>
                        <c:when test="${not empty acceptRequestSupporter.categoryName}">
                        ${acceptRequestSupporter.categoryName}
                        </c:when>
                        <c:otherwise><br></c:otherwise>
                    </c:choose>
                    </div>
                    <div class="supporter-rating">⭐ ${acceptRequestSupporter.reviewRating}</div>
                </div>

                <!-- 리뷰 작성 영역 -->
                <div class="requestReviewWrite">
                    <div>
                    <p class="review-title">리뷰 작성창</p>
                    <textarea name="requestReviewText" id="requestReviewText" rows="5" cols="30" placeholder="리뷰를 입력해주세요."></textarea>
                    </div>
                    <p class="review-title">별점</p>
                    <div class="rating" id="rating">
                        <span class="star" data-value="1"></span>
                        <span class="star" data-value="2"></span>
                        <span class="star" data-value="3"></span>
                        <span class="star" data-value="4"></span>
                        <span class="star" data-value="5"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button id="requestReviewConfirm">리뷰 등록</button>
        </div>
        <input type="hidden" name="hiddenRating" id="hiddenRating" value="0">
    </div>
</div>

<script>
    const modalBoardNo = "${requestBoard.boardNo}";
    const acceptRequestSupMemberNo = "${acceptRequestSupporter.memberNo}";
</script>
<script src="/resources/js/kds/requestBoardModal.js"></script>
