<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터 메인</title>
    <link rel="stylesheet" href="../../resources/css/hsj/customerDetail.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
</head>
<body>
    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
${loginMember}
    <div id="topcon">
        <div id="top">
            <div>
                <a href="">크몽 고객센터</a>&gt;
                <a href="">자주묻는 질문</a>&gt;서비스 소개
            </div>
            <c:if test="${!empty loginMember}">

    
            <div id="btn-area">
                <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                    <a href="/inquiryWrite">
                        <button class="btn3">문의 등록</button>
                    </a>   
                </c:if>
                <a href="#">
                    <button class="btn3">1:1문의하기</button>
                </a>
                <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                    <a href="/inquiryListMember">
                        <button class="btn3">내 문의내역</button>
                    </a>
                </c:if>
                <c:if test="${loginMember.memberDeleteFlag ne 'N'}">
                    <a href="/inquiryList">
                        <button class="btn3">전체 문의내역</button>
                    </a>
                </c:if>
            </div>
        </c:if>
        </div>
    </div><!-- topcon 끝-->

    <div id="midcon">
        <div id="mid-left">
            <div id="mid-left-content">
                <pre>
                    [서비스 소개] 크몽 이용가이드: 의뢰인 편
안녕하세요, 크몽에 오신 여러분을 환영합니다.

크몽은 각 분야의 전문가가 제공하는 서비스와 상품을 편리하고 안전하게 거래할 수 있는 프리랜서 마켓입니다.
전문가가 제공하는 서비스/상품의 카테고리는 총 18가지이며, 원하는 '카테고리'를 선택하시면 관련된 서비스 목록만 확인하실 수 있습니다.

 
여기서 잠깐!

 전문가는 판매할 의사가 있는 서비스를 크몽에 등록하거나 관련 정보를 프로필에 등록한 회원을 의미합니다.

 의뢰인은 전문가의 서비스를 탐색하고 구매하는 회원을 의미합니다.

자, 그럼 이제 본격적으로 크몽 서비스를 손쉽게 이용하실 수 있는 방법을 알려드립니다.

                </pre>

            </div>
        </div>
        <div id="mid-right">
            <div class="search-box">
                <input type="search" placeholder="궁금한 점을 검색해보세요.">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div>
                이 카테고리의 문서
            </div>
            <div id="a-area">
                <div>
                    <a href="">[서비스 소개] 쉽고, 편하고, 안전한 크몽 이용 방법</a>
                </div>
                <div>
                    <a href="">[서비스 소개] 크몽 이용가이드: 의뢰인 편</a>
                </div>
                <div>
                    <a href="">[서비스 소개] 크몽 이용가이드: 회원가입 편</a>
                </div>
                <div>
                    <a href="">[서비스 소개] 크몽 이용가이드: 서비스 구매 편</a>
                </div>
                <div>
                    <a href="">[서비스 소개] Prime 서비스란 무엇인가요?</a>
                </div>
                <div>
                    <a href="">[서비스 소개] 에스크로 결제방식은 무엇인가요?</a>
                </div>
                <div>
                    <a href="">[서비스 소개] 제휴 문의는 어떻게 접수하나요?</a>
                </div>
            </div>
        </div>

    </div>
  



 <!-- footer -->
 <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
</body>
</html>