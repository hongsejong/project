<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="kr">
  <head>
    <meta charset="UTF-8"/>
    <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-Logo.WebP" />
    <link rel="stylesheet" type="text/css" href="/resources/css/payment-style.css" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>토스페이먼츠 샘플 프로젝트(TossPayments API 승인 실패 시)</title>
  </head>

  <body>
    <div id="info" class="box_section" style="width: 600px">
      <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" />
      <h2>결제를 실패했어요</h2>
      <div class="p-grid typography--p" style="margin-top: 50px">
        <div class="p-grid-col text--left"><b>에러메시지</b></div>
        <div class="p-grid-col text--right" id="message"></div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>에러코드</b></div>
        <div class="p-grid-col text--right" id="code"></div>
      </div>
    </div>

    <script>
      const urlParams = new URLSearchParams(window.location.search);

      const codeElement = document.getElementById("code");
      const messageElement = document.getElementById("message");

      codeElement.textContent = urlParams.get("code");
      messageElement.textContent = urlParams.get("message");
    </script>
  </body>
</html>
