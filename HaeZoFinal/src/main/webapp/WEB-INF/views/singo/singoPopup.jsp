<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터 메인</title>
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
        <form id="singoForm" action="/insertSingo" method="post" enctype="multipart/form-data">
        
        
                <div id="singohagi">
                    신고하기
                </div>
        
          
                <div id="img-div">
                    <c:if test="${empty Wmem.profileImg}">
                            <img src="/resources/images/user.png"  id="profileImg">
                        </c:if>
                        <c:if test="${!empty Wmem.profileImg}">
                            <img src="${Wmem.profileImg}" id="profileImg">
                        </c:if>
                </div>
                <div id="user-text">
                    <div>${Wmem.memberNickname}</div>
                    <div>${Wmem.memberEmail}</div>
                </div>
        
                <div id="singodiv">
        
                    <div id="singo-div">
                        <div class="sinsintext"  >신고 제목</div>
                        
                        <input type="text" id="titleinput" name="singoTitle">
                        <div class="sinsintext">신고유형</div>
                        <select name="reportType">
                            <option value="x" id="sede" selected disabled>신고 유형을 선택해주세요.</option>
                            <option value="falseInfo">허위 정보를 기재하였습니다.</option>
                            <option value="ImageXX">부적절한 사진입니다.</option>
                            <option value="ContentXX">부적절한 내용입니다</option>
                            <option value="babo">규정을 위반하였습니다.</option>
                            <option value="other">기타</option>
                        </select>
                    </div>
                </div>
        
                <div id="singodiv-b">
                    <div>
                        <div class="sinsintext">신고 내용</div>
                        <textarea name="singoContent" id="singo-textarea"></textarea>
                    </div>
                </div>
                <input type="hidden" name="url" value="${param.url}" />
                <input type="hidden" name="url2" value="${param.url2}" />
                <input type="hidden" name="url3" value="${param.url3}" />
        
                <div id="singo-div-c">
                    <div class="sinsintext center">증빙자료 </div>
                </div>
                <div id="file-a">
                    <input type="file" name="file" id="singo-input" multiple>
                    <label for="singo-input" class="file-label"  >파일 선택</label>
                    <div id="file-name" class="file-name">선택된 파일 없음</div>
                </div>
        
                <button id="submitbtn">제출하기</button>
            </form>
        
            </div>
        
            
            <script>
                document.getElementById('singo-input').addEventListener('change', function(event) {
                    const fileNameDisplay = document.getElementById('file-name');
                    const files = event.target.files;
                    
                    if (files.length > 0) {
                        const fileNames = Array.from(files).map(file => file.name).join('<br>' );
                        fileNameDisplay.innerHTML = fileNames;
                    } else {
                        fileNameDisplay.textContent = "선택된 파일 없음";
                    }
                });
                    </script>




 <!-- footer -->
    
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
    <script src="/resources/js/singo.js"></script>
</body>
</html>