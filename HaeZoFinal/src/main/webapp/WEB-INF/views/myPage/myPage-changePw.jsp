<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>myPage-changePw</title>
</head>
<body>
    <section id="myPageProfile">
        <div id="imgArea">
            <img src="/resources/images/Logo.WebP">
        </div>
        <div id="checkPwArea">
            <form action="changePw" method="POST" name="pwCheckFrm" id="pwCheckFrm">
                <div class="checkPw-row">
                    <input type="password" name="currentPw" id="currentPw" maxlength="30" placeholder="현재 비밀번호를 입력해주세요.">              
                </div>
                <div class="checkPw-row">
                    <input type="password" name="newPw" id="newPw" maxlength="30" placeholder="새 비밀번호를 입력해주세요.">              
                </div>
                <div class="checkPw-row">
                    <input type="password" name="checkPw" id="checkPw" maxlength="30" placeholder="새 비밀번호를 다시 한번 입력해주세요.">              
                </div>
                <div class="checkPw-row">
                    <button id="checkPwBtn">비밀번호 변경</button>
                </div>
            </form>
        </div>
    </section>
    <c:if test="${not empty message}">
        <script>
            alert("${message}");
        </script>
    </c:if>
</body>
</html>