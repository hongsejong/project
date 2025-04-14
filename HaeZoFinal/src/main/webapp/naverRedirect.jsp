<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>네이버 로그아웃 중...</title>
  <style>
    body {
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: 'Pretendard', sans-serif;
    }

    .loading {
      font-size: 18px;
      color: #555;
      margin-top: 20px;
    }

    .spinner {
      border: 8px solid #eee;
      border-top: 8px solid #2DB400; /* 네이버 그린 */
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <!-- 백그라운드에서 네이버 로그아웃 요청 -->
  <iframe src="https://nid.naver.com/nidlogin.logout" style="display: none;"></iframe>

  <div class="spinner"></div>
  <div class="loading">네이버 로그아웃 중입니다... 잠시만 기다려주세요.</div>

  <script>
    // 1.5초 후 리다이렉트
    setTimeout(() => {
      location.href = "${pageContext.request.contextPath}/auth/naver/login";
    }, 1500);
  </script>
</body>
</html>
