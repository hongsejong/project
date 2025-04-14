console.log("chatting.js");

let selectChattingNo; // 선택한 채팅방 번호
let selectTargetNo; // 현재 채팅 대상
let selectTargetName; // 대상의 이름
let selectTargetProfile; // 대상의 프로필

const addTargetPopupLayer = document.getElementById("addTargetPopupLayer"); // 팝업 레이어
const addTarget = document.getElementById("addTarget"); // 추가 버튼
const closeBtn = document.getElementById("closeBtn"); // 닫기 버튼
const targetInput = document.getElementById("targetInput"); // 회원 검색
const resultArea = document.getElementById("resultArea"); // 검색 결과

// 채팅방 목록에 클릭 이벤트를 추가하는 함수
function roomListAddEvent(){
    const chattingItemList = document.getElementsByClassName("chatting-item");

    for(let item of chattingItemList){
        item.addEventListener("click", ()=>{
            // 전역변수에 채팅방 번호, 상대 번호, 상대 프로필, 상대 닉네임 저장
            selectChattingNo = item.getAttribute("chat-no");
            selectTargetNo = item.getAttribute("target-no");
            selectTargetName = item.children[1].children[0].children[0].innerText;
            selectTargetProfile = item.querySelector(".list-profile").getAttribute("src");

            // 알림이 존재하는 경우 해당 알림 지우기
            if(item.querySelector(".not-read-count") != null){
                item.querySelector(".not-read-count").remove();
            }

            // 모든 채팅방에서 select 클래스 제거
            for(let it of chattingItemList){
                it.classList.remove("select");
            }

            // 현재 클릭한 채팅방에 select 클래스 추가
            item.classList.add("select");

            // 비동기로 메세지 목록을 조회하는 함수 호출
            selectMessageList();
        })
    }
}

// 추가 버튼 클릭 시
addTarget.addEventListener("click", ()=>{
    // 검색 팝업 레이어 열기
    addTargetPopupLayer.classList.toggle("popup-layer-close"); // toggle() : 해당 클래스가 있으면 제거, 없으면 추가
    targetInput.focus();
})

// 검색 팝업 레이어 닫기
closeBtn.addEventListener("click", ()=>{
    addTargetPopupLayer.classList.toggle("popup-layer-close");
    resultArea.innerHTML = "";
})

// 사용자 검색(ajax)
targetInput.addEventListener("input", e=>{
    const query = e.target.value.trim();

    // 입력된 게 없을 경우
    if(query.length == 0){
        resultArea.innerHTML = ""; // 이전 검색 결과 지우기
        return;
    }
    // 입력된 게 있을 경우
    fetch("/chatting/selectTarget?query="+query)
    .then(resp => resp.json())
    .then(list => {
        resultArea.innerHTML = ""; // 이전 검색 결과 비우기

        if(list.length == 0){
            const li = document.createElement("li");
            li.classList.add("result-row");
            li.innerText = "일치하는 회원이 없습니다";
            resultArea.append(li);
        }
        for(let member of list){
            // li요소 생성(한 행을 감싸는 요소)
            const li = document.createElement("li");
            li.classList.add("result-row");
            li.setAttribute("data-id", member.memberNo);

            // 프로필 이미지 요소
            const img = document.createElement("img");
            img.classList.add("result-row-img");

            // 프로필 이미지 여부에 따른 src 속성 선택
            if     (member.profileImg == null) img.setAttribute("src", "/resources/images/user.png");
            else   img.setAttribute("src", member.profileImg);

            let nickname = member.memberNickname;
            let email = member.memberEmail;

            const span = document.createElement("span");
            span.innerHTML = `${nickname} ${email}`.replace(query, `<mark>${query}</mark>`);

            // 요소 조립(화면에 추가)
            li.append(img, span);
            resultArea.append(li);

            // li요소에 클릭 시 채팅방에 입장하는 이벤트 추가
            li.addEventListener('click', chattingEnter);
        }
    })
    .catch(e => {console.log(e)})
})

// 채팅방 입장 함수
function chattingEnter(e){
    const targetNo = e.currentTarget.getAttribute("data-id");
    fetch("/chatting/enter?targetNo="+targetNo)
    .then(resp => resp.text())
    .then(chattingNo => {
        selectRoomList(); // 채팅방 목록 조회
        setTimeout(()=>{
            // 존재하는 채팅방이 있으면 클릭해서 입장
            const itemList = document.querySelectorAll(".chatting-item");
            for(let item of itemList){
                // 목록에 채팅방이 존재한다면
                if(item.getAttribute("chat-no") == chattingNo){
                    // 팝업 닫기
                    addTargetPopupLayer.classList.toggle("popup-layer-close");
                    // 사용자 검색 결과 삭제
                    resultArea.innerHTML = "";
                    // 검색어 삭제
                    targetInput.value = "";
                    // 해당 채팅방 클릭
                    item.click();
                    return;
                }
            }
        }, 155)
    })
    .catch(e=>{console.log(e)})
}

// 비동기로 채팅방 목록 조회
function selectRoomList(){
    fetch("/chatting/chattingRoomList")
    .then(resp => resp.json())
    .then(roomList => {
        // 채팅방 목록 출력 영역 선택
        const chattingList = document.querySelector(".chatting-list");

        // 채팅방 목록 지우기
        chattingList.innerHTML = "";

        // 조회한 채팅방 목록을 화면에 추가
        for(let room of roomList){
            const li = document.createElement("li");
            li.classList.add("chatting-item");
            li.setAttribute("chat-no", room.chattingNo);
            li.setAttribute("target-no", room.targetNo);

            if(room.chattingNo == selectChattingNo){
                li.classList.add("select");
            }

            // item-header 부분
            const itemHeader = document.createElement("div");
            itemHeader.classList.add("item-header");

            const listProfile = document.createElement("img");
            listProfile.classList.add("list-profile");

            if(room.targetProfile == undefined){
                listProfile.setAttribute("src", "/resources/images/user.png");
            } else{
                listProfile.setAttribute("src", room.targetProfile);
            }   

            itemHeader.append(listProfile);

            // item-body 부분
            const itemBody = document.createElement("div");
            itemBody.classList.add("item-body");

            const p = document.createElement("p");

            const targetName = document.createElement("span");
            targetName.classList.add("target-name");
            targetName.innerText = room.targetNickName;
           
            const recentSendTime = document.createElement("span");
            recentSendTime.classList.add("recent-send-time");
            recentSendTime.innerText = room.sendTime;
           
            p.append(targetName, recentSendTime);
           
            const div = document.createElement("div");
           
            const recentMessage = document.createElement("p");
            recentMessage.classList.add("recent-message");

            if(room.lastMessage != undefined){
                recentMessage.innerHTML = room.lastMessage;
            }
           
            div.append(recentMessage);
            itemBody.append(p,div);

            // 현재 채팅방을 보고있는게 아니고 읽지 않은 개수가 0개 이상인 경우 -> 읽지 않은 메세지 개수 출력
            if(room.notReadCount > 0 && room.chattingNo != selectChattingNo ){
                const notReadCount = document.createElement("p");
                notReadCount.classList.add("not-read-count");
                notReadCount.innerText = room.notReadCount;
                div.append(notReadCount);
            }else{
                setTimeout(()=>{
                    // 현재 채팅방을 보고있는 경우
                    // 비동기로 해당 채팅방 글을 읽음으로 표시
                    fetch("/chatting/updateReadFlag", {
                        method : "PUT",
                        headers : {"Content-Type": "application/json"},
                        body :  JSON.stringify({"chattingNo" : selectChattingNo, "memberNo" : loginMemberNoInChatting})
                    })
                    .then(resp => resp.text())
                    .then(result => {
                        //console.log(result);
                    })
                    .catch(e => {console.log(e)})
                },300)
            }
            li.append(itemHeader, itemBody);
            chattingList.append(li);
        }
        // 채팅방 목록에 클릭 이벤트 함수 호출
        roomListAddEvent();
    })
    .catch(e => {console.log(e)})
}

// 비동기로 메세지 목록 조회하는 함수
function selectMessageList(){
    fetch("/chatting/selectMessageList?chattingNo="+selectChattingNo+"&memberNo="+loginMemberNoInChatting)
    .then(resp => resp.json())
    .then(messageList => {

        // 채팅 상대방 정보 출력하기
        const div = document.getElementsByClassName("chatting-header")[0];
        div.innerHTML = "";
        const targetProfileImg = document.createElement("img");
        targetProfileImg.classList.add("header-profile")
        targetProfileImg.setAttribute("src", selectTargetProfile);
        const targetNickname = document.createElement("span");
        targetNickname.classList.add("header-name");
        targetNickname.innerText = selectTargetName;
        div.append(targetProfileImg,targetNickname);

        const ul = document.querySelector(".display-chatting");
        ul.innerHTML = ""; // 이전 내용 지우기

        // 메세지 만들어서 출력하기
        for(let msg of messageList){
            //<li>,  <li class="my-chat">
            const li = document.createElement("li");

            // 보낸 시간
            const span = document.createElement("span");
            span.classList.add("chatDate");
            span.innerText = msg.sendTime;

            // 메세지 내용
            const p = document.createElement("p");
            p.classList.add("chat");
            p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML

            // 내가 작성한 메세지인 경우
            if(loginMemberNoInChatting == msg.senderNo){
                li.classList.add("my-chat");
                li.append(span, p);
               
            }else{ // 상대가 작성한 메세지인 경우
                li.classList.add("target-chat");

                // 상대 프로필
                // <img src="/resources/images/user.png">
                const img = document.createElement("img");
                img.setAttribute("src", selectTargetProfile);
               
                const div = document.createElement("div");

                // 상대 이름
                const b = document.createElement("b");
                b.innerText = selectTargetName; // 전역변수

                const br = document.createElement("br");

                div.append(b, br, p, span);
                li.append(img,div);
            }
            ul.append(li);
            ul.scrollTop = ul.scrollHeight;
        }
    })
    .catch(e => {console.log(e)})
}

//----------------------------------------------------------------------------------
// sockJS를 이용한 Websocket 구현

let chattingSock;

// 로그인이 되어 있는 경우
// /chattingSock 이라는 요청 주소로 통신할 수 있는 WebSocket 생성
if(loginMemberNoInChatting != ""){
    chattingSock = new SockJS("/chattingSock");
}

// 채팅 입력 시
const send = document.getElementById("send");

const sendMessage = () => {
    const inputChatting = document.getElementById("inputChatting");

    if(inputChatting.value.trim() != ""){ // 채팅 내용이 있는 경우
        var obj = {
            "senderNo" : loginMemberNoInChatting,
            "targetNo" : selectTargetNo,
            "chattingNo" : selectChattingNo,
            "messageContent" : inputChatting.value
        };
        // JS 객체 -> JSON으로 변환하여 전송
        chattingSock.send(JSON.stringify(obj));
        
        // 채팅 알림 메시지
        const content = `<strong>${loginMemberNickInChatting}</strong> 님이 채팅을 보냈습니다. <br> 
                        "${inputChatting.value.replace("<","&lt;").replace(">","&gt;").replace("&", "&amp;").replace("\"", "&quot;")}"`;
        
        sendNotification("insertChatting", `${location.pathname}?ch=${selectChattingNo}`, selectTargetNo, content);

        inputChatting.value = ""; // 기존 메세지 내용 삭제
    } else{ // 없는 경우
        alert("채팅을 입력해주세요.");
        inputChatting.value = "";
    }
}

// 엔터 키 누를 경우 메세지 제출
// shift + enter -> 줄바꿈
inputChatting.addEventListener("keyup", e => {
    //console.log(e.key); // 입력한 값 출력
    //console.log(e.shiftKey) // shift + enter인 경우 true 반환

    if(e.key == "Enter"){
        if(!e.shiftKey){
            sendMessage();
        }
    }
})

// WebSocket 객체 chattingSock이
// 서버로부터 메세지를 받으면 자동으로 실행될 콜백 함수
chattingSock.onmessage = e => {
    // 전달 받은 객체 값을 JS 객체로 변환해서 변수에 저장
    const msg = JSON.parse(e.data);
    //console.log(msg);

    // 현재 채팅방을 보고있는 경우
    if(selectChattingNo == msg.chattingNo){

        const ul = document.querySelector(".display-chatting");
   
        // 메세지 만들어서 출력하기
        //<li>,  <li class="my-chat">
        const li = document.createElement("li");
   
        // 보낸 시간
        const span = document.createElement("span");
        span.classList.add("chatDate");
        span.innerText = msg.sendTime;
   
        // 메세지 내용
        const p = document.createElement("p");
        p.classList.add("chat");
        p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML
   
        // 내가 작성한 메세지인 경우
        if(loginMemberNoInChatting == msg.senderNo){
            li.classList.add("my-chat");
            li.append(span, p);
           
        }else{ // 상대가 작성한 메세지인 경우
            li.classList.add("target-chat");
   
            // 상대 프로필
            // <img src="/resources/images/user.png">
            const img = document.createElement("img");
            img.setAttribute("src", selectTargetProfile);
           
            const div = document.createElement("div");
   
            // 상대 이름
            const b = document.createElement("b");
            b.innerText = selectTargetName; // 전역변수
   
            const br = document.createElement("br");
   
            div.append(b, br, p, span);
            li.append(img,div);
        }
        ul.append(li)
        ul.scrollTop = ul.scrollHeight; // 스크롤을 제일 밑으로
    }
    selectRoomList();
}

//----------------------------------------------------------------------------------

// 문서 로딩 완료 후 수행할 기능
document.addEventListener("DOMContentLoaded", ()=>{
    // 채팅방 목록에 클릭 이벤트 함수 호출
    roomListAddEvent();

    // 보내기 버튼에 클릭 이벤트 추가
    send.addEventListener("click", sendMessage);
    
    // 채팅 알림을 클릭해서 채팅 페이지로 이동한 경우
    const params = new URLSearchParams(location.search);
    const ch = params.get("ch");
    if(ch != null){
        const chattingItems = document.querySelectorAll(".chatting-item");
        chattingItems.forEach( item => {
            if(item.getAttribute("chat-no") == ch){
                item.click();
                return;
            }
        })
    } else{ // 아닌 경우 == 채팅방 입장 시
        // 채팅방 입장 시 채팅 목록이 존재하는 경우
        // 가장 최근 채팅방에 입장
        document.querySelector(".chatting-item")?.click();
    }
});

//----------------------------------------------------------------------------------

// 테마 변경
const changeTheme = document.getElementById("changeTheme");

// localStorage : 브라우저에 key-value 값을 Storage에 저장할 수 있음.
// 이 때, 저장한 데이터는 세션간 공유됨.

const isUserColorTheme = localStorage.getItem("color-theme");
const isOsColorTheme = window.matchMedia("(prefers-color-scheme:pink)").matches?"pink":"light";
// prefers-color-scheme : CSS 미디어 특성을 이용해 사용자의 OS가 사용하는 테마를 감지

// 사용자의 테마를 얻어오는 함수
const getUserTheme = () => (isUserColorTheme?isUserColorTheme:isOsColorTheme);

// 문서의 모든 콘텐츠가 로드된 경우
window.onload = () => {
    if(getUserTheme() == "original"){ // light 모드인 경우
        document.documentElement.setAttribute("color-theme", "original"); // html 태그에 color-theme 속성 추가
        localStorage.setItem("color-theme", "original");
    } else{ // pink 모드인 경우
        document.documentElement.setAttribute("color-theme", "pink");
        localStorage.setItem("color-theme", "pink");
        changeTheme.setAttribute("checked", true);
    }
}

// 테마 변경 버튼 클릭 시
changeTheme.addEventListener("click", e => {
    if(e.target.checked){ // 체크된 경우
        // html 태그에 color-theme 속성 추가(이미 있는 경우 덮어쓰기)
        document.documentElement.setAttribute("color-theme", "pink");
        localStorage.setItem("color-theme", "pink");
    } else{ // 체크 해제된 경우
        document.documentElement.setAttribute("color-theme", "original");
        localStorage.setItem("color-theme", "original");
    }
})

// 메인 페이지 종료 시 팝업창 종료
setInterval(() => {
    const ts = localStorage.getItem("mainClosedTimestamp");
    if (ts) {
        // 현재 시간과 기록된 타임스탬프 차이를 계산 (밀리초 단위)
        const diff = Date.now() - parseInt(ts, 10);
        // 예를 들어, 2000ms(2초) 이상 차이가 나면 메인 페이지가 종료된 것으로 간주
        if (diff > 2000) {
            window.close(); // 메인 페이지가 종료되면 팝업 닫기
        }
    }
}, 4000);

// 알림 관련 기능
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