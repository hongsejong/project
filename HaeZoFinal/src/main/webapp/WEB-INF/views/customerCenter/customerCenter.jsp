<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터 메인</title>
    <link rel="stylesheet" href="../../resources/css/hsj/customerCenter.css">
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
        <div id="top-container">

            <div>
                <div id="top-text">
                    👋 안녕하세요. 해조 고객센터입니다<br>
                    무엇을 도와드릴까요?
                    <br>
                </div>
                <div id="btn-area">
                    <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                        <a href="/inquiryWrite">
                            <button class="btn3">📩&nbsp;문의 등록하기</button>
                        </a>   
                    </c:if>
                    <a href="#">
                        <button class="btn3" onclick="startAdminChat()">💬&nbsp;실시간 상담하기</button>
                    </a>
                    <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                        <a href="/inquiryListMember">
                            <button class="btn3">📋&nbsp;내 문의내역</button>
                        </a>
                    </c:if>
                    <c:if test="${not empty loginMember and loginMember.memberDeleteFlag ne 'N'}">
                        <a href="/inquiryList">
                            <button class="btn3">📋&nbsp;전체 문의내역</button>
                        </a>
                    </c:if>
                </div>
                <div class="search-box">
                    <input type="search" placeholder="🔍검색어를 입력하세요.">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                
            </div>
            <div><img id="logo" src="../../resources/images/hsj/Logo.WebP" alt=""></div>

        </div>
 
        <div id="middle-container">
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab1">
                    <img src="../../resources/images/hsj/service.png">
                    <div>
                        서비스
                    </div>
                </div>
            </div>
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab2">
                    <img src="../../resources/images/hsj/info.png">
                    <div>
                        회원 정보
                    </div>
                </div>
            </div>
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab3">
                    <img src="../../resources/images/hsj/book.png">
                    <div>
                        이용 방법
                    </div>
                </div>
            </div>
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab4">
                    <img src="../../resources/images/hsj/card.png">
                    <div>
                        결제
                    </div>
                </div>
            </div>
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab5">
                    <img src="../../resources/images/hsj/singo.png">
                    <div>
                        취소/환불
                    </div>
                </div>
            </div>
            <div class="middle-div">
                <div class="middle-div-line tabq" id="tab6">
                    <img src="../../resources/images/hsj/service.png">
                    <div>
                        분쟁/패널티
                    </div>
                </div>
            </div>
        </div><!--middle-c 닫는 div-->
        <!-- <div id="jaju"> 없는게 나을듯
            자주 묻는 질문
        </div> -->
        <!-- <div id="bottom-container"> 의뢰인 조력자 디브
            <div id="nugu1">
                의뢰인
            </div>
            <div id="nugu2">
                조력자
            </div>
        </div> -->
        <!-- <div id="bottom-div"> 없는게 나을듯
            <div id="tab1" class="tabq">
                서비스소개
            </div>
            <div id="tab2" class="tabq">
                회원정보
            </div>
            <div id="tab3" class="tabq">
                이용 방법
            </div>
            <div id="tab4" class="tabq">
                결제
            </div>
            <div id="tab5" class="tabq">
                취소/환불
            </div>
            <div id="tab6" class="tabq">
                분쟁/패널티
            </div>
        </div> -->

        <div id="qcon">
            <div class="qdiv">
                <details>
                    <summary>[서비스 소개] 해조 서비스가 처음이신가요?</summary>
                            <pre class="s-div">안녕하세요, 해조에 오신 여러분을 환영합니다.

해조는 각 분야의 전문가가 제공하는 서비스와 상품을 편리하고 안전하게 거래할 수 있는 프리랜서 마켓입니다.

조력자가 제공하는 서비스가 카테고리별로 나누어져 있으며 원하는 '카테고리'를 선택하시면 관련된 서비스 목록만 확인하실 수 있습니다.

조력자는 판매할 의사가 있는 서비스를 크몽에 등록하거나 관련 정보를 프로필에 등록한 회원을 의미합니다.

의뢰인은 전문가의 서비스를 탐색하고 구매하는 회원을 의미합니다.</pre>
                        </details>
            </div>
            <div class="qdiv">
                <details>
                  <summary>[서비스 소개] 해조의 주요 서비스는 무엇인가요?</summary>
                  <pre class="s-div">
해조는 다양한 분야의 전문가들이 제공하는 서비스를 한 곳에서 만날 수 있는 플랫폼입니다.

주요 서비스로는 디자인, IT 개발, 마케팅, 번역 등 여러 전문 영역의 서비스가 있으며,

각 서비스는 상세 페이지에서 전문가의 경력과 고객 후기를 통해 신뢰성을 확인할 수 있습니다.
                  </pre>
                </details>
              </div>
              
              <!-- 추가 2: 해조 이용 시 혜택에 대한 질문과 답변 -->
              <div class="qdiv">
                <details>
                  <summary>[서비스 소개] 해조 이용 시 어떤 혜택이 있나요?</summary>
                  <pre class="s-div">
해조를 이용하면 검증된 전문가의 서비스를 합리적인 가격에 이용할 수 있습니다.

또한, 안전한 거래 시스템과 신뢰할 수 있는 고객 후기 시스템을 통해 최적의 서비스를 선택할 수 있으며,

빠른 고객 지원을 받아 보다 편리하게 이용하실 수 있습니다.
                  </pre>
                </details>
              </div>
              
              <!-- 추가 3: 해조에서 전문가 선택 방법에 대한 질문과 답변 -->
              <div class="qdiv">
                <details>
                  <summary>[서비스 소개] 해조에서 전문가를 어떻게 선택하나요?</summary>
                  <pre class="s-div">
해조에서는 전문가의 프로필, 경력, 그리고 실제 고객 후기를 종합적으로 확인할 수 있습니다.

또한, 상세 페이지에서 제공되는 상담 기능을 통해 직접 문의하고 비교하여,

자신의 요구사항에 가장 적합한 전문가를 선택할 수 있도록 도와드립니다.
                  </pre>
                </details>
              </div>
          




        </div>



        <div id="board-container">
            <div></div>
            <div id="notice">
                <div id="notice-text">
                    <div id="notice-board">📢공지사항</div>
                    <a href="/board/2">전체보기&gt;</a>
                </div>
               <div id="notice-in">
                <!-- 공지 한 줄 -->
                <div class="notice-row">
                  <span class="notice-icon">공지</span>
                  <a href="/board/2/${map.boardList[0].boardNo}" class="notice-title">
                    ${map.boardList[0].boardTitle}
                  </a>
                  <span class="notice-date">${map.boardList[0].boardCreateDate}</span>
                </div>
                
                <div class="notice-row">
                  <span class="notice-icon">공지</span>
                  <a href="/board/2/${map.boardList[1].boardNo}" class="notice-title">
                    ${map.boardList[1].boardTitle}
                  </a>
                  <span class="notice-date">${map.boardList[1].boardCreateDate}</span>
                </div>
              
                <div class="notice-row">
                  <span class="notice-icon">공지</span>
                  <a href="/board/2/${map.boardList[2].boardNo}" class="notice-title">
                    ${map.boardList[2].boardTitle}
                  </a>
                  <span class="notice-date">${map.boardList[2].boardCreateDate}</span>
                </div>
              
                <div class="notice-row">
                  <span class="notice-icon">공지</span>
                  <a href="/board/2/${map.boardList[3].boardNo}" class="notice-title">
                    ${map.boardList[3].boardTitle}
                  </a>
                  <span class="notice-date">${map.boardList[3].boardCreateDate}</span>
                </div>
              </div>
            </div>

            <div id="news">
                <div id="news-text">
                    <div>📰새소식</div>
                </div>

                <div id="news-in">
                    <!-- 새소식 한 줄 -->
                    <div class="news-row">
                        <c:if test="${map2.boardList[0].boardCode eq '3'}">
                            <span class="news-icon" >자유</span>
                        </c:if>
                        <c:if test="${map2.boardList[0].boardCode eq '5'}">
                            <span class="news-icon" style="color: #3B7F65  ;" >의뢰</span>
                        </c:if>

                        <!-- 제목부분 -->
                        <c:if test="${map2.boardList[0].boardCode eq '3'}">
                            <a href="/board/3/${map2.boardList[0].boardNo}" class="news-title">${map2.boardList[0].boardTitle}</a>
                        </c:if>
                        <c:if test="${map2.boardList[0].boardCode eq '5'}">
                            <a href="/requestBoard/0/${map2.boardList[0].boardNo}" class="news-title">${map2.boardList[0].boardTitle}</a>
                        </c:if>



                      <span class="news-date">${map2.boardList[0].boardCreateDate}</span>
                    </div>
                    <!-- 새소식 한 줄 -->
                    <div class="news-row">
                        <c:if test="${map2.boardList[1].boardCode eq '3'}">
                            <span class="news-icon">자유</span>
                        </c:if>
                        <c:if test="${map2.boardList[1].boardCode eq '5'}">
                            <span class="news-icon" style="color: #3B7F65  ;" >의뢰</span>
                        </c:if>

                        <!-- 제목부분 -->
                        <c:if test="${map2.boardList[1].boardCode eq '3'}">
                            <a href="/board/3/${map2.boardList[1].boardNo}" class="news-title">${map2.boardList[1].boardTitle}</a>
                        </c:if>
                        <c:if test="${map2.boardList[1].boardCode eq '5'}">
                            <a href="/requestBoard/0/${map2.boardList[1].boardNo}" class="news-title">${map2.boardList[1].boardTitle}</a>
                        </c:if>

                      <span class="news-date">${map2.boardList[1].boardCreateDate}</span>
                    </div>
                    <!-- 새소식 한 줄 -->
                    <div class="news-row">
                        <c:if test="${map2.boardList[2].boardCode eq '3'}">
                            <span class="news-icon">자유</span>
                        </c:if>
                        <c:if test="${map2.boardList[2].boardCode eq '5'}">
                            <span class="news-icon" style="color: #3B7F65  ;" >의뢰</span>
                        </c:if>

                        <!-- 제목부분 -->
                        <c:if test="${map2.boardList[2].boardCode eq '3'}">
                            <a href="/board/3/${map2.boardList[2].boardNo}" class="news-title">${map2.boardList[2].boardTitle}</a>
                        </c:if>
                        <c:if test="${map2.boardList[2].boardCode eq '5'}">
                            <a href="/requestBoard/0/${map2.boardList[2].boardNo}" class="news-title">${map2.boardList[2].boardTitle}</a>
                        </c:if>

                      <span class="news-date">${map2.boardList[2].boardCreateDate}</span>
                    </div>
                    <!-- 새소식 한 줄 -->
                    <div class="news-row">
                        <c:if test="${map2.boardList[3].boardCode eq '3'}">
                            <span class="news-icon">자유</span>
                        </c:if>
                        <c:if test="${map2.boardList[3].boardCode eq '5'}">
                            <span class="news-icon" style="color: #3B7F65  ;" >의뢰</span>
                        </c:if>

                        <!-- 제목부분 -->
                        <c:if test="${map2.boardList[3].boardCode eq '3'}">
                            <a href="/board/3/${map2.boardList[3].boardNo}" class="news-title">${map2.boardList[3].boardTitle}</a>
                        </c:if>
                        <c:if test="${map2.boardList[3].boardCode eq '5'}">
                            <a href="/requestBoard/0/${map2.boardList[3].boardNo}" class="news-title">${map2.boardList[3].boardTitle}</a>
                        </c:if>

                      <span class="news-date">${map2.boardList[3].boardCreateDate}</span>
                    </div>
                  </div>
            </div>
            <div></div>
        </div>


    </div><!--메인 닫는/div-->




 <!-- footer -->
      <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
      <script src="/resources/js/customerCenter.js"></script>
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
    <script>
        function startAdminChat() {
          const adminNo = 56; // 관리자 회원 번호
      
          fetch("/chatting/enter?targetNo=" + adminNo)
            .then(resp => resp.text())
            .then(chattingNo => {
              // 채팅방 페이지로 이동하면서 쿼리 파라미터로 chattingNo 전달
              location.href = "/chatting?ch=" + chattingNo;
            })
            .catch(err => {
              console.error("채팅방 생성 또는 조회 실패:", err);
              alert("채팅을 시작할 수 없습니다. 다시 시도해주세요.");
            });
        }
      </script>
</body>
</html>