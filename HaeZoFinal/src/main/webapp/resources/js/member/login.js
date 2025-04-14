console.log("login.js연결");

const loginFrm = document.getElementById("loginFrm");
const memberEmail=document.getElementsByName("memberEmail")[0];
const memberPw=document.getElementsByName("memberPw")[0];

if(loginFrm!=null){
    //로그인 시도를 할 때
    loginFrm.addEventListener("submit", e=>{

        //이메일이 입력되지 않은 경우
        if(memberEmail.value.trim().length ==0){
            //이메일을 입력해주세요 알림창
            alert("이메일을 입력해주세요")
            //제출 못하게 막기
            e.preventDefault();
            //이메일 input 태그에 초점 맞추기
            memberEmail.focus();
            //잘못 입력된 값 제거
            memberEmail.value="";
            return;
            
        }

        //비밀번호 입력되지 않은 경우
        if(memberPw.value.trim().length ==0){
            //비밀번호를 입력해주세요 알림창
            alert("비밀번호를 입력해주세요")
            //제출 못하게 막기
            e.preventDefault();
            //이메일 input 태그에 초점 맞추기
            memberPw.focus();
            //잘못 입력된 값 제거
            memberPw.value="";
            
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.getElementById("loginModal-close");
  
    // 모달 열기
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
      });
    }
  
    // 모달 닫기
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
      });
    }
  
    // 외부 클릭 시 닫기
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
    });
  });
  