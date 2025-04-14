<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신고 상세화면</title>
    <link rel="stylesheet" href="../../resources/css/hsj/singoPopup.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
    body {
        font-family: 'Pretendard', sans-serif;
    }
    </style>
</head>
<body>
    <div id="main-container">

        <div id="singohagi">
            신고내용
        </div>

        <div id="img-div">
            <c:if test="${empty member.profileImg}">
                <img src="/resources/images/user.png" id="profileImg" alt="">
            </c:if>
            <c:if test="${!empty member.profileImg}">
                <img src="${member.profileImg}" id="profileImg" alt="">
            </c:if>
            <!-- <img src="../../resources/images/user2.gif" alt="" id="profileImg"> -->
        </div>
        <div id="user-text">
            <div>${member.memberNickname}</div>
            <div>${member.memberEmail}</div>
        </div>

        <div id="singodiv">

            <div id="singo-div">

                <div class="sinsintext">신고 제목(클릭시 해당 게시물로 이동합니다.)</div>
                <div id="sintitle">
                    <c:if test="${singo.boardCode ne '5'}">
                        <td><a style="text-decoration-line: none; color: black;" href="/board/${singo.boardCode}/${singo.boardNo}">${singo.reportTitle}</a></td>
                    </c:if>
                    <c:if test="${singo.boardCode eq '5'}">
                        <td><a style="text-decoration-line: none; color: black;" href="/requestBoard/0/${singo.boardNo}">${singo.reportTitle}</a></td>
                    </c:if>
                </div>
                <div class="sinsintext">신고유형</div>
                 <c:if test="${singo.reportType eq '1'}">
                            <span>허위 정보를 기재하였습니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '2'}">
                            <span>부적절한 사진입니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '3'}">
                            <span>부적절한 내용입니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '4'}">
                            <span>규정을 위반하였습니다.</span>
                        </c:if>
                        <c:if test="${singo.reportType eq '5'}">
                            <span>기타</span>
                        </c:if>
            </div>
        </div>
 
        <div id="singodiv-b">
            <div>
                <div class="sinsintext">신고 내용</div>
                <div id="singo-textarea">　${singo.reportContent}</div>
            </div>
        </div>


        <div id="singo-div-c">
            <div class="sinsintext">첨부자료</div>
        </div>
        <div id="file-a">

            <c:set var="orderCount" value="0"/>
            <c:if test="${!empty files}">
                <c:forEach var="file" items="${files}">
                    <c:if test="${file.fileOrder==1}">
                        <c:set var="orderCount" value="${orderCount +1}"/>
                        <a href="${file.filePath}" download> ${file.fileOriginal}</a>
                        <br>
                    </c:if>

                </c:forEach>
            </c:if>






            <c:if test="${orderCount==0}">
                <div id="file-name" class="file-name">등록된 파일 없음</div>
            </c:if>
        </div>
  


    </div>

    
    <script>
document.getElementById('singo-input').addEventListener('change', function(event) {
    var fileNameDisplay = document.getElementById('file-name');
    var files = event.target.files;
    
    if (files.length > 0) {
        var fileNames = Array.from(files).map(file => file.name).join(', ');
        fileNameDisplay.textContent = fileNames;
    } else {
        fileNameDisplay.textContent = "선택된 파일 없음";
    }
});
    </script>
    <script>
        const reportNo = "${singo.reportNo}";
    </script>
 




 <!-- footer -->
    
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
    <script src="/resources/js/singoDetail.js"></script>
</body>
</html>