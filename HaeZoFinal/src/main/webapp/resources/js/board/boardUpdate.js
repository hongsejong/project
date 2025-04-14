console.log("boardUpdate");

document.addEventListener("DOMContentLoaded", () => {
    const editor = new toastui.Editor({
        el: document.querySelector('#toastEditor'),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        initialValue: boardContentMarkdown,

        // 실시간 이미지 업로드(서버) 후크(hooks) 추가
        hooks: {
            addImageBlobHook: function (blob, callback) {
                const formData = new FormData();
                formData.append("image", blob);

                // 이미지 업로드 요청
                fetch('/board/uploadImage', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    const imageUrl = data.url;
                    const originalFileName = data.originalFileName;

                    callback(imageUrl, originalFileName);

                    // 에디터에 추가된 이미지 태그에 data-filename 추가
                    setTimeout(() => {
                        const editorContent = editor.getHTML();
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(editorContent, 'text/html');
                        const imgs = doc.querySelectorAll('img');
                        imgs.forEach(img => {
                            if (img.src === imageUrl && !img.getAttribute('data-filename')) {
                                img.setAttribute('data-filename', originalFileName);
                                editor.setHTML(doc.body.innerHTML);
                            }
                        });
                    }, 100);
                })
                .catch(err => {
                    console.error("이미지 업로드 실패:", err);
                    alert("이미지 업로드 중 오류가 발생했습니다.");
                });
            }
        }
    });

    // 게시글 수정
    const boardUpdateFrm = document.getElementById("boardUpdateFrm");

    boardUpdateFrm.addEventListener("submit", e => {
        e.preventDefault();

        const boardTitle = document.querySelector("[name='boardTitle']").value.trim();
        const boardContentHtml = editor.getHTML();

        if(boardTitle === "") {
            alert("제목을 입력하세요.");
            return;
        }
        if(editor.getMarkdown().trim() === "") {
            alert("내용을 입력하세요.");
            return;
        }

        const formData = new FormData();
        formData.append("boardTitle", boardTitle);
        formData.append("boardContentHtml", boardContentHtml);

        fetch('/board/' + boardCode + '/' + boardNo + '/updateContent', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then(result => {
            if(result > 0) {
                alert("게시글이 수정되었습니다.");
                location.href = "/board/" + boardCode + "/" + boardNo;
            } else {
                alert("게시글 수정 실패");
            }
        })
        .catch(err => {
            alert("게시글 수정 중 오류가 발생했습니다.");
            console.error(err);
        });
    });
});
