console.log("threadBoard.js");

// 자동 크기 조정 함수
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';  // 먼저 높이를 초기화
    textarea.style.height = textarea.scrollHeight + 'px';  // 내용에 맞게 높이 조정
}
// 댓글 입력과 답글 입력 textarea에 적용
document.querySelectorAll('textarea').forEach(function(textarea) {
    textarea.addEventListener('input', function() {
        autoResizeTextarea(textarea);  // 입력 시 자동으로 크기 조정
    });
});
// 답글 textarea 자동 크기 조정 이벤트 리스너 추가
document.addEventListener('input', function(event) {
    if (event.target && event.target.classList.contains('threadInsertContent')) {
        autoResizeTextarea(event.target);  // 입력 시 자동으로 크기 조정
    }
});
// 댓글 수정 textarea에 입력할 때마다 크기 자동 조정
document.addEventListener('input', function(event) {
    if (event.target && event.target.classList.contains('update-textarea')) {
        autoResizeTextarea(event.target);  // 입력 시 자동으로 크기 조정
    }
});


// 댓글 등록
const addThread = document.getElementById("addThread");
const threadContent = document.getElementById("threadContent");

addThread.addEventListener("click", e => { // 댓글 등록 버튼이 클릭이 되었을 때
    
    // 1) 로그인이 되어있나? -> 전역변수 memberNo 이용
    if(loginMember == ""){ // 로그인 X
        alert("로그인 후 이용해주세요.");
        return;
    }

    // 2) 댓글 내용이 작성되어있나?
    if(threadContent.value.trim().length == 0){ // 미작성인 경우
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");

        threadContent.value = ""; // 띄어쓰기, 개행문자 제거
        threadContent.focus();
        return;
    }
    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    fetch("/thread", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "boardContent" : threadContent.value,
            "memberNo" : memberNo
        })
    })
    .then(resp => resp.text())
    .then(boardNo => {
        if(boardNo > 0){ // 등록 성공
            alert("댓글이 등록되었습니다.");

            threadContent.value = ""; // 작성했던 댓글 삭제

            selectThreadList(); // 비동기 댓글 목록 조회 함수 호출
            // -> 새로운 댓글이 추가되어짐

            // 댓글을 작성한 경우
            // 게시글 작성자에게 알림 전송
            // 알림 클릭 시 작성된 댓글 위치로 바로 이동
            // -> url에 댓글 번호 추가(?cn=댓글번호)

            // const content = `<strong>${memberNickname}</strong>님이 <strong>${boardTitle}</strong> 댓글을 작성했어!`;
            
            // type, url, pkNo, content
            // sendNotification(
            //     "insertComment",
            //     `${location.pathname}?cn=${commentNo}`, // 게시글 상세 조회 페이지 주소
            //     boardNo,
            //     content
            // );
        } else { // 실패
            alert("댓글 등록에 실패했습니다...");
        }
    })
    .catch(err => console.log(err));
});

function selectThreadList(){
    fetch("/threadList")
    .then(resp => resp.json())
    .then(threads => {
        const threadList = document.getElementById("threadList"); // 스레드 목록을 담을 ul 태그
        threadList.innerHTML = ""; // 기존 스레드 초기화

        // 스레드 목록 반복
        for (let thread of threads) {
            // 스레드 행(li) 생성
            const threadRow = document.createElement("li");
            threadRow.classList.add("thread-row");

            // 부모 스레드가 아닐 경우 child-thread 클래스 추가
            if (thread.parentBoardNo !== 0) {
                threadRow.classList.add("child-thread");
            }

            threadRow.setAttribute("data-thread-no", thread.boardNo);

            // 프로필 이미지 추가
            const profileImage = document.createElement("img");
            profileImage.classList.add("profile-image");
            profileImage.setAttribute("alt", "프로필이미지");
            profileImage.setAttribute("src", thread.profileImage ? thread.profileImage : "/resources/images/user2.gif");

            // 스레드 내용 컨테이너 생성
            const threadWrapper = document.createElement("div");
            threadWrapper.classList.add("thread-content-wrapper");

            // 작성자 정보 (닉네임 + 작성 날짜)
            const threadWriter = document.createElement("p");
            threadWriter.classList.add("thread-writer");

            const memberNickname = document.createElement("span");
            memberNickname.innerText = thread.memberNickname;

            const threadDate = document.createElement("span");
            threadDate.classList.add("thread-date");
            threadDate.innerText = `(${thread.boardCreateDate})`;

            threadWriter.append(memberNickname, threadDate);

            // 스레드 내용
            const threadContent = document.createElement("p");
            threadContent.classList.add("thread-content");
            threadContent.innerText = thread.boardContent;

            // 버튼 영역 (답글, 수정, 삭제 버튼)
            const threadBtnArea = document.createElement("div");
            threadBtnArea.classList.add("thread-btn-area");

            // 🔹 로그인한 사용자만 답글 가능
            if (loginMember !== "") {
                const replyBtn = document.createElement("button");
                replyBtn.innerText = "답글";
                replyBtn.setAttribute("onclick", `showInsertThread(${thread.boardNo}, this)`);
                threadBtnArea.append(replyBtn);
            }


            // 🔹 본인 스레드일 경우 수정/삭제 버튼 추가
            if (memberNo == thread.memberNo) {
                const updateBtn = document.createElement("button");
                updateBtn.innerText = "수정";
                updateBtn.setAttribute("onclick", `showUpdateThread(${thread.boardNo}, this)`);

                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "삭제";
                deleteBtn.setAttribute("onclick", `deleteThread(${thread.boardNo})`);

                threadBtnArea.append(updateBtn, deleteBtn);
            }

            // 요소들 조합하여 스레드 추가
            threadWrapper.append(threadWriter, threadContent, threadBtnArea);
            threadRow.append(profileImage, threadWrapper); // 기존 JSP 구조와 동일하게 배치
            threadList.append(threadRow);
        }
    })
    .catch(e=>console.log(e))
}

// 스레드 삭제
function deleteThread(boardNo){

    if( confirm("정말로 삭제 하시겠습니까?") ){

        fetch("/threadNo",{
            method : "DELETE",
            headers : {"Content-Type" : "application/json"},
            body : boardNo
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                alert("삭제되었습니다");
                selectThreadList(); // 목록을 다시 조회해서 삭제된 글을 제거
            }else{
                alert("삭제 실패");
            }
        })
        .catch(err => console.log(err));

    }
}


// -----------------------------------------------------------------------------------
// 답글 작성 화면 추가
// -> 답글 작성 화면은 전체 화면에 1개만 존재 해야한다!

function showInsertThread(parentBoardNo, btn) {
    // ** 답글 작성 textarea가 한 개만 열릴 수 있도록 만들기 **
    const temp = document.getElementsByClassName("threadInsertContent");

    if (temp.length > 0) { // 답글 작성 textarea가 이미 화면에 존재하는 경우
        if (confirm("다른 답글을 작성 중입니다. 현재 스레드에 답글을 작성하시겠습니까?")) {
            const existingReplyWrappers = document.querySelectorAll('#threadList .reply-wrapper');
            existingReplyWrappers.forEach(function(replyWrapper) {
                replyWrapper.remove(); // 해당 reply-wrapper 삭제
            });
        } else {
            return; // 함수를 종료시켜 답글이 생성되지 않게 함
        }
    }

    // 스레드의 부모인 thread-row 요소를 찾기
    const threadRow = btn.closest('.thread-row');

    // 기존에 열린 답글 입력 칸이 있는지 확인하고, 있으면 제거 후 새로운 답글 화면 추가
    const existingReplyWrapper = threadRow.nextElementSibling;
    if (existingReplyWrapper && existingReplyWrapper.classList.contains('reply-wrapper')) {
        existingReplyWrapper.remove(); // 기존 답글 입력 화면 삭제
    }

    // 새로운 div를 만들어서 답글 입력 칸과 버튼들을 감쌈
    const replyWrapper = document.createElement('div');
    replyWrapper.classList.add('reply-wrapper');  // 새로운 div에 클래스 추가

    // 답글을 작성할 textarea 요소 생성
    const textarea = document.createElement("textarea");
    textarea.classList.add("threadInsertContent");

    // 답글 버튼 영역 생성
    const threadBtnArea = document.createElement("div");
    threadBtnArea.classList.add("thread-btn-area");

    // 등록 버튼 생성
    const insertBtn = document.createElement("button");
    insertBtn.innerText = "등록";
    insertBtn.setAttribute("onclick", "insertChildThread(" + parentBoardNo + ", this)");

    // 취소 버튼 생성
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.setAttribute("onclick", "insertCancel(this)");

    // 버튼 영역에 등록/취소 버튼 추가
    threadBtnArea.append(insertBtn, cancelBtn);

    // replyWrapper div에 textarea와 버튼 영역 추가
    replyWrapper.append(textarea, threadBtnArea);

    // thread-row의 바로 다음 형제 요소로 replyWrapper 추가
    threadRow.insertAdjacentElement('afterend', replyWrapper);
}

// 답글 등록 함수
function insertChildThread(parentBoardNo, btn) {
    // 부모 스레드 번호, 답글 등록 버튼

    // 누가?                loginMemberNo(로그인한 회원의 memberNo )(전역변수)
    // 어떤 내용?           textarea에 작성된 내용
    // 몇번 게시글?         현재 게시글 boardNo (전역변수)
    // 부모 스레드는 누구?  parentBoardNo (매개변수)

    // 답글 내용
    const threadContent = btn.parentElement.previousElementSibling.value;

    // 답글 내용이 작성되지 않은 경우
    if (threadContent.trim().length == 0) {
        alert("답글 작성 후 등록 버튼을 클릭해주세요.");
        btn.parentElement.previousElementSibling.value = "";
        btn.parentElement.previousElementSibling.focus();
        return;
    }

    fetch("/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "boardContent": threadContent,
            "memberNo": memberNo,
            "parentBoardNo": parentBoardNo
        })
    })
    .then(resp => resp.text())
    .then(threadNo => {
        if (threadNo > 0) { // 등록 성공
            alert("답글이 등록되었습니다.");
            selectThreadList(); // 비동기 스레드 목록 조회 함수 호출

            // 답글(대댓글)을 작성한 경우
            // OOO님이 답글을 작성했습니다. 알림 전송
            const content = `<strong>${memberNickname}</strong>님이 답글을 작성했습니다.`;

            // type, url, pkNo, content
            sendNotification("insertChildThread", 
                `${location.pathname}?tn=${threadNo}`, 
                parentBoardNo,
                content);
        } else { // 실패
            alert("답글 등록에 실패했습니다...");
        }
    })
    .catch(err => console.log(err));
}

// 답글 취소 함수
function insertCancel(btn) {
    const replyWrapper = btn.closest('.reply-wrapper');
    if (replyWrapper) {
        replyWrapper.remove(); // textarea 및 버튼 영역 삭제
    }
}

let beforeThreadRow; // 수정 전 원래 행의 상태를 저장할 변수

// -----------------------------------------------------------------------------------
// 스레드 수정 화면 전환
function showUpdateThread(boardNo, btn) {
    // ** 스레드 수정이 한 개만 열릴 수 있도록 만들기 **
    const temp = document.getElementsByClassName("update-textarea");  

    if (temp.length > 0) { // 수정이 한 개 이상 열려 있는 경우
        if (confirm("다른 스레드가 수정 중입니다. 현재 스레드를 수정하시겠습니까?")) { // 확인
            temp[0].parentElement.innerHTML = beforeThreadRow;
            // 기존 스레드 내용으로 덮어 씌워지면서 textarea 사라짐
        } else { // 취소
            return;
        }
    }

    // 1. 수정이 클릭된 스레드 행을 선택
    const threadRow = btn.closest('.thread-row'); // 수정 버튼의 부모의 부모

    // 2. 행 내용 삭제 전 현재 상태를 저장(백업)
    beforeThreadRow = threadRow.innerHTML;

    // 3. 스레드에 작성되어 있던 내용만 얻어오기
    let beforeContent = threadRow.querySelector('.thread-content').innerText;

    // 4. 기존 내용이 들어갈 부분을 제거
    const threadContentWrapper = threadRow.querySelector('.thread-content-wrapper');
    threadContentWrapper.querySelector('.thread-content').remove(); // 기존 내용 삭제

    // 5. textarea 요소 생성 + 클래스 추가 + **내용 추가**
    const textarea = document.createElement("textarea");
    textarea.classList.add("update-textarea");
    textarea.value = beforeContent; // 기존 내용 채워넣기

    // 6. 스레드 행에 새로 생성된 textarea 추가
    threadContentWrapper.insertBefore(textarea, threadContentWrapper.querySelector('.thread-btn-area')); // 버튼 위에 추가

    // 7. 버튼 영역 + 수정/취소 버튼 생성
    const threadBtnArea = threadRow.querySelector('.thread-btn-area');
    
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "저장";
    updateBtn.setAttribute("onclick", "updateThread(" + boardNo + ", this)");

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.setAttribute("onclick", "updateCancel(this)");

    // 기존 버튼들을 삭제하고 새로운 버튼 추가
    threadBtnArea.innerHTML = ""; // 기존 버튼들 삭제
    threadBtnArea.append(updateBtn, cancelBtn);

    autoResizeTextarea(textarea);
}

// -----------------------------------------------------------------------------------
// 스레드 수정 취소
function updateCancel(btn) {
    // 매개변수 btn : 클릭된 취소 버튼
    // 전역변수 beforeThreadRow : 수정 전 원래 행(스레드)을 저장한 변수

    if (confirm("스레드 수정을 취소하시겠습니까?")) {
        btn.closest('.thread-row').innerHTML = beforeThreadRow;
    }
}

// -----------------------------------------------------------------------------------
// 스레드 수정(AJAX)
function updateThread(boardNo, btn) {
    // 새로 작성된 스레드 내용 얻어오기
    const threadContent = btn.parentElement.previousElementSibling.value;

    fetch("/thread", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "boardNo": boardNo,
            "boardContent": threadContent
        })
    })
    .then(resp => resp.text())
    .then(result => {
        if (result > 0) {
            alert("스레드가 수정되었습니다.");
            selectThreadList(); // 수정된 스레드 목록을 다시 불러오기
        } else {
            alert("스레드 수정 실패");
        }
    })
    .catch(err => console.log(err));
}

