<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chatting</title>
    <link rel="stylesheet" href="/resources/css/chatting.css">
</head>
<body>
    <!-- 로고 영역 -->
    <div class="logo-area">
        <img src="/resources/images/Logo.WebP" alt="로고" class="logo">
    </div>

    <main id="chatContainer">
        <!-- 채팅창 닫기 버튼 -->
        <!-- <button class="close-chat" onclick="document.getElementById('chatContainer').classList.add('hide');">&times;</button> -->

        <!-- 추가 버튼 -->
        <button id="addTarget">추가</button>
        <label for="changeTheme">테마변경</label>
        <input id="changeTheme" type="checkbox"/>

        <!-- 팝업 레이어 -->
        <div id="addTargetPopupLayer" class="popup-layer-close">  
            <span id="closeBtn">&times</span>
            <div class="target-input-area">
                <input type="search" id="targetInput" placeholder="닉네임 또는 이메일을 입력하세요" autocomplete="off">
            </div>
            <ul id="resultArea"></ul>
        </div>

        <!-- 채팅 영역 -->
        <div class="chatting-area">
            <!-- 채팅방 목록 -->
            <ul class="chatting-list">
                <c:forEach var="chattingRoom" items="${chattingRoomList}">
                    <li class="chatting-item" chat-no="${chattingRoom.chattingNo}" target-no="${chattingRoom.targetNo}">
                        <div class="item-header">
                            <c:choose>
                                <c:when test="${!empty chattingRoom.targetProfile}">
                                    <img class="list-profile" src="${chattingRoom.targetProfile}">
                                </c:when>
                                <c:otherwise>
                                    <img class="list-profile" src="/resources/images/user.png">
                                </c:otherwise>
                            </c:choose>
                        </div>
                        <div class="item-body">
                            <p>
                                <span class="target-name">${chattingRoom.targetNickName}</span>
                                <span class="recent-send-time">${chattingRoom.sendTime}</span>
                            </p>
                            <div>
                                <p class="recent-message">${chattingRoom.lastMessage}</p>
                                <c:if test="${chattingRoom.notReadCount != 0}">
                                    <p class="not-read-count">${chattingRoom.notReadCount}</p>
                                </c:if>
                            </div>
                        </div>
                    </li>
                </c:forEach>
            </ul>

            <!-- 실제 채팅창 -->
            <div class="chatting-content">
                <!-- 대화 상대 표시 (DB에서 받아올 예정) -->
                <div class="chatting-header">
                </div>
                <!-- 채팅 내용 표시(js 파일 ajax로 구현) -->
                <ul class="display-chatting">
                </ul>
                <!-- 채팅 내용 입력칸 -->
                <div class="input-area">
                    <textarea id="inputChatting" rows="3" placeholder="메시지를 입력하세요..."></textarea>
                    <button id="send">보내기</button>
                </div>
            </div>
        </div>
    </main>

    <!-- SockJS 이용한 WebSocket 구현을 위해 라이브러리 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    <!-- 전역 변수 -->
    <script>
        const loginMemberNoInChatting = "${loginMember.memberNo}"; // 로그인한 회원 번호
        const loginMemberNickInChatting = "${loginMember.memberNickname}"; // 로그인한 회원 닉네임
    </script>
    <!-- 알림 관련 전역 변수 -->
    <script>
        // 현재 접속한 클라이언트가 로그인한 상태인지 확인하는 변수
        const notificationLoginCheck = "${loginMember}" ? true : false;
    </script>
    
    <!-- js 연결 -->
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
</body>
</html>
