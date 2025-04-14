console.log("comment.js");

// 댓글 목록 조회
function selectCommentList() {
    fetch(`/comment?boardNo=${boardNo}`)
        .then(resp => resp.json())
        .then(cList => {
            console.log(cList);

            const commentList = document.getElementById("commentList");
            commentList.innerHTML = "";

            for (let comment of cList) {
                const commentRow = document.createElement("li");
                commentRow.classList.add("comment-row");
                commentRow.setAttribute("data-comment-no", comment.commentNo);

                if (comment.parentNo != 0) commentRow.classList.add("child-comment");

                const commentWriter = document.createElement("p");
                commentWriter.classList.add("comment-writer");

                const profileImage = document.createElement("img");
                profileImage.setAttribute("src", comment.profileImage ? comment.profileImage : "/resources/images/user.png");

                const memberNickname = document.createElement("span");
                memberNickname.innerText = comment.memberNickname;

                const commentDate = document.createElement("span");
                commentDate.classList.add("comment-date");
                commentDate.innerText = `(${comment.commentCreateDate})`;

                commentWriter.append(profileImage, memberNickname, commentDate);

                const commentContent = document.createElement("p");
                commentContent.classList.add("comment-content");
                commentContent.innerHTML = comment.commentContent;

                commentRow.append(commentWriter, commentContent);

                if (loginMemberNo !== "") {
                    const commentBtnArea = document.createElement("div");
                    commentBtnArea.classList.add("comment-btn-area");

                    const childCommentBtn = document.createElement("button");
                    childCommentBtn.innerText = "답글";
                    childCommentBtn.onclick = () => showInsertComment(comment.commentNo, childCommentBtn);

                    commentBtnArea.append(childCommentBtn);

                    if (loginMemberNo == comment.memberNo) {
                        const updateBtn = document.createElement("button");
                        updateBtn.innerText = "수정";
                        updateBtn.onclick = () => showUpdateComment(comment.commentNo, updateBtn);

                        const deleteBtn = document.createElement("button");
                        deleteBtn.innerText = "삭제";
                        deleteBtn.onclick = () => deleteComment(comment.commentNo);

                        commentBtnArea.append(updateBtn, deleteBtn);
                    }

                    commentRow.append(commentBtnArea);
                }

                commentList.append(commentRow);
            }
        })
        .catch(err => {
            console.error("❌ 댓글 목록 조회 중 오류 발생: ", err);
            alert("🚨 서버 오류로 인해 댓글을 불러올 수 없습니다.");
        });
}

// 댓글 등록
document.getElementById("addComment").addEventListener("click", () => {
    if (loginMemberNo == "") {
        alert("로그인 후 이용해주세요.");
        return;
    }

    const commentContent = document.getElementById("commentContent");

    if (commentContent.value.trim().length === 0) {
        alert("댓글을 작성한 후 버튼을 클릭해주세요.");
        commentContent.value = "";
        commentContent.focus();
        return;
    }

    fetch("/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            commentContent: commentContent.value,
            boardNo: boardNo,
            memberNo: loginMemberNo
        })
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) {
                alert("✅ 댓글이 성공적으로 등록되었습니다!");
                commentContent.value = "";
                selectCommentList();
            } else {
                alert("⚠️ 댓글 등록에 실패했습니다. 다시 시도해주세요.");
            }
        })
        .catch(err => {
            console.error("❌ 댓글 등록 중 오류 발생: ", err);
            alert("🚨 서버 오류로 인해 댓글을 등록할 수 없습니다.");
        });
});

// 댓글 삭제
function deleteComment(commentNo) {
    if (!confirm("정말로 삭제 하시겠습니까?")) return;

    fetch(`/comment/${commentNo}`, { method: "DELETE" })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) {
                alert("✅ 댓글이 삭제되었습니다!");
                document.querySelector(`li[data-comment-no='${commentNo}']`)?.remove();
            } else {
                alert("⚠️ 댓글 삭제에 실패했습니다.");
            }
        })
        .catch(err => {
            console.error("❌ 댓글 삭제 중 오류 발생: ", err);
            alert("🚨 서버 오류로 인해 댓글을 삭제할 수 없습니다.");
        });
}

// 댓글 수정 화면 전환
let beforeCommentRow;

function showUpdateComment(commentNo, btn) {
    const temp = document.querySelector(".update-textarea");

    if (temp) {
        if (!confirm("다른 댓글이 수정 중입니다. 현재 댓글을 수정 하시겠습니까?")) return;
        temp.parentElement.innerHTML = beforeCommentRow;
    }

    const commentRow = btn.parentElement.parentElement;
    beforeCommentRow = commentRow.innerHTML;

    let beforeContent = commentRow.children[1].innerHTML;

    commentRow.innerHTML = "";

    const textarea = document.createElement("textarea");
    textarea.classList.add("update-textarea");
    textarea.value = beforeContent;

    commentRow.append(textarea);

    const commentBtnArea = document.createElement("div");
    commentBtnArea.classList.add("comment-btn-area");

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "수정";
    updateBtn.onclick = () => updateComment(commentNo, updateBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.onclick = () => updateCancel(cancelBtn);

    commentBtnArea.append(updateBtn, cancelBtn);
    commentRow.append(commentBtnArea);
}

// 댓글 수정 취소
function updateCancel(btn) {
    if (confirm("댓글 수정을 취소하시겠습니까?")) {
        btn.parentElement.parentElement.innerHTML = beforeCommentRow;
    }
}

// 댓글 수정
function updateComment(commentNo, btn) {
    const commentContent = btn.parentElement.previousElementSibling.value;

    fetch("/comment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentNo, commentContent })
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) {
                alert("✅ 댓글이 수정되었습니다.");
                selectCommentList();
            } else {
                alert("⚠️ 댓글 수정 실패");
            }
        })
        .catch(err => {
            console.error("❌ 댓글 수정 중 오류 발생: ", err);
            alert("🚨 서버 오류로 인해 댓글을 수정할 수 없습니다.");
        });
}

// 답글 작성
function showInsertComment(parentNo, btn) {
    const existingTextarea = document.querySelector(".commentInsertContent");

    if (existingTextarea) {
        if (!confirm("다른 답글을 작성 중입니다. 현재 댓글에 답글을 작성하시겠습니까?")) return;
        existingTextarea.nextElementSibling.remove();
        existingTextarea.remove();
    }

    const textarea = document.createElement("textarea");
    textarea.classList.add("commentInsertContent");
    btn.parentElement.after(textarea);

    const commentBtnArea = document.createElement("div");
    commentBtnArea.classList.add("comment-btn-area");

    const insertBtn = document.createElement("button");
    insertBtn.innerText = "등록";
    insertBtn.onclick = () => insertChildComment(parentNo, insertBtn);

    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "취소";
    cancelBtn.onclick = () => insertCancel(cancelBtn);

    commentBtnArea.append(insertBtn, cancelBtn);
    textarea.after(commentBtnArea);
}

// 답글 취소
function insertCancel(btn) {
    btn.parentElement.previousElementSibling.remove();
    btn.parentElement.remove();
}

// 답글 등록
function insertChildComment(parentNo, btn) {
    const commentContent = btn.parentElement.previousElementSibling.value;

    fetch("/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentContent, boardNo, memberNo: loginMemberNo, parentNo })
    })
        .then(resp => resp.text())
        .then(result => {
            if (result > 0) {
                alert("✅ 답글이 등록되었습니다.");
                selectCommentList();
            } else {
                alert("⚠️ 답글 등록에 실패했습니다.");
            }
        })
        .catch(err => console.error("❌ 답글 등록 오류: ", err));
}
const decodeHtml = (html) => {
    let textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
};

beforeContent = decodeHtml(beforeContent);
