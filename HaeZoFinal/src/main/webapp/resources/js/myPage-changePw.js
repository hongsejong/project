console.log("myPage-changePw.js");

// 비밀번호 확인
const pwCheckFrm = document.getElementById("pwCheckFrm");
const checkPwBtn = document.getElementById("checkPwBtn");
const currentPw = document.getElementById("currentPw");
const newPw = document.getElementById("newPw");
const checkPw = document.getElementById("checkPw");

if(pwCheckFrm != null){
    pwCheckFrm.addEventListener("submit", e=>{
        // 현재 비밀번호 미작성 시
        if(currentPw.value == ""){
            alert("현재 비밀번호를 작성해주세요.");
            e.preventDefault();
            currentPw.focus();
            currentPw.value = "";
            return;
        }
        // 새 비밀번호 작성 시
        const regEx = /^[!@#-_a-zA-Z\d]{6,20}$/;
        if(!regEx.test(newPw.value)){
            alert("비밀번호가 유효하지 않습니다.");
            e.preventDefault();
            newPw.focus();
            newPw.value = "";
            return;
        }
        // 비밀번호 != 비밀번호 확인 경우 "비밀번호가 일치하지 않습니다."
        if(newPw.value != checkPw.value){
            alert("비밀번호가 일치하지 않습니다.");
            e.preventDefault();
            checkPw.focus();
            checkPw.value = "";
            return;
        }
    })
}