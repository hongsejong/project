<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<link rel="stylesheet" href="/resources/css/board/comment-style.css">

<section id="comment">
    <div id="inputComment">
        <img src="${empty loginMember.profileImg ? '/resources/images/user2.gif' : loginMember.profileImg}" alt="" class="profile-image">
        <div>
            <textarea name="commentContent" id="commentContent" placeholder="댓글을 입력해주세요"></textarea>
            <span>
                <button id="addComment">등록</button>
            </span>
        </div>
    </div>
</section>
<!-- 댓글 목록 -->
<div class="comment-list-area">
    <ul id="commentList">
        <c:forEach var="commentItem" items="${comment.boardList}">
            <li class="comment-row ${commentItem.parentBoardNo != 0 ? 'child-comment' : ''}" data-comment-no="${commentItem.boardNo}">

                
                <!-- 프로필 이미지 -->
                <img  alt="프로필이미지" class="profile-image" src="${not empty commentItem.profileImage ? commentItem.profileImage : '/resources/images/user2.gif'}">
                
                <!-- 댓글 내용 -->
                <div class="comment-content-wrapper">
                    <p class="comment-writer">
                        <span>${commentItem.memberNickname}</span>
                        <span class="comment-date">( ${commentItem.boardCreateDate} )</span>
                    </p>
    
                    <p class="comment-content">${commentItem.boardContent}</p>
    
                    <!-- 버튼 영역 -->
                    <div class="comment-btn-area">
                        <c:if test="${not empty loginMember}">
                            <button onclick="showInsertComment(`${commentItem.commentNo}`, this)">답글</button>
                        </c:if>

                        <c:if test="${loginMember.memberNo == commentItem.memberNo}">
                            <button onclick="showUpdateComment(`${commentItem.commentNo}`, this)">수정</button>
                            <button onclick="deleteComment(`${commentItem.commentNo}`)">삭제</button>
                        </c:if>
                    </div>
                </div>
            </li>
        </c:forEach>
    </ul>
</div>

<!-- 댓글 관련 JS 파일 연결 -->
<script src="/resources/js/board/comment.js"></script>