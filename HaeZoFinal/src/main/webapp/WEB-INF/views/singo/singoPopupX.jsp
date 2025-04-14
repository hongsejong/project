<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>신고 결과</title>
    <script type="text/javascript">
        alert('게시글은 한번만 신고할수 있습니다.');
        if(window.opener) {
            window.opener.location.reload();
        }
        window.close();
    </script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
        <style>
        body {
            font-family: 'Pretendard', sans-serif;
        }
        </style>
</head>
<body>
</body>
</html>