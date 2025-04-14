<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터 메인</title>
    <link rel="stylesheet" href="../../resources/css/hsj/inquiryDetail.css">
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
        <div>
            <div id="title">
                ${board.boardTitle}
            </div>
            <textarea name="" id="detailContent" class="textarea" disabled>  ${board.boardContent}</textarea>
            <h3>첨부파일 </h3>
            <c:set var="orderCount" value="0" />
            <c:if test="${not empty files}">
                <c:forEach var="file" items="${files}">
                    <c:if test="${file.fileOrder ==0}">
                        <c:set var="orderCount" value="${orderCount +1}"/>
                        <a href="${file.filePath}" download>${file.fileOriginal}</a> 
                        <br>
                    </c:if>
                </c:forEach>

            </c:if>
            <c:if test="${orderCount==0}">
                <div>첨부 파일이 없습니다.</div>
            </c:if>

        </div>
        <div>
           
            <div id="answer">
                관리자 답변내용
            </div>
            <div>
                <c:if test="${loginMember.memberDeleteFlag eq 'H' && empty CommentContent}">
                    <textarea name="" id="detailAnswer" class="textarea dtan" placeholder="   아직 답변이 등록되지 않았습니다"></textarea>
                </c:if>
                
                <c:if test="${loginMember.memberDeleteFlag eq 'H' && !empty CommentContent}">
                    <textarea name="" id="detailAnswer2" class="textarea dtan" placeholder="   아직 답변이 등록되지 않았습니다" disabled>   ${CommentContent}</textarea>
                </c:if>
                
                <c:if test="${loginMember.memberDeleteFlag eq 'N' && empty CommentContent}">
                    <textarea name="" id="detailAnswer4" class="textarea dtan" placeholder="   아직 답변이 등록되지 않았습니다" disabled></textarea>
                </c:if>
                
                <c:if test="${loginMember.memberDeleteFlag eq 'N' && !empty CommentContent}">
                    <textarea name="" id="detailAnswer3" class="textarea dtan" placeholder="   아직 답변이 등록되지 않았습니다" disabled>   ${CommentContent}</textarea>
                </c:if>
                
            </div>
            <div id="btn-area">
                <c:if test="${loginMember.memberDeleteFlag eq 'N'}">
                    <button id="listBtn" class="btn">목록으로</button>
                </c:if>
                <c:if test="${loginMember.memberDeleteFlag eq 'H'}">
                    <a href="/inquiryList">
                        <button id="" class="btn">목록으로</button>
                    </a>
                </c:if>
                <!-- 관리자일경우 답변등록버튼 -->
                <c:if test="${loginMember.memberDeleteFlag ne 'N' && empty CommentContent}">
                    <button id="answerBtn" class="btn">답변등록</button> 
                </c:if>
                <c:if test="${loginMember.memberDeleteFlag ne 'H'}">
                    <button id="delBtn" class="btn" >삭제</button> 
                </c:if>
            </div>
        </div>

    </div>
  
   



 <!-- footer -->
 <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

 <script>
    //전역변수 등록
    const loginMemberNo = "${loginMember.memberNo}";
            // 로그인한 회원의 닉네임
    const memberNickname = '${loginMember.memberNickname}';

    //게시글 제목
    const boardTitle="${board.boardTitle}";

    const boardNo = "${board.boardNo}";
 </script>
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
    <script src="/resources/js/inquiryDetail.js"></script>
    <script src="/resources/js/singo.js"></script>
</body>
</html>