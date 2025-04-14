<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<c:set var="member" value="${member}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>myPage-updateInfo</title>
    <link rel="stylesheet" href="/resources/css/myPage/myPage(updateInfo)-style.css">
</head>
<body>
    <section id="myPageProfile">
        <div id="myPageProfileHead">
            <div id="myPageProfileHead-top"></div>
            <div id="myPageProfileHead-bottom">
                <div id="mph-bot-left">
                    <div></div>
                </div>
                <div id="mph-bot-right">
                    <div>
                        <p><span id="myPageNick">${member.memberNickname}</span></p>
                        <div class="profileStars">
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <i class="profileStar"></i>
                            <span id="profileStarScore">${member.reviewRating}</span>
                        </div>
                    </div>
                    <div id="btnArea">
                    </div>
                </div>
            </div>
            <form action="profileImg" method="POST" name="profileImgFrm" id="profileImgFrm" enctype="multipart/form-data">
                <c:if test="${!empty member.profileImg}">
                    <img src="${member.profileImg}" id="profileImg">    
                </c:if>
                <c:if test="${empty member.profileImg}">
                    <img src="/resources/images/user.png" id="profileImg">
                </c:if>
                <div id="profileImgBtnArea" class="hidden">
                    <button  id="deleteProfileImgBtn">삭제</button>
                    <label for="inputImage">선택</label>
                    <button id="updateProfileImgBtn">변경</button>
                    <input type="file" name="profileImg" id="inputImage" accept="image/*">
                </div>
            </form>
        </div>
        <div id="myPageProfileNav">
            <div class="selfProduceArea">
                <c:if test="${empty member.memberSelfIntro}">
                    <p class="selfProduce-content">작성된 자기 소개가 없습니다.</p>
                </c:if>
                <c:if test="${!empty member.memberSelfIntro}">
                    <p class="selfProduce-content">${member.memberSelfIntro}</p>
                </c:if>
                <div><button class="updateBtn2" onclick="showUpdateIntro(this)">자기소개 작성</button></div>           
            </div>
            <ul id="navMenu">
            </ul>
        </div>
        <form action="afterUpdateInfo" method="POST" name="myPageFrm" id="updateInfo">
            <div id="updateBtnArea">
                <button id="cancelBtn" class="updateBtn" type="button" onclick="location.href=`/myPage/viewPopUp?memNo=${loginMember.memberNo}&bCode=${freeBoardCode}`">취소</button>
                <button id="infoBtn" class="updateBtn">수정</button>
            </div>
            <div id="myPageProfileMain">
                <div class="updateInfo-row">
                    <button id="changePw" type="button">비밀번호 변경</button>
                </div>
                <div class="updateInfo-row">
                    <input type="text" value="${loginMember.memberNickname}" name="memberNickname" id="memberNickname" maxlength="10" placeholder="최소 2~10글자 한글/영문(대소문자)/숫자" autocomplete="off" value="${loginMeber.memberNickname}">
                </div>
                <span id="newNickMessage">10글자 이내로 입력해주세요.</span>
                <div class="updateInfo-row">
                    <input type="text" value="${loginMember.memberTel}" name="memberTel" id="memberTel" maxlength="11" placeholder="(-) 없이 숫자만 입력" autocomplete="off" value="${loginMember.memberTel}">
                </div>
                <span id="newTelMessage">(-) 없이 숫자만 입력해주세요.</span>
                <c:set var="addr" value="${fn:split(loginMember.memberAddress, '^^^')}"/>
                <div class="updateInfo-row info-title">
                    <span>주소</span>
                </div>
                <div class="updateInfo-row info-address">
                    <input type="text" id="sample6_postcode" name="memberAddress" placeholder="우편번호" value="${addr[0]}" autocomplete="off">
                    <button type="button" onclick="sample6_execDaumPostcode()" class="updateBtn">검색</button>
                </div>
                <div class="updateInfo-row info-address">
                    <input type="text" id="sample6_address" name="memberAddress"  placeholder="도로명/지번 주소" value="${addr[1]}" autocomplete="off">                 
                </div>
                <div class="updateInfo-row info-address">
                    <input type="text" id="sample6_detailAddress" name="memberAddress"  placeholder="상세 주소" value="${addr[2]}" autocomplete="off">                
                </div>
                <div class="updateInfo-row info-address">
                    <button id="changePw" onclick="location.href='/myPage/secession'" type="button">회원 탈퇴</button>
                </div>
            </div>
        </form>
    </section>

    <!-- 비밀번호 변경 모달 -->
    <div id="changePwModal" class="modal">
        <div class="modal-content">
            <span id="modal-close">&times;</span>
            <jsp:include page="myPage-changePw.jsp"/>
        </div>
    </div>

    <!-- 다음 주소 api 추가 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }
            }).open();
        }
    </script>

    <!-- 전역변수 설정 -->
    <script>
        const reviewRating = "${member.reviewRating}";
        const myPMemNo = "${member.memberNo}";                   // 회원 번호(==로그인 회원의 회원 번호)
        const loginMemberNoInMyPage = "${loginMember.memberNo}"; // 로그인한 회원의 회원 번호
        const freeBoardCode = "${freeBoardCode}";                // 자유게시판 게시판 코드
        const requestBoardCode = "${requestBoardCode}";          // 의뢰게시판 게시판 코드
    </script>

    <c:if test="${not empty message}">
        <script>
            alert("${message}");
        </script>
    </c:if>

    <!-- js 연결 -->
    <script src="/resources/js/myPage.js"></script>
</body>
</html>