console.log("findIdChangePw.js 연결");

// (필요한 유효성 검사 객체나 다른 코드가 있다면 추가)

$(document).ready(function(){
    
    // 1. 전화번호 조회 버튼 클릭 시
    $("#searchPhoneBtn").click(function(){
        var phone = $("#memberTel").val().trim().replace(/-/g, "");
        console.log("Ajax 전송 전화번호:", phone);
        if(phone === ""){
            alert("전화번호를 입력해주세요.");
            return;
        }
        // Ajax를 통해 전화번호로 회원 이메일(아이디) 조회
        $.get("/member/findIdChangePw/findId", { tel: phone }, function(result){
            if(result !== ""){
                $("#resultEmail").text(result);
                $("#phoneResult").slideDown();  // 조회 결과 영역 표시
                $("#emailAuthSection").slideDown(); // 이메일 인증 영역 표시
            } else {
                alert("해당 전화번호로 등록된 아이디가 없습니다.");
            }
        });
    });
    
    // 2. 인증코드 받기 버튼 클릭 시 (이메일 발송)
    $("#sendAuthCodeBtn").click(function(){
        var email = $("#resultEmail").text().trim();
        if(email === ""){
            alert("조회된 이메일이 없습니다.");
            return;
        }
        // Ajax를 통해 이메일 인증번호 발송 요청
        $.get("/member/findIdChangePw/sendEmail", { email: email }, function(result){
            if(parseInt(result) > 0){
                alert("인증번호가 발송되었습니다.");
                // 인증코드 받기 버튼은 숨기고 인증하기 버튼 보이기
                $("#sendAuthCodeBtn").hide();
                $("#verifyAuthBtn").show();
            } else {
                alert("인증번호 발송에 실패하였습니다.");
            }
        });
    });
    
    // 3. 인증하기 버튼 클릭 시
    $("#verifyAuthBtn").click(function(){
        var authCode = $("#authCode").val().trim();
        var email = $("#resultEmail").text().trim();
        if(email === ""){
            alert("조회된 이메일이 없습니다.");
            return;
        }
        if(authCode === ""){
            alert("인증번호를 입력해주세요.");
            return;
        }
        // Ajax를 통해 인증번호 검증
        $.get("/member/findIdChangePw/checkAuthKey", { email: email, inputKey: authCode }, function(result){
            if(parseInt(result) > 0){
                $("#authMessage").text("인증되었습니다.").css("color", "green");
                $("#changePwSection").slideDown(); // 새 비밀번호 변경 영역 표시
            } else {
                $("#authMessage").text("인증번호가 일치하지 않습니다.").css("color", "red");
            }
        });
    });
    
    // 4. 새 비밀번호 변경 버튼 클릭 시
    $("#changePwBtn").click(function(){
        var email = $("#resultEmail").text().trim();
        var newPw = $("#newPw").val().trim();
        var confirmPw = $("#confirmPw").val().trim();
        if(newPw === "" || confirmPw === ""){
            $("#changePwMessage").text("모든 필드를 입력해주세요.").css("color", "red");
            return;
        }
        if(newPw !== confirmPw){
            $("#changePwMessage").text("비밀번호가 일치하지 않습니다.").css("color", "red");
            return;
        }
        // Ajax를 통해 비밀번호 변경 요청
        $.post("/member/findIdChangePw/changePw", { email: email, newPw: newPw }, function(result){
            if(parseInt(result) > 0){
                $("#changePwMessage").text("비밀번호가 성공적으로 변경되었습니다.").css("color", "green");
                
                setTimeout(function(){
                    window.location.href = "/";
                }, 1000);
            } else {
                $("#changePwMessage").text("비밀번호 변경에 실패하였습니다.").css("color", "red");
            }
        });
    });
    
    $("#cancelBtn").click(function(){
        window.location.href = "/";
    });
});

// 뒤로가기 버튼 기능
$("#goBackBtn").click(function(){
    // 브라우저 이전 페이지로
    history.back();
    // 또는 메인으로 이동하려면 아래 코드 사용:
    // window.location.href = "/";
});