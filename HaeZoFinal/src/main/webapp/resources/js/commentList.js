

$(document).ready(function () {
    // 초기 화면 로드
    loadComments();

    // 댓글 등록 이벤트
    $("#submitComment").on("click", function () {
        let content = $("#commentContent").val();
        if (!content.trim()) return alert("댓글을 입력해주세요.");

        $.post("/thread/comment", { content: content, parentId: null }, function () {
            $("#commentContent").val(""); // 입력창 초기화
            loadComments(); // 댓글 다시 불러오기
        });
    });

    // 답글 버튼 클릭 이벤트
    $(document).on("click", ".reply-btn", function () {
        let parentId = $(this).closest(".comment-item").data("id");
        let replyContent = prompt("답글을 입력하세요:");
        if (replyContent) {
            $.post("/thread/comment", { parentId: parentId, content: replyContent }, function () {
                loadComments();
            });
        }
    });
});

// 댓글 불러오기 (DB에서 가져와 동적으로 렌더링)
function loadComments() {
    $.get("/thread/comments", function (data) {
        $("#commentList").empty(); // 기존 댓글 지우기

        data.forEach(comment => {
            let commentHtml = renderComment(comment);
            $("#commentList").append(commentHtml);
        });
    });
}

// 댓글을 HTML로 변환
function renderComment(comment) {
    let html = `
        <li class="comment-item depth-${comment.depth}" data-id="${comment.commentId}">
            <p>${comment.content} - <span>${comment.userId}</span></p>
            <button class="reply-btn">답글</button>
            <ul class="child-comments"></ul>
        </li>
    `;
    return html;
}