// "기타" 선택 시 textarea 토글
const radioButtons = document.querySelectorAll('input[name="withdrawReason"]');
const otherReasonContainer = document.getElementById('otherReasonContainer');
radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    if (document.getElementById('reason4').checked) {
      otherReasonContainer.style.display = 'block';
    } else {
      otherReasonContainer.style.display = 'none';
    }
  });
});

// 회원 탈퇴 페이지인 경우: 올바른 폼 id와 비밀번호 필드 id 사용
const secessionFrm = document.getElementById("secessionForm");  // 수정: "secessionForm" 사용
const memberPw = document.getElementById("memberPw");

if(secessionFrm != null) {
    secessionFrm.addEventListener("submit", e => {
        if(memberPw.value.trim() === ""){
            alert("현재 비밀번호를 입력하세요");
            memberPw.focus();
            e.preventDefault();
            return;
        }
        // 추가 검증: 이메일 인증번호가 입력되었는지, 라디오 버튼 선택 여부 등
        const emailAuthCode = document.querySelector('input[name="emailAuthCode"]').value;
        if(emailAuthCode.trim() === ""){
            alert("이메일 인증번호를 입력하세요");
            e.preventDefault();
            return;
        }
        const withdrawReasonSelected = document.querySelector('input[name="withdrawReason"]:checked');
        if(!withdrawReasonSelected){
            alert("탈퇴 사유를 선택하세요");
            e.preventDefault();
            return;
        }
    });
}

// 하단 "확인 버튼" 클릭 시 모달 표시
const confirmBtn = document.getElementById('confirmBtn');
const modalOverlay = document.getElementById('modalOverlay');
confirmBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
});

// 모달 내부 버튼 이벤트 처리
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalWithdrawBtn = document.getElementById('modalWithdrawBtn');
modalCancelBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});
modalWithdrawBtn.addEventListener('click', () => {
  // 탈퇴 확정 시 실제 폼 제출 (이전에 검증된 폼 제출)
  document.getElementById('secessionForm').submit();
  modalOverlay.style.display = 'none';
});

// 이메일 인증 관련 AJAX 처리
const requestAuthCodeBtn = document.getElementById('requestAuthCodeBtn');
requestAuthCodeBtn.addEventListener('click', () => {
  const email = document.querySelector('input[name="email"]').value;
  fetch(`${document.location.origin}/sendEmail/signUp?email=${encodeURIComponent(email)}`)
    .then(response => response.text())
    .then(result => {
      if (parseInt(result) > 0) {
        alert("인증번호가 발송되었습니다.");
      } else {
        alert("인증번호 발송에 실패하였습니다.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("오류가 발생했습니다.");
    });
});

const verifyAuthCodeBtn = document.getElementById('verifyAuthCodeBtn');
verifyAuthCodeBtn.addEventListener('click', () => {
  const email = document.querySelector('input[name="email"]').value;
  const inputKey = document.querySelector('input[name="emailAuthCode"]').value;
  fetch(`${document.location.origin}/sendEmail/checkAuthKey?email=${encodeURIComponent(email)}&inputKey=${encodeURIComponent(inputKey)}`)
    .then(response => response.text())
    .then(result => {
      if (parseInt(result) > 0) {
        alert("인증번호가 확인되었습니다.");
      } else {
        alert("인증번호가 일치하지 않습니다.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("오류가 발생했습니다.");
    });
});
