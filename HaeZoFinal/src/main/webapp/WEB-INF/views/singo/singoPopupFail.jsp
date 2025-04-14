<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>신고 결과</title>
    <script type="text/javascript">
        alert('신고 접수에 실패했습니다 다시 시도해주세요.');
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