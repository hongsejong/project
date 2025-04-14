console.log("header.js");

// 전역 Ajax 컨트롤러 변수 선언
let controller = new AbortController();

// 페이지 DOM 로딩 후 이벤트 처리
document.addEventListener('DOMContentLoaded', function() {
    
    // 페이지 이동 링크 클릭 이벤트 처리
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 이동 방지
            
            // 이전 Ajax 요청 취소
            if(controller) controller.abort();
            controller = new AbortController(); // controller를 매 클릭마다 재생성(중요)

            // 페이지 전환 약간 지연 (200~300ms)
            setTimeout(() => {
                window.location.href = link.dataset.url; // 페이지 실제 이동
            }, 250);
        });
    });
});

// 사용자가 페이지를 벗어날 때 요청 즉시 중단
window.addEventListener('beforeunload', () => {
    if(controller) controller.abort();
});




/* 상/하단 이동 */
const goTop = document.getElementById("goTop");
const goBot = document.getElementById("goBot");

if(goTop != null && goBot != null){
    goTop.addEventListener("click", ()=>{
        window.scrollTo({top:0, behavior:'smooth'});
    })
    
    goBot.addEventListener("click", ()=>{ 
        window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});
    })
}

// 마이페이지 버튼 클릭 시 팝업 띄우기
const myPageInfo = document.getElementById("myPageInfo");
if (myPageInfo != null) {
    myPageInfo.addEventListener("click", () => {
        const url = `/myPage/viewPopUp?memNo=${loginMemberNoToMyPage}&bCode=${freeBoardCode}`;
        openPopup(url, "popUp", "width=625,height=1200,top=200,left=620"); // 공통 함수 호출
    });
}

// 채팅 화면 전환
const chatBtn = document.getElementById("chatBtn");
if(chatBtn != null){
    chatBtn.addEventListener("click", ()=>{
        if(loginMemberForChatting != ""){
            const chatUrl = "/chatting";
            openPopup(chatUrl, "chatPop", "width=1300,height=910,top=50,left=300");
        } else{
            alert("로그인 후 이용해주세요");
        }
    })
}

// 문서가 모두 로딩된 후 수행
document.addEventListener("DOMContentLoaded", () => {
    // 알림
    connectSse(); // SSE 연결
    notReadCheck(); // 알림 개수 조회
    // 종 버튼(알림) 클릭 시 알림 목록 출력하기
    const notificationBtn = document.getElementById("my-element");
    notificationBtn?.addEventListener("click", ()=>{
        // 알림 목록
        const notificationList = document.querySelector(".notification-list");
        // 알림 목록이 보이고 있을 경우 -> 알림 목록 숨기기
        if(notificationList.classList.contains("notification-show")){
            notificationList.classList.remove("notification-show");
        } else{
            // 알림 목록이 안 보이는 경우 -> 화면에 목록 보이게 하기
            notificationList.classList.add("notification-show");
            // 비동기로 목록 조회
            selectNotificationList();
        }
    })

    // 쿼리스트링 중 cn(댓글 번호)가 존재하는 경우
    const params = new URLSearchParams(location.search);
    const cn = params.get("cn"); // cn 값 얻어오기
    if(cn != null){ // cn이 존재하는 경우
        const targetId = "c" + cn; // "c100" 형태로 변환
        
        setTimeout(()=>{
            // 아이디가 일치하는 요소 얻어오기
            const target = document.getElementById(targetId);
            // 댓글 요소가 제일 위에서 얼만큼 떨어져 있는지 반환 받기
            const scrollPosition = target.offsetTop;
            // 댓글 위치로 스크롤
            window.scrollTo({
                top : scrollPosition-50, // 스크롤 길이
                behavior : "smooth" // 부드럽게 행동(동작)하도록 지정
            })
        }, 300);
    }
});

// 알림 관련
const connectSse = () => {
    // 로그인이 되어있지 않은 경우 함수 종료
    if(!notificationLoginCheck) return;
    console.log("connectSse() 호출");
    // 서버의 "/sse/connect" 주소로 연결 요청
    const eventSource = new EventSource("/sse/connect");
    // -------------------------------------------------
    // 서버로부터 알림 메세지가 왔을 경우(전달 받은 경우)
    eventSource.addEventListener("message", e => {
        const obj = JSON.parse(e.data);
        try {
            if(selectChattingNo == obj.chattingRoomNo){
                fetch("/notification", {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: obj.notificationNo
                })
                .then(resp => {
                    if(!resp.ok) throw new Error("채팅 알림 삭제");
                })
                .catch(err => console.log(err));
                return;
            }
        } catch (err) {}
        // 종 버튼에 색 추가
        const notificationBtn = document.getElementById("my-element");
        notificationBtn.classList.add("fa-solid");
        notificationBtn.classList.remove("fa-regular");
        // 알림 개수 표시
        const notificationCountArea = document.querySelector(".notification-count-area");
        notificationCountArea.innerText = obj.notiCount;
        // 알림 목록이 열려 있는 경우
        // 알림 목록 비동기 조회
        const notificationList = document.querySelector(".notification-list");
        if(notificationList.classList.contains("notification-show")){
            selectNotificationList(); // 알림 목록 비동기 조회
        }
    })
    //------------------------------------------------------
    // 서버 연결이 종료된 경우(타임아웃 초과)
    eventSource.addEventListener("error", ()=>{
        console.log("SSE 재연결 시도");
        eventSource.close(); // 기존 연결 닫기
        // 5초 후 재연결 시도
        setTimeout(() => connectSse(), 5000);
    })
}

// 알림 메세지 전송 함수
const sendNotification = (type,url,pkNo,content)=>{
    if(!notificationLoginCheck) return;
    // type    : 댓글, 답글, 게시글 좋아요 등을 구분하는 값
    // url     : 알림 클릭 시 이동할 페이지 주소
    // pkNo    : 알림 받는 회원 번호 또는 회원 번호를 찾을 수 있는 pk값
    // content : 알림 내용
    // 서버로 제출할 데이터를 JS 객체 형태로 저장
    const notification = {
        "notificationType" : type,
        "notificationUrl" : url,
        "pkNo" : pkNo,
        "notificationContent" : content
    }
    fetch("/sse/send",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(notification)
    })
    .then(response => {
        if(!response.ok){ // 비동기 통신 실패 시
            throw new Error("알림 전송 실패");
        }
        console.log("알림 전송 성공");
    })
    .catch(err =>{console.log(err)});
}

// 비동기로 알림 목록을 조회하는 함수
const selectNotificationList = () => {
    if(!notificationLoginCheck) return;
    fetch("/notification")
    .then(resp => resp.json())
    .then(selectList => {
        // 이전 알림 목록 삭제
        const notiList = document.querySelector(".notification-list");
        notiList.innerHTML = "";
        for (let data of selectList) {
            // 알림 전체를 감싸는 요소
            const notiItem = document.createElement("li");
            notiItem.className = 'notification-item';
            // 알림을 읽지 않은 경우 'not-read' 추가
            if (data.notificationCheck == 'N') notiItem.classList.add("not-read");
            // 알림 관련 내용(프로필 이미지 + 시간 + 내용)
            const notiText = document.createElement("div");
            notiText.className = 'notification-text';
            // 알림 클릭 시 동작
            notiText.addEventListener("click", e => {
                // 만약 읽지 않은 알람인 경우
                if (data.notificationCheck == 'N') {
                    fetch("/notification", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: data.notificationNo
                    })
                    // 컨트롤러 메서드 반환값이 없으므로 then 작성 X
                }
                // 클릭 시 알림에 기록된 경로로 이동
                if(data.notificationUrl.includes("chatting")){
                    openPopup(data.notificationUrl, "chatPop", "width=1300,height=910,top=50,left=300");
                } else{
                    location.href = data.notificationUrl;
                }
            })
            // 알림 보낸 회원 프로필 이미지
            const senderProfile = document.createElement("img");
            if (data.sendMemberProfileImg == null) senderProfile.src = "/resources/images/user.png";  // 기본 이미지
            else senderProfile.src = data.sendMemberProfileImg; // 프로필 이미지
            // 알림 내용 영역
            const contentContainer = document.createElement("div");
            contentContainer.className = 'notification-content-container';
            // 알림 보내진 시간
            const notiDate = document.createElement("p");
            notiDate.className = 'notification-date';
            notiDate.innerText = data.notificationDate;
            // 알림 내용
            const notiContent = document.createElement("p");
            notiContent.className = 'notification-content';
            notiContent.innerHTML = data.notificationContent; // 태그가 해석 될 수 있도록 innerHTML
            // 삭제 버튼
            const notiDelete = document.createElement("span");
            notiDelete.className = 'notification-delete';
            notiDelete.innerHTML = '&times;';
            /* 삭제 버튼 클릭 시 비동기로 해당 알림 지움 */
            notiDelete.addEventListener("click", e => {
                fetch("/notification", {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: data.notificationNo
                })
                .then(resp => {
                    if (resp.ok){
                    // 클릭된 x버튼이 포함된 알림 삭제
                    notiDelete.parentElement.remove();
                    notReadCheck();
                    return;
                    }
                    throw new Error("네트워크 응답이 좋지 않습니다.");
                })
                .catch(err => console.error(err));
            })
            notiList.append(notiItem);
            notiItem.append(notiText, notiDelete);
            notiText.append(senderProfile, contentContainer);
            contentContainer.append(notiDate, notiContent);
        }
    })
    .catch(err => {console.log(err)});
}

// 읽지 않은 알림 개수 조회 및 알림 유무 표시 여부 변경
const notReadCheck = () => {
    if(!notificationLoginCheck) return;
    fetch("/notification/notReadCheck")
    .then(resp => resp.text())
    .then(count => {
        // 알림 개수 화면에 표시
        document.querySelector(".notification-count-area").innerText = count;
        const notificationBtn = document.getElementById("my-element");
        if(count > 0){ // 읽지 않은 알림이 존재한다면
            notificationBtn.classList.add("fa-solid");
            notificationBtn.classList.remove("fa-regular");
        } else { // 모든 알림을 읽은 경우
            notificationBtn.classList.remove("fa-solid");
            notificationBtn.classList.add("fa-regular");
        }
    })
    .catch(err => {console.log(err)});
}

// 잔액 조회
const amount = document.getElementById("amount");
const headerMenuToggle = document.getElementById("headerMenuToggle");
if(notificationLoginCheck){
    headerMenuToggle.addEventListener("change", ()=>{
        if(headerMenuToggle.checked){
            fetch("/remainingAmount")
            .then(resp => resp.text())
            .then(data =>{
                // 숫자로 변환 후 Intl.NumberFormat을 사용하여 포맷팅
                const formattedAmount = new Intl.NumberFormat('ko-KR').format(Number(data));
                amount.innerText = formattedAmount + "원";
            })
            .catch(e=>console.log(e));
        }
    })
}

// 헤더 검색 기능
const searchInput = document.querySelector("#search");
const searchResult = document.querySelector("#searchResult");

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim();
    console.log(keyword);
    if (keyword.length > 0) {
        fetch("/board/headerSearch?query=" + encodeURIComponent(keyword))
        .then(resp => resp.json())
        .then(list => {
            console.log(list);

            if (list.length > 0) {
                searchResult.classList.remove("close");
                searchResult.innerHTML = "";

                list.forEach(map => {
                    const li = document.createElement("li");
                    li.setAttribute("path", `${map.BOARD_CODE}/${map.BOARD_NO}`);

                    const a = document.createElement("a");
                    const regex = new RegExp(keyword, "gi");
                    const highlightedTitle = map.BOARD_TITLE.replace(regex, match => `<mark>${match}</mark>`);
                    
                    a.innerHTML = `<b>${highlightedTitle}</b> - ${map.BOARD_NAME}`;
                    a.href = "#";

                    a.addEventListener("click", e => {
                        e.preventDefault();
                        const path = e.currentTarget.parentElement.getAttribute("path");
                        location.href = "/board/" + path;
                    });

                    li.append(a);
                    searchResult.append(li);
                });
            } else {
                searchResult.classList.add("close");
                searchResult.innerHTML = "";
            }
        })
        .catch(err => console.log(err));
    } else {
        searchResult.classList.add("close");
        searchResult.innerHTML = "";
    }
});

// 포커스 벗어났을 때 자동완성 닫기
document.addEventListener("click", e => {
    const searchArea = document.querySelector(".search-area");
    if (!searchArea.contains(e.target)) {
        searchResult.classList.add("close");
    }
});

// 포인트 충전/출금 화면 모달
(()=>{
    // 포인트 충전 모달 작동
    const chargePointModal = document.getElementById("chargePointModal");
    const chargeBtn = document.getElementById("charge");
    const chargePointModalClose = document.getElementById("chargePointModal-close");
    // 충전하기 버튼 클릭 시 모달 띄우기
    chargeBtn?.addEventListener("click", function(){
        chargePointModal.classList.toggle('show'); // add
    });
    // X버튼 클릭 시 모달 닫기
    chargePointModalClose?.addEventListener("click", function(){
        chargePointModal.classList.toggle('hide'); // hide 클래스 추가
        setTimeout(function(){ // 0.45초 후 동작
            chargePointModal.classList.toggle('hide'); // hide 클래스 제거
            chargePointModal.classList.toggle('show'); // remove
            resetForm1() // 입력값 초기화
        }, 450);
    });

    // 출금신청 모달 작동
    const withdrawModal = document.getElementById("withdrawModal");
    const WithdrawBtn = document.getElementById("Withdraw");
    const withdrawModalClose = document.getElementById("withdrawModal-close");
    // 출금하기 버튼 클릭 시 모달 띄우기
    WithdrawBtn?.addEventListener("click", function(){
        fetch("/remainingAmount")
        .then(resp => resp.text())
        .then(data =>{
            const formattedAmount = Number(data);
            if(formattedAmount > 0){
                withdrawModal.classList.toggle('show'); // add
            } else{
                alert("출금할 잔액이 없습니다. 포인트를 충전해주세요.");
            }
        })
        .catch(e=>console.log(e));
    });
    // X버튼 클릭 시 모달 닫기
    withdrawModalClose?.addEventListener("click", function(){
        withdrawModal.classList.toggle('hide'); // hide 클래스 추가
        setTimeout(function(){ // 0.45초 후 동작
            withdrawModal.classList.toggle('hide'); // hide 클래스 제거
            withdrawModal.classList.toggle('show'); // remove
            resetForm2() // 입력값 초기화
        }, 450);
    });
})();

// 내역조회 클릭 시 내역조회 화면으로 이동
const selectPaymentBtn = document.getElementById("selectPayment");
if(selectPaymentBtn != null){
    selectPaymentBtn.addEventListener("click", ()=>{
        //location.href = "/selectPayment";
        location.href = "/selectPayment2";
    })
}

/******************************************************************************************/
/* 화면 설정 */
// X축 스크롤바 화면 너비에 따라 제거 및 생성
function toggleXScroll() {
    if (window.innerWidth >= 1920) { 
        document.body.style.overflowX = 'hidden'; // X축 스크롤 숨기기
    } else {
        document.body.style.overflowX = 'auto'; // X축 스크롤 자동 생성 (필요시 생성)
    }
}
// 페이지 로드 시에 한 번 실행
window.addEventListener('load', toggleXScroll);
// 창 크기 변경 시마다 실행
window.addEventListener('resize', toggleXScroll);

// 창 크기 줄인 후 x축 스크롤바 이동 시 고정값 설정된 배경이미지 같이 이동
window.addEventListener("scroll", function() {
    const mainBody = document.getElementById("mainBody");
    const scrollX = window.scrollX; // 현재 X축 스크롤 위치 가져오기
    // 배경 이미지를 스크롤 위치에 맞게 이동
    if(mainBody != null){
        const scrollX = window.scrollX; // 현재 X축 스크롤 위치 가져오기
        // 배경 이미지를 스크롤 위치에 맞게 이동
        mainBody.style.backgroundPosition = `${50 - (scrollX / window.innerWidth) * 50}% 5%`;
    }
});



   


  document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn"); // 로그인 버튼
    const closeBtn = document.getElementById("loginModal-close");

    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
    });

    const message = "${message}";
    if (message === "fail") {
      loginModal.style.display = "flex";
      alert("아이디 또는 비밀번호가 일치하지 않습니다");
    }
  });

  
  


  
// 회원가입 버튼 클릭 → 모달 열기
document.getElementById("signUpBtn")?.addEventListener("click", function () {
    const modal = document.getElementById("signUpModal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 스크롤 막기
  });
  
  // X 버튼 클릭 → 모달 닫기
  document.getElementById("signUpModal-close")?.addEventListener("click", function () {
    const modal = document.getElementById("signUpModal");
    modal.style.display = "none";
    document.body.style.overflow = ""; // 스크롤 복구
  });
  
  // 바깥 영역 클릭 시 모달 닫기
  window.addEventListener("click", function (e) {
    const modal = document.getElementById("signUpModal");
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // 스크롤 복구
    }
  });
  