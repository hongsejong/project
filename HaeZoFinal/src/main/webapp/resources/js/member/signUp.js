console.log("signUp.js연결");

const checkObj = {
    'memberEmail2' : false,
    'memberPw2' : false,
    'memberPwConfirm2' : false,
    'memberNickname2' : false,
    'memberTel2' : false,
    'authKey' : false
}

const memberEmail3=document.getElementById("memberEmail");
const emailMessage=document.getElementById("emailMessage");

memberEmail3.addEventListener("input",function(){
    
    if(memberEmail3.value.length==0){
        emailMessage.innerText="메일을 받을 수 있는 이메일을 입력해주세요"
        emailMessage.classList.remove("confirm","error");
        checkObj.memberEmail2=false;
        return;
    }

    const regEx = /^[A-Za-z\d\-\_]{4,}@\w+(\.\w+){1,3}$/;
    if(regEx.test(memberEmail3.value)){ //유효한 경우

        fetch("/dupCheck/email?email="+ memberEmail3.value)
        .then(response => response.text()) //응답 객체 -> 파싱( parsing, 데이터 형태 변환)
        .then(count => {
            if(count ==0){
                emailMessage.innerText="사용 가능한 이메일입니다."
                emailMessage.classList.add("confirm");
                emailMessage.classList.remove("error");
                checkObj.memberEmail2=true;
            }
            else{
                emailMessage.innerText="이미 사용중인 이메일 형식입니다."
                emailMessage.classList.add("error");
                emailMessage.classList.remove("confirm")
                checkObj.memberEmail2=false;
            }
        })
        .catch(err => console.log(err)) //예외 처리

    }else{
        emailMessage.innerText="유효하지 않은 이메일 형식입니다."
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm")
        checkObj.memberEmail2=false;
    }
})

//----------------------------------------
// 이메일 인증
//----------------------------------------
// 인증번호 발송
const sendAuthKeyBtn = document.getElementById("sendAuthKeyBtn");
const authKeyMessage = document.getElementById("authKeyMessage");
let authTimer;
let authMin = 4;
let authSec = 59;

// 인증번호를 발송한 이메일 저장
let tempEmail;

sendAuthKeyBtn.addEventListener("click", function(){
    authMin = 4;
    authSec = 59;
    checkObj.authKey = false;

    if(checkObj.memberEmail2){ // 중복이 아닌 이메일인 경우
        clearInterval(authTimer); //기존 타이머 삭제

        /* fetch() API 방식 ajax */
        fetch("/sendEmail/signUp?email="+memberEmail.value)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                console.log("인증 번호가 발송되었습니다.")
                tempEmail = memberEmail.value;
            }else{
                console.log("인증번호 발송 실패")
            }
        })
        .catch(err => {
            console.log("이메일 발송 중 에러 발생");
            console.log(err);
        });

        alert("인증번호가 발송 되었습니다.");
        authKeyMessage.innerText = "05:00";
        authKeyMessage.classList.remove("confirm");
        authTimer = window.setInterval(()=>{
            authKeyMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
           
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
                checkObj.authKey = false;
                clearInterval(authTimer);
                return;
            }

            // 0초인 경우
            if(authSec == 0){
                authSec = 60;
                authMin--;
            }
            authSec--; // 1초 감소
        }, 1000)
    } else{
        alert("중복되지 않은 이메일을 작성해주세요.");
        memberEmail3.focus();
    }
});

// 인증 확인
const authKey = document.getElementById("authKey");
const checkAuthKeyBtn = document.getElementById("checkAuthKeyBtn");
checkAuthKeyBtn.addEventListener("click", function(){
    if(authMin > 0 || authSec > 0){ // 시간 제한이 지나지 않은 경우에만 인증번호 검사 진행
        /* fetch API */
        const obj = {"inputKey":authKey.value, "email":tempEmail}
        const query = new URLSearchParams(obj).toString()
        
        fetch("/sendEmail/checkAuthKey?" + query)
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                clearInterval(authTimer);
                authKeyMessage.innerText = "인증되었습니다.";
                authKeyMessage.classList.add("confirm");
                checkObj.authKey = true;


            } else{
                alert("인증번호가 일치하지 않습니다.")
                checkObj.authKey = false;
            }
        })
        .catch(err => console.log(err));

    } else{
        alert("인증 시간이 만료되었습니다. 다시 시도해주세요.")
    }
});

//비밀번호/비밀번호 확인 유효성 검사
const memberPw3=document.getElementById("memberPw");
const memberPwConfirm=document.getElementById("memberPwConfirm");
const pwMessage=document.getElementById("pwMessage");
memberPw3.addEventListener("input",function(){
    //입력된 비밀번호가 없을 경우
    if(memberPw3.value.length==0){
        pwMessage.innerText="영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요."
        pwMessage.classList.remove("confirm","error");
        checkObj.memberPw2=false;
        return;
    }
    const regEx = /^[A-Za-z0-9!@#\-\_]{6,20}$/;
    if(regEx.test(memberPw3.value)){ //입력한 비밀번호가 유효한 경우
        checkObj.memberPw2=true;

        //비밀번호가 유효하게 작성된 상태에서 비밀번호 확인이 입력되지 않았을 때
        if(memberPwConfirm.value==""){
            pwMessage.innerText="유효한 형식입니다."
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
        }else{ //비밀번호 확인이 입력되었을 때
            if(memberPw3.value==memberPwConfirm.value){
                pwMessage.innerText="비밀번호가 일치합니다."
                pwMessage.classList.add("confirm");
                pwMessage.classList.remove("error");
                checkObj.memberPwConfirm2=true;
    
            }else{    // 다른 경우
        // 비밀번호가 일치하지 않습니다. 빨간글씨
                pwMessage.innerText="비밀번호가 일치하지 않습니다."
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
                checkObj.memberPwConfirm2=false;
                
            }
        }
    }else{
        pwMessage.innerText="유효하지 않은 비밀번호 형식입니다."
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm")
        checkObj.memberPw2=false;
    }
})

//비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input",()=>{

    //비밀번호가 유효하게 작성된 경우
    if(checkObj.memberPw2){
          // 비밀번호 == 비밀번호 확인 (같을 경우)
    // 비밀번호가 일치합니다. 초록글씨
        if(memberPw3.value==memberPwConfirm.value){
            pwMessage.innerText="비밀번호가 일치합니다."
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            checkObj.memberPwConfirm2=true;

        }else{    // 다른 경우
    // 비밀번호가 일치하지 않습니다. 빨간글씨
            pwMessage.innerText="비밀번호가 일치하지 않습니다."
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.memberPwConfirm2=false;
            
        }
    }else{ //비밀번호가 유효하지 않은 경우
        checkObj.memberPwConfirm2=false;
    }
})

const memberNickname3 = document.getElementById("memberNickname");
const nickMessage = document.getElementById("nickMessage");

memberNickname3.addEventListener("input",function(){
       //닉네임 미작성시
       if(memberNickname3.value.length==0){
        nickMessage.innerText="영어/숫자/한글2~10글자 사이로 작성해주세요"
        nickMessage.classList.remove("confirm","error");
        checkObj.memberNickname2=false;
        return;
    }

    //닉네임 정규식
    const regEx=/^[a-zA-z가-힣0-9]{2,10}$/;
    if(regEx.test(memberNickname3.value)){ //사용 가능한 닉네임 일때

        fetch("/dupCheck/nickname?nickname="+ memberNickname3.value)
        .then(response => response.text())
        .then(count => {

            if(count==0){
                nickMessage.innerText="사용 가능한 닉네임 입니다."
                nickMessage.classList.add("confirm");
                nickMessage.classList.remove("error");
                checkObj.memberNickname2=true;

            }else{
                nickMessage.innerText="이미 사용중인 닉네임 입니다"
                nickMessage.classList.add("error");
                nickMessage.classList.remove("confirm");
                checkObj.memberNickname2=false;
            }
        })
    }else{
        nickMessage.innerText="유효하지 않는 닉네임 형식입니다"
        nickMessage.classList.add("error");
        nickMessage.classList.remove("confirm");
        checkObj.memberNickname2=false;
    }
})

//전화번호 유효성검사
const memberTel3 = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel3.addEventListener("input",function(){
    
    //전화번호 미작성시
    if(memberTel3.value.length==0){
        telMessage.innerText="전화번호를 입력해주세요.(- 제외)"
        telMessage.classList.remove("confirm","error");
        checkObj.memberTel2=false;
        return;
    }

    //전화번호 정규식
    const regExp=/^0(1[01]|2|[3-6][1-5]|70)\d{7,8}$/;

    //전화번호가 유효한 경우
    if(regExp.test(memberTel3.value)){
        telMessage.innerText="유효한 전화번호 형식입니다."
        telMessage.classList.add("confirm");
        telMessage.classList.remove("error");

        checkObj.memberTel2=true;
    }else{
        telMessage.innerText="유효하지 않는 전화번호 형식입니다."
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");
        checkObj.memberTel2=false;
        
    }
})

// 회원 가입 form 태그가 제출 되었을 때
document.getElementById('signUpFrm').addEventListener('submit', e => {

    const inputIdMap = {
      memberEmail2: "memberEmail",
      memberPw2: "memberPw",
      memberPwConfirm2: "memberPwConfirm",
      memberNickname2: "memberNickname",
      memberTel2: "memberTel",
      authKey: "authKey"
    };
  
    for (let key in checkObj) {
      if (!checkObj[key]) {
  
        switch (key) {
          case 'memberEmail2': alert("이메일이 유효하지 않습니다."); break;
          case 'memberPw2': alert("비밀번호가 유효하지 않습니다."); break;
          case 'memberPwConfirm2': alert("비밀번호 확인이 유효하지 않습니다."); break;
          case 'memberNickname2': alert("닉네임이 유효하지 않습니다."); break;
          case 'memberTel2': alert("전화번호가 유효하지 않습니다."); break;
          case 'authKey': alert("이메일 인증번호가 유효하지 않습니다."); break;
        }
  
        document.getElementById(inputIdMap[key]).focus();
        e.preventDefault();
        return;
      }
    }
  });






