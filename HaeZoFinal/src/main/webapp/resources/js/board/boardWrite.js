console.log("boardWrite.js loaded");

// DOMContentLoaded 이벤트 내에서 에디터와 폼 이벤트 핸들러를 설정
document.addEventListener("DOMContentLoaded", function() {
    // Toast UI Editor 초기화
    const editor = new toastui.Editor({
        el: document.querySelector('#toastEditor'),
        height: '700px',
        initialEditType: 'WYSIWYG',
        previewStyle: 'vertical',
        hooks: {
            // 등록된 이미지 미리 서버에 저장
            addImageBlobHook: (blob, callback) => {
                const formData = new FormData();
                formData.append("image", blob);

                fetch('/board/uploadImage', {
                    method: 'POST',
                    body: formData
                })
                .then(resp => resp.json())
                .then(data => {
                    const imageUrl = data.url;
                    const originalFileName = data.originalFileName;
                    callback(imageUrl, originalFileName);

                    // 에디터 이미지에 data-filename 설정
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
                    alert("이미지 업로드 중 오류가 발생했습니다.");
                    console.error(err);
                });
            }
        }
    });

    // 게시글 등록 비동기
    const boardWriteFrm = document.getElementById("boardWriteFrm");

    boardWriteFrm.addEventListener("submit", e => {
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
        formData.append("boardContent", boardContentHtml);

        fetch('/board/' + boardCode + '/insertContent', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(boardNo => {
            if(boardNo > 0) {
                alert("게시글이 등록되었습니다.");
                location.href = "/board/"+ boardCode + "/" + boardNo;
            } else {
                alert("게시글 등록 실패");
            }
        })
        .catch(err => {
            alert("게시글 등록 중 오류가 발생했습니다.");
            console.error(err);
        });
    });

});
