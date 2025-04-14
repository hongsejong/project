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
        <form id="inquiryForm" action="inquiryInsert" method="POST" enctype="multipart/form-data">
        <div>

                <div id="title">
                    <input type="text" name="inquiryTitle" id="inquiryTitle"  placeholder="제목을 입력하세요">
                </div>
                <textarea name="inquiryContent" id="inquiryContent" class="textarea"></textarea>
   
            </div>
            <div id="file-a">
                <input type="file" name="file" id="singo-input"  multiple>
                <label for="singo-input" class="file-label"  >파일 선택</label>
                <div id="file-name" class="file-name">선택된 파일 없음</div>
            </div>
            <div>
               
                <div id="btn-area">
                    <button id="listBtn" class="btn">목록</button>
          
                    <button id="delBtn" class="btn">등록</button> 
                </div>
            </div>
        </form>

    </div>
  
   



 <!-- footer -->
 <jsp:include page="/WEB-INF/views/common/footer.jsp"/>
    
    <script src="https://kit.fontawesome.com/9d18722475.js" crossorigin="anonymous"></script>
 <script src="/resources/js/inquiryWrite.js"></script>
</body>
</html>