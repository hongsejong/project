<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원 탈퇴 성공</title>
</head>
<body>
    <script>
        alert('회원 탈퇴되었습니다.');
        if(window.opener){
            window.opener.location.reload();
        }
        // 약간의 딜레이 후 현재 팝업 창 닫기
        setTimeout(function(){
            window.close();
        }, 100);
    </script>
    
</body>
</html>
