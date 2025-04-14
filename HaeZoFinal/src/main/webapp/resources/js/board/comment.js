console.log("comment.js");

document.addEventListener("DOMContentLoaded", selectCommentList);

function selectCommentList(){
    fetch("/comment?boardNo="+boardNo) // GET 방식은 주소에 파라미터 담아서 전달
    .then(resp => resp.json()) // 응답 객체 -> 파싱
    .then(comments => {
        const commentList = document.getElementById("commentList"); // 댓글 목록 ul 태그
        commentList.innerHTML = ""; // 기존 댓글 초기화

        for (let comment of comments) {
            // 댓글 행(li) 생성
            const commentRow = document.createElement("li");
            commentRow.classList.add("comment-row");

            // 대댓글일 경우 child-comment 클래스 추가
            if (comment.parentNo !== 0) {
                commentRow.classList.add("child-comment");
            }
            commentRow.setAttribute("id", "c" + comment.commentNo);
            commentRow.setAttribute("data-comment-no", comment.boardNo);

            // 프로필 이미지 추가
            const profileImage = document.createElement("img");
            profileImage.classList.add("profile-image");
            profileImage.setAttribute("alt", "프로필이미지");
            profileImage.setAttribute("src", comment.profileImage ? comment.profileImage : "/resources/images/user2.gif");

            // 댓글 내용 컨테이너 생성
            const commentWrapper = document.createElement("div");
            commentWrapper.classList.add("comment-content-wrapper");

            // 작성자 정보 (닉네임 + 작성 날짜)
            const commentWriter = document.createElement("p");
            commentWriter.classList.add("comment-writer");

            const memberNickname = document.createElement("span");
            memberNickname.innerText = comment.memberNickname;

            const commentDate = document.createElement("span");
            commentDate.classList.add("comment-date");
            commentDate.innerText = `(${comment.commentCreateDate})`;

            commentWriter.append(memberNickname, commentDate);

            // 댓글 내용
            const commentContent = document.createElement("p");
            commentContent.classList.add("comment-content");
            commentContent.innerText = comment.commentContent;

            // 버튼 영역 (답글, 수정, 삭제 버튼)
            const commentBtnArea = document.createElement("div");
            commentBtnArea.classList.add("comment-btn-area");

            // 🔹 로그인한 사용자만 답글 가능
            if (memberNo !== "") {
                const replyBtn = document.createElement("button");
                replyBtn.innerText = "답글";
                replyBtn.setAttribute("onclick", `showInsertComment(${comment.commentNo}, this)`);
                commentBtnArea.append(replyBtn);
            }

            // 🔹 본인 댓글일 경우 수정/삭제 버튼 추가
            if (memberNo == comment.memberNo) {
                const updateBtn = document.createElement("button");
                updateBtn.innerText = "수정";
                updateBtn.setAttribute("onclick", `showUpdateComment(${comment.commentNo}, this)`);

                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "삭제";
                deleteBtn.setAttribute("onclick", `deleteComment(${comment.commentNo})`);

                commentBtnArea.append(updateBtn, deleteBtn);
            }

            // 요소들 조합하여 댓글 추가
            commentWrapper.append(commentWriter, commentContent, commentBtnArea);
            commentRow.append(profileImage, commentWrapper); // 기존 JSP 구조와 동일하게 배치
            commentList.append(commentRow);
        }
    })
    .catch(err => console.error("댓글 불러오기 오류:", err));
}



// 댓글 등록
const addComment = document.getElementById("addComment");
const commentContent = document.getElementById("commentContent");

addComment.addEventListener("click", e => { // 댓글 등록 버튼이 클릭이 되었을 때

    // 1) 로그인이 되어있나? -> 전역변수 memberNo 이용
    if(memberNo == ""){ // 로그인 X
        alert("로그인 후 이용해주세요.");
        return;
    }

    // 2) 댓글 내용이 작성되어있나?
    if(commentContent.value.trim().length == 0){ // 미작성인 경우
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");

        commentContent.value = ""; // 띄어쓰기, 개행문자 제거
        commentContent.focus();
        return;
    }

    // 3) AJAX를 이용해서 댓글 내용 DB에 저장(INSERT)
    fetch("/comment", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "commentContent" : commentContent.value,
            "boardNo" : boardNo,
            "memberNo" : memberNo
        })
    })
    .then(resp => resp.text())
    .then(commentNo => {
        if(commentNo > 0){ // 등록 성공
            alert("댓글이 등록되었습니다.");

            commentContent.value = ""; // 작성했던 댓글 삭제

            selectCommentList(); // 비동기 댓글 목록 조회 함수 호출
            // -> 새로운 댓글이 추가되어짐

            // 댓글을 작성한 경우
            // 게시글 작성자에게 알림 전송
            // 알림 클릭 시 작성된 댓글 위치로 바로 이동
            // -> url에 댓글 번호 추가(?cn=댓글번호)
            const content = `<strong>${memberNickname}</strong>님이 <strong>${boardTitle}</strong> 댓글을 작성했어!`;
            // type, url, pkNo, content
            sendNotification("insertComment",`${location.pathname}?cn=${commentNo}`,boardNo,content);
        } else { // 실패
            alert("댓글 등록에 실패했습니다...");
        }
    })
    .catch(err => console.log(err));
});

// 댓글 삭제
function deleteComment(commentNo){

    if( confirm("정말로 삭제 하시겠습니까?") ){

        fetch("/comment",{
            method : "DELETE",
            headers : {"Content-Type" : "application/json"},
            body : commentNo
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                alert("삭제되었습니다");
                selectCommentList(); // 목록을 다시 조회해서 삭제된 글을 제거
            }else{
                alert("삭제 실패");
            }
        })
        .catch(err => console.log(err));

    }
}

// 댓글 수정 화면 전환 
let beforeCommentRow; // 수정 전 원래 행의 상태를 저장할 변수


function showUpdateComment(commentNo, btn){
                     // 댓글번호, 이벤트발생요소(수정버튼)

    // ** 댓글 수정이 한 개만 열릴 수 있도록 만들기 **
    // 댓글 수정을 위한 textarea를 모두 얻어옴 -> 수정이 활성화 되어 있을 경우 1개, 없으면 0개
    const temp = document.getElementsByClassName("update-textarea");  

    if(temp.length > 0){ // 수정이 한 개 이상 열려 있는 경우

        if(confirm("다른 댓글이 수정 중입니다. 현재 댓글을 수정 하시겠습니까?")){ // 확인

            temp[0].parentElement.innerHTML = beforeCommentRow;
            // comment-row                       // 백업한 댓글
            // 백업 내용으로 덮어 씌워 지면서 textarea 사라짐
       
        }else{ // 취소
            return;
        }
    }


    // 1. 댓글 수정이 클릭된 행을 선택
    const commentRow = btn.parentElement.parentElement; // 수정 버튼의 부모의 부모

    // 2. 행 내용 삭제 전 현재 상태를 저장(백업) (문자열)
    //    (전역변수 이용)
    beforeCommentRow = commentRow.innerHTML;


    // 3. 댓글에 작성되어 있던 내용만 얻어오기 -> 새롭게 생성된 textarea 추가될 예정
    
    let beforeContent = commentRow.children[1].innerHTML;

    // 이것도 가능!
    //let beforeContent = btn.parentElement.previousElementSibling.innerHTML;


    // 4. 댓글 행 내부 내용을 모두 삭제
    commentRow.innerHTML = "";

    // 5. textarea 요소 생성 + 클래스 추가  +  **내용 추가**
    const textarea = document.createElement("textarea");
    textarea.classList.add("update-textarea");

    // ******************************************
    // XSS 방지 처리 해제
    beforeContent =  beforeContent.replaceAll("&amp;", "&");
    beforeContent =  beforeContent.replaceAll("&lt;", "<");
    beforeContent =  beforeContent.replaceAll("&gt;", ">");
    beforeContent =  beforeContent.replaceAll("&quot;", "\"");
    
    // ******************************************
    textarea.value = beforeContent; // 내용 추가

    // 6. commentRow에 생성된 textarea 추가
    commentRow.append(textarea);


    // 7. 버튼 영역 + 수정/취소 버튼 생성
    const commentBtnArea = document.createElement("div");
    commentBtnArea.classList.add("comment-btn-area");
    

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "수정";
    updateBtn.setAttribute("onclick", "updateComment("+commentNo+", this)");


    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.setAttribute("onclick", "updateCancel(this)");


    // 8. 버튼영역에 버튼 추가 후 
    //    commentRow(행)에 버튼영역 추가
    commentBtnArea.append(updateBtn, cancelBtn);
    commentRow.append(commentBtnArea);

    autoResizeTextarea(textarea);

}

// -----------------------------------------------------------------------------------
// 댓글 수정 취소
function updateCancel(btn){
    // 매개변수 btn : 클릭된 취소 버튼
    // 전역변수 beforeCommentRow : 수정 전 원래 행(댓글)을 저장한 변수

    if(confirm("댓글 수정을 취소하시겠습니까?")){
        btn.parentElement.parentElement.innerHTML = beforeCommentRow;
    }
}
// -----------------------------------------------------------------------------------
// 댓글 수정(AJAX)
function updateComment(commentNo, btn){

    // 새로 작성된 댓글 내용 얻어오기
    const commentContent = btn.parentElement.previousElementSibling.value;

    fetch("/comment",{
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "commentNo" : commentNo,
            "commentContent" : commentContent
            
        })
    })
    .then(resp => resp.text())
    .then(result => {
        if(result > 0){
            alert("댓글이 수정되었습니다.");
            selectCommentList();
        }else{
            alert("댓글 수정 실패");
        }
    })
    .catch(err => console.log(err));

}
// -----------------------------------------------------------------------------------
// 답글 작성 화면 추가 
// -> 답글 작성 화면은 전체 화면에 1개만 존재 해야한다!

function showInsertComment(parentNo, btn) {
    // ** 답글 작성 textarea가 한 개만 열릴 수 있도록 만들기 ** 
    const temp = document.getElementsByClassName("commentInsertContent");
    

    if (temp.length > 0) { // 답글 작성 textarea가 이미 화면에 존재하는 경우
        if (confirm("다른 답글을 작성 중입니다. 현재 댓글에 답글을 작성하시겠습니까?")) {
            const existingReplyWrappers = document.querySelectorAll('#commentList .reply-wrapper');
            existingReplyWrappers.forEach(function(replyWrapper) {
                replyWrapper.remove(); // 해당 reply-wrapper 삭제
            });
        } else {
            return; // 함수를 종료시켜 답글이 생성되지 않게 함
        }
    }

    // 댓글의 부모인 comment-row 요소를 찾기
    const commentRow = btn.closest('.comment-row');

    // 기존에 열린 답글 입력 칸이 있는지 확인하고, 있으면 제거 후 새로운 답글 화면 추가
    const existingReplyWrapper = commentRow.nextElementSibling;
    if (existingReplyWrapper && existingReplyWrapper.classList.contains('reply-wrapper')) {
        existingReplyWrapper.remove(); // 기존 답글 입력 화면 삭제
    }

    // 새로운 div를 만들어서 답글 입력 칸과 버튼들을 감쌈
    const replyWrapper = document.createElement('div');
    replyWrapper.classList.add('reply-wrapper');  // 새로운 div에 클래스 추가

    // 답글을 작성할 textarea 요소 생성
    const textarea = document.createElement("textarea");
    textarea.classList.add("commentInsertContent");

    // 답글 버튼 영역 생성
    const commentBtnArea = document.createElement("div");
    commentBtnArea.classList.add("comment-btn-area");

    // 등록 버튼 생성
    const insertBtn = document.createElement("button");
    insertBtn.innerText = "등록";
    insertBtn.setAttribute("onclick", "insertChildComment(" + parentNo + ", this)");

    // 취소 버튼 생성
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.setAttribute("onclick", "insertCancel(this)");

    // 버튼 영역에 등록/취소 버튼 추가
    commentBtnArea.append(insertBtn, cancelBtn);

    // replyWrapper div에 textarea와 버튼 영역 추가
    replyWrapper.append(textarea, commentBtnArea);

    // comment-row의 바로 다음 형제 요소로 replyWrapper 추가
    commentRow.insertAdjacentElement('afterend', replyWrapper);
}

// 답글 등록 함수
function insertChildComment(parentNo, btn){
                        // 부모 댓글 번호, 답글 등록 버튼

    // 누가?                loginMemberNo(로그인한 회원의 memberNo )(전역변수)
    // 어떤 내용?           textarea에 작성된 내용
    // 몇번 게시글?         현재 게시글 boardNo (전역변수)
    // 부모 댓글은 누구?    parentNo (매개변수)

    // 답글 내용
    const commentContent = btn.parentElement.previousElementSibling.value;

    // 답글 내용이 작성되지 않은 경우
    if(commentContent.trim().length == 0){
        alert("답글 작성 후 등록 버튼을 클릭해주세요.");
        btn.parentElement.previousElementSibling.value = "";
        btn.parentElement.previousElementSibling.focus();
        return;
    }

    fetch("/comment",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "commentContent" : commentContent,
            "boardNo" : boardNo,
            "memberNo" : memberNo,
            "parentNo" : parentNo})
    })
    .then(resp => resp.text())
    .then(commentNo => {
        if(commentNo > 0){ // 등록 성공
            alert("답글이 등록되었습니다.");
            selectCommentList(); // 비동기 댓글 목록 조회 함수 호출

            // 답글(대댓글)을 작성한 경우
            // OOO님이 답글을 작성했습니다. 알림 전송
            const content = `<strong>${memberNickname}</strong>님이 답글을 작성했습니다.`;
            
            // type, url, pkNo, content
            sendNotification("insertChildComment", 
                `${location.pathname}?cn=${commentNo}`, 
                parentNo,
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
    if (event.target && event.target.classList.contains('commentInsertContent')) {
        autoResizeTextarea(event.target);  // 입력 시 자동으로 크기 조정
    }
});
// 댓글 수정 textarea에 입력할 때마다 크기 자동 조정
document.addEventListener('input', function(event) {
    if (event.target && event.target.classList.contains('update-textarea')) {
        autoResizeTextarea(event.target);  // 입력 시 자동으로 크기 조정
    }
});