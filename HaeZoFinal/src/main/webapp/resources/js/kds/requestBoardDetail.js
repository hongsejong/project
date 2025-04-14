console.log("requestBoardDetail.js");


const requestNoConfirm = document.getElementById('requestNoConfirm');
const requestConfirmBtn = document.getElementById('requestConfirmBtn');
const requestNoConfirm2 = document.getElementById('requestNoConfirm2');
const requestConfirmBtn2 = document.getElementById('requestConfirmBtn2');
const requestBoardSupporter = document.querySelector(".requestBoardSupporter");
const selectSupporter = document.getElementById("selectSupporter");
const selectSupporter2 = document.getElementById("selectSupporter2");
const selectSupporter3 = document.getElementById("selectSupporter3");
const cancelSupporter2 = document.getElementById("cancelSupporter2");
const agreeCheck = document.getElementById("agreeCheck");

const requestBtn = document.getElementById("requestBtn");
const withdrawRequestBtn = document.getElementById("withdrawRequestBtn");

// 조력자 신청 및 철회
if (requestBtn!=null ) {

    requestBtn.addEventListener("click", e => {
        if (loginMember != ""){
            modalOverlay.style.display = 'flex';
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
                document.querySelector('.modal').style.transform = 'translateY(0)';
            }, 10);
        } else {
            alert("로그인이 필요합니다.")
        }
    });
} 

if (withdrawRequestBtn!=null ) {

    withdrawRequestBtn.addEventListener("click", e => {
        modalOverlay3.style.display = 'flex';
        setTimeout(() => {
            modalOverlay3.style.opacity = '1';
            document.querySelector('.modal').style.transform = 'translateY(0)';
        }, 10);
    });
} 


// 조력자 상세보기
const requestBoardProfile = document.querySelector(".requestBoardProfile");
const requestBoardNickname = document.querySelector(".requestBoardNickname");
if (requestBoardProfile != null ){

    requestBoardProfile.addEventListener("click", e=>{
    
        const url = `/myPage/viewPopUp?memNo=${requestBoardMemberNo}&bCode=3`;
        openPopup(url, "popUp", "width=640,height=1200,top=200,left=620"); // 공통 함수 호출
    
    });
};

if (requestBoardNickname != null ){

    requestBoardNickname.addEventListener("click", e=>{
    
        const url = `/myPage/viewPopUp?memNo=${requestBoardMemberNo}&bCode=3`;
        openPopup(url, "popUp", "width=640,height=1200,top=200,left=620"); // 공통 함수 호출
    
    });
};


// 모달창 

function closeModalAction() {
    modalOverlay.style.opacity = '0';
    document.getElementById('modalOverlay').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay.style.display = 'none';
    }, 300); 
}

function closeModalAction2() {
    modalOverlay2.style.opacity = '0';
    document.getElementById('modalOverlay2').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay2.style.display = 'none';
    }, 300); 
}

function closeModalAction3() {
    modalOverlay2.style.opacity = '0';
    document.getElementById('modalOverlay3').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay3.style.display = 'none';
    }, 300); 
}

function closeModalAction4() {
    setTimeout(() => {
        modalOverlay4.style.display = 'none';
    }, 100); 
}

function closeModalAction5() {
    setTimeout(() => {
        modalOverlay5.style.display = 'none';
    }, 100); 
}

function closeModalAction6() {
    setTimeout(() => {
        modalOverlay6.style.display = 'none';
    }, 100); 
    location.href = location.href;
}

closeModal.addEventListener('click', closeModalAction);
closeModal2.addEventListener('click', closeModalAction2);
closeModal3.addEventListener('click', closeModalAction3);
closeModal4.addEventListener('click', closeModalAction4);
closeModal5.addEventListener('click', closeModalAction5);
closeModal6.addEventListener('click', closeModalAction6);
requestNoConfirm.addEventListener('click', closeModalAction);
cancelSupporter2.addEventListener('click', closeModalAction5);
selectSupporter3.addEventListener('click', closeModalAction6);

const notSelectSupporter = document.getElementById("notSelectSupporter");
if (notSelectSupporter != null) {
    notSelectSupporter.addEventListener('click', closeModalAction4);
}

// 조력자 신청 완료
requestConfirmBtn.addEventListener('click', () => {

    if (!agreeCheck.checked){
        alert("먼저 주의사항에 동의해주세요.");
        return
    };
    closeModalAction();
    modalOverlay2.style.display = 'flex';
    setTimeout(() => {
        modalOverlay2.style.opacity = '1';
        document.getElementById('modalOverlay2').style.transform = 'translateY(0)';
    }, 10);
});

requestNoConfirm2.addEventListener('click', closeModalAction2);
requestConfirmBtn2.addEventListener('click', () => {

    // 조력자 비동기 등록
    fetch("/requestBoard/addSupporter", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ boardNo: boardNo })
    })
    .then(resp => resp.text())
    .then(result => {
        console.log(result);
        if (result > 0) {
            alert('조력자 신청이 완료되었습니다!');
            location.href = location.href;
        } else {
            alert("조력자 등록에 실패했습니다.")
        }
    })
    .catch(e=>console.log(e));

    closeModalAction2();
});

// 조력자 목록 조회
if (requestBoardSupporter != null){
    requestBoardSupporter.addEventListener("click", e=>{
        if (requestSupporters.length != 0) {
            console.log(requestSupporters);
            console.log(requestSupporters.length);
            
            modalOverlay4.style.display = 'flex';
            setTimeout(() => {
                modalOverlay4.style.opacity = '1';
                document.getElementById('modalOverlay4').style.transform = 'translateY(0)';
            }, 10);
        } else {
            alert("조력자가 없습니다.")
        }
    });

    
}

// 최종 선택한 조력자 조회
document.addEventListener("DOMContentLoaded", () => {

    const selectedOneSupporter = document.getElementById("selectedOneSupporter");
    const modalOverlay12 = document.getElementById("modalOverlay12");
    if (selectedOneSupporter != null){
        selectedOneSupporter.addEventListener("click", e=>{
            console.log("클릭 이벤트");
            
            modalOverlay12.style.display = 'flex';
            setTimeout(() => {
                modalOverlay12.style.opacity = '1';
                document.getElementById('modalOverlay12').style.transform = 'translateY(0)';
            }, 10);
        })
    }
    
    const oneSupporter = document.getElementById("oneSupporter");
    oneSupporter.addEventListener("click", function() {
        setTimeout(() => {
            modalOverlay12.style.display = 'none';
        }, 100); 
    });

});

document.getElementById("closeModal12").addEventListener("click", ()=>{
    const modalOverlay12 = document.getElementById("modalOverlay12");
    setTimeout(() => {
        modalOverlay12.style.display = 'none';
    }, 100); 
});


// 조력자 선택창
const carouselItems = document.getElementById('carouselItems');
const supporterCards = document.querySelectorAll('.supporter-card');
const prevBtn = document.getElementById('prevSupporter');
const nextBtn = document.getElementById('nextSupporter');
const carouselContainer = document.querySelector('.carousel-container');

let itemsPerPage = 3;
const gap = 10;
let currentIndex = 0;
let cardWidth = 150; // 초기값

let chooseSupporterNo = null;
let chooseMemberNo = null;
let chooseSupporterNickname = null;

function applyCardLayout() {
    supporterCards.forEach(card => {
    card.style.width = `${cardWidth}px`;
    card.style.flex = `0 0 ${cardWidth}px`;
    });

    const totalWidth = supporterCards.length * (cardWidth + gap);
    carouselItems.style.width = `${totalWidth}px`;
}


function moveCarousel() {
    const offset = currentIndex * (cardWidth + gap);
    carouselItems.style.transform = `translateX(-${offset}px)`;
    updateNavButtons();
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
    currentIndex--;
    moveCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = supporterCards.length - itemsPerPage;
    if (currentIndex < maxIndex) {
    currentIndex++;
    moveCarousel();
    }
});


supporterCards.forEach(card => {
    card.addEventListener('click', () => {
        const no = card.dataset.supporterno;
        const memNo = card.dataset.memberno;
        const supNick = card.dataset.supporternickname;
    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        chooseSupporterNo = null;
        chooseMemberNo = null;
        chooseSupporterNickname = null;
    } else {
        supporterCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        chooseSupporterNo = no;
        chooseMemberNo = memNo;
        chooseSupporterNickname = supNick;
    }
    });
});

window.addEventListener('load', initCarousel);
window.addEventListener('resize', initCarousel);

function updateNavButtons() {
    const maxIndex = supporterCards.length - itemsPerPage;
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);

}


// 조력자 모달 열기
function openSupporterModal() {
    const modalOverlay = document.getElementById('modalOverlay4');
    modalOverlay.style.display = 'flex';

    // DOM이 보인 뒤에 레이아웃 다시 잡기 (딜레이 필수!)
    setTimeout(() => {
    initCarousel(); // 여기서 applyCardLayout 포함됨
    }, 50); // 0ms ~ 50ms 정도로도 충분
}

function initCarousel() {
    applyCardLayout();
    moveCarousel();
    updateNavButtons();
}


//   조력자 선택
if (selectSupporter != null) {
    selectSupporter.addEventListener("click", e=>{
    
        if (chooseSupporterNo == null) {
            alert("조력자를 선택해 주세요.");
            return;
        }
    
        modalOverlay5.style.display = 'flex';
        setTimeout(() => {
            modalOverlay5.style.opacity = '1';
            document.getElementById('modalOverlay5').style.transform = 'translateY(0)';
        }, 10);
    })

}

// 잔액 조회
let requesterRemain = 0;
if (loginMember!=null) {

    function checkPriceAndRemain(){
    
        fetch("/remainingAmount")
        .then(resp => resp.text())
        .then(data =>{
            console.log("불러온 잔액 : " + data);
    
            requesterRemain = data;
            console.log("현재 잔액 : "+requesterRemain)
            console.log("의뢰 가격 : "+requestPrice)
        })
        .catch(e=>console.log(e));
    }
    checkPriceAndRemain();
};

selectSupporter2.addEventListener("click", async e => {
    try {
        const remainResp = await fetch("/remainingAmount");
        const requesterRemain = await remainResp.text();

        console.log("불러온 잔액 : " + requesterRemain);
        console.log("의뢰 가격 : " + requestPrice);

        if (parseInt(requesterRemain) < parseInt(requestPrice)) {
            alert("잔액이 부족합니다.");
            closeModalAction5();
            closeModalAction4();
            return; // 여기서 아래 POST 요청 안 가게 막음
        }

        const payResp = await fetch("/requestBoard/chooseSupporterAndPay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                boardNo: boardNo,
                chooseSupporterNo: chooseSupporterNo,
                requestBoardMemberNo: requestBoardMemberNo,
                chooseMemberNo: chooseMemberNo,
                requestPrice: requestPrice,
                requestBoardMemberNickname: requestBoardMemberNickname,
                chooseSupporterNickname: chooseSupporterNickname
            })
        });

        const result = await payResp.text();

        if (parseInt(result) > 0) {
            closeModalAction5();
            modalOverlay6.style.display = 'flex';
            setTimeout(() => {
                modalOverlay6.style.opacity = '1';
                document.getElementById('modalOverlay6').style.transform = 'translateY(0)';
            }, 10);

            const content = `<strong>${boardTitle}</strong> 의뢰의 조력자로 선택되었습니다!`;
            sendSupporterNotification("chooseSupporterNoti", `/requestBoard/${categoryId}/${boardNo}`, chooseMemberNo, content);
        } else {
            alert("조력자 선택 및 의뢰비 지급에 실패했습니다.");
            closeModalAction5();
        }

    } catch (err) {
        console.error("에러 발생:", err);
        alert("요청 중 오류가 발생했습니다.");
    }
});




// 조력자 신청 철회
const requestNoConfirm3 = document.getElementById("requestNoConfirm3");
const requestConfirmBtn3 = document.getElementById("requestConfirmBtn3");
requestConfirmBtn3.addEventListener("click", closeModalAction3);
requestNoConfirm3.addEventListener("click", ()=>{

    fetch("/requestBoard/withdraw", {
        method : "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ "chooseSupporterNo" :  loginMemberSupporterNo})
    })
    .then(resp=>resp.text())
    .then(result=>{
        if (result != 0) {
            alert("조력자 신청을 철회했습니다.");
            location.href = location.href;
        } else {
            alert("조력자 신청 철회에 실패했습니다.")
        }
    })
    .catch(e=>console.log(e))
    closeModalAction3();
});


// 의뢰 완료
const requestCompleteBtn = document.getElementById("requestCompleteBtn");
const modalOverlay13 = document.getElementById("modalOverlay13");
const closeModal13 = document.getElementById("closeModal13");
const requestCompleteConfirm = document.getElementById("requestCompleteConfirm");
const requestCompleteCancel = document.getElementById("requestCompleteCancel");
const requestReviewBtn = document.getElementById("requestReviewBtn");

if(requestCompleteBtn != null) {
    requestCompleteBtn.addEventListener("click", ()=>{
        modalOverlay13.style.display = 'flex';
        setTimeout(() => {
        modalOverlay13.style.opacity = '1';
        document.getElementById('modalOverlay13').style.transform = 'translateY(0)';
    }, 10);
    });
};

if(requestReviewBtn != null) {
    requestReviewBtn.addEventListener("click", ()=>{
        modalOverlay14.style.display = 'flex';
        setTimeout(() => {
        modalOverlay14.style.opacity = '1';
        document.getElementById('modalOverlay14').style.transform = 'translateY(0)';
    }, 10);
    });
};

requestCompleteCancel.addEventListener("click", closeModalAction13);

const modalOverlay14 = document.getElementById("modalOverlay14");
const closeModal14 = document.getElementById("closeModal14");
closeModal13.addEventListener("click", closeModalAction13);

if (closeModal14 != null ){
    closeModal14.addEventListener("click", closeModalAction14);
}


requestCompleteConfirm.addEventListener("click", ()=>{

    fetch("/requestBoard/completeAndReceive", {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
            boardNo : boardNo,
            "chooseSupporterNo" :  acceptRequestSupporterSupporterNo,
                requestBoardMemberNo: requestBoardMemberNo,
                chooseMemberNo: acceptRequestSupporterMemberNo,
                requestPrice: requestPrice,
                requestBoardMemberNickname: requestBoardMemberNickname,
                chooseSupporterNickname: acceptRequestSupporterNickname
        })
    })
    .then(resp=>resp.text())
    .then(result=>{
        if (result != 0) {
            modalOverlay14.style.display = 'flex';
                setTimeout(() => {
                    modalOverlay14.style.opacity = '1';
                document.getElementById('modalOverlay14').style.transform = 'translateY(0)';
            }, 10);
            const content = `<strong>${boardTitle}</strong> 의뢰가 완료되었습니다!(지급받은 금액 : ${requestPrice}원)`;
            console.log("의뢰인 번호 : " + requestBoardMemberNo);
            console.log("조력자 번호 : " + acceptRequestSupporterMemberNo);
            
            sendSupporterNotification("chooseSupporterNoti", `/requestBoard/${categoryId}/${boardNo}`, acceptRequestSupporterMemberNo, content);
        } else {
            alert("요청 처리 실패")
        }
    })
    .catch(e=>console.log(e))
    closeModalAction13();
})


function closeModalAction13() {
    setTimeout(() => {
        modalOverlay13.style.display = 'none';
    }, 100); 
}

function closeModalAction14(){
    setTimeout(() => {
        modalOverlay14.style.display = 'none';
    }, 100); 
};


// --------------------------------------------------------------------------------------- 
// 게시글 수정
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

if (updateBtn != null){
    updateBtn.addEventListener("click", ()=>{
    
        const replacePathname = location.pathname.replace("requestBoard", "requestBoard2");
        location.href = replacePathname + '/update' + location.search;
    })
}


// 게시글 삭제
if (deleteBtn != null){
    deleteBtn.addEventListener("click", ()=>{
    
        if (confirm("정말로 삭제하시겠습니까?")){
            const replacePathname = location.pathname.replace("requestBoard", "requestBoard2");
            location.href = replacePathname + '/delete' + location.search;
        } else {
            alert("삭제 취소");
        }
    })
}

// ----------------------------------------------------------------------------------------------


// 토스트 뷰어
document.addEventListener("DOMContentLoaded", () => {
    const html = document.getElementById("toastContent").innerHTML;
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);

    const viewer = new toastui.Editor({
        el: document.getElementById('viewer'),
        viewer: true,
        initialValue: markdown
    });
});

// 채팅
const chatButton = document.getElementById("chatButton");

if(chatButton != null){
    chatButton.addEventListener("click", ()=>{

        // 의뢰인일 경우 → 여러 조력자와 각각 채팅방 생성
        if(checkLoginMemberEqualsRequester == 1){

            if(requestSupporters.length === 0){
                alert("채팅 가능한 조력자가 없습니다.");
                return;
            }

            requestSupporters.forEach(supporter => {
                const targetNo = supporter.memberNo;

                fetch("/chatting/enter?targetNo=" + targetNo)
                .then(resp => resp.text())
                .then(chattingNo => {
                    const chatUrl = `/chatting?ch=${chattingNo}`;
                    openPopup(chatUrl, "chatPop_" + targetNo, "width=1300, height=910, top=50, left=300");
                })
                .catch(e => console.log(e));
            });

        }
        // 조력자일 경우 → 의뢰인 1명과만 채팅방 생성
        else if(checkAlreadySupport == 1){
            const targetNo = requestBoardMemberNo;

            if(!targetNo){
                alert("채팅 대상이 없습니다.");
                return;
            }

            fetch("/chatting/enter?targetNo=" + targetNo)
            .then(resp => resp.text())
            .then(chattingNo => {
                const chatUrl = `/chatting?ch=${chattingNo}`;
                openPopup(chatUrl, "chatPop_" + targetNo, "width=1300, height=910, top=50, left=300");
            })
            .catch(e => console.log(e));
        }

    });
}

// 알림 관련 기능
// 알림 메세지 전송 함수
const sendSupporterNotification = (type,url,pkNo,content)=>{
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