console.log("popUp.js");
// 메인 페이지 팝업 & 마이 페이지 팝업 중복으로 열리지 않게 설정하는 전역 js

// 열린 팝업을 추적하는 전역 변수
if (!window.openedPopup) {
    window.openedPopup = null;
}

// 팝업창을 여는 공통 함수
function openPopup(url, popUpName, options) {
    // 기존 열린 팝업 닫기
    if (window.openedPopup && !window.openedPopup.closed) {
        window.openedPopup.close();
    }
    // 팝업 정보를 세션에 저장
    fetch(`/popup/open?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // "팝업창 정보 session에 저장 완료"
    })
    .catch(error => console.error('popupOpenError:', error));
    // localStorage에 팝업 정보 저장
    localStorage.setItem("openedPopup", url);
    // 새로운 팝업 열기
    let popup = window.open(url, popUpName, options);
    // 팝업 창 크기 조절 막기
    if (popup) {
        const popUrl = localStorage.getItem("openedPopup");
        // 팝업이 로드된 후 크기 조정 (setInterval 사용)
        let checkPopup = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
                return;
            }
            if (popUrl.includes("/chatting")) {
                popup.resizeTo(1300, 910);
            } else if(popUrl.includes("/checkout")){
                popup.resizeTo(700, 715);
            } else{
                popup.resizeTo(640, 1200);
            }

        }, 500); // 0.5초마다 크기 확인 후 조정
    }
    // 열린 팝업 저장
    window.openedPopup = popup;
}

// 로그아웃 시 팝업 닫기 함수
function closePopupOnLogout() {
    // 기존에 열려 있는 팝업 확인 후 닫기
    if (window.openedPopup && !window.openedPopup.closed) {
        window.openedPopup.close();
        // localStorage에서 팝업 정보 삭제
        localStorage.removeItem("openedPopup");
    }
   // 세션에서 팝업 정보 삭제
    fetch(`/popup/close`)
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // "팝업창 정보 session에서 제거 완료"
    })
    .catch(error => console.log('popupCloseError:', error));

    // 다른 창에서도 팝업을 닫을 수 있도록 이벤트 전송
    localStorage.setItem("logoutEvent", Date.now());
}

// 로그아웃 버튼 클릭 시 팝업 닫기 + 로그아웃 처리
const logOut = document.getElementById("logout");
if (logOut != null) {
    logOut.addEventListener("click", function () {
        closePopupOnLogout(); // 팝업 닫기
        location.href = "/member/logout"; // 로그아웃 요청
    });
}

// 페이지 로드 시 `localStorage`에서 로그아웃 이벤트 확인
window.onload = function () {
    if (localStorage.getItem("logoutEvent")) {
        // localStorage에서 이전에 열린 팝업 URL 가져오기
        const popupUrl = localStorage.getItem("openedPopup");
        // 열린 팝업이 존재하면 닫기
        if (popupUrl) {
            // 열린 팝업이 없으면 새로 할당
            if (!window.openedPopup || window.openedPopup.closed) {
                if(popupUrl != "/chatting"){
                    window.openedPopup = window.open(popupUrl, "popUp", "width=625,height=1200,top=200,left=620");
                } else{
                    window.openedPopup = window.open(popupUrl, "chat", "width=1300,height=1200,top=200,left=620");
                }
                window.openedPopup.close();
            }
            // localStorage에서 팝업 정보 삭제
            localStorage.removeItem("openedPopup");
        }
        // localStorage에서 로그아웃 이벤트 삭제
        localStorage.removeItem("logoutEvent");
    }
};

// 메인 페이지가 종료될 때 팝업도 닫기
// 메인 페이지가 로드되면 새로고침 시 남은 종료 기록을 제거
window.addEventListener("load", () => {
    if (localStorage.getItem("mainClosedTimestamp")) {
        localStorage.removeItem("mainClosedTimestamp");
    }
});

// beforeunload 이벤트에서 localStorage 저장
window.addEventListener("beforeunload", () => {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0 && navEntries[0].type !== "back_forward") {
        console.log("beforeunload 실행됨");
        localStorage.setItem("mainClosedTimestamp", Date.now().toString());
    }
});

// unload 이벤트에서도 localStorage 저장 (브라우저 종료 시 보장)
window.addEventListener("unload", () => {
    console.log("unload 실행됨");
    localStorage.setItem("mainClosedTimestamp", Date.now().toString());
});