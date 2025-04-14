const fileBox = document.getElementById("file-box");
const fileInput = document.getElementById("file-add-input");

// 드래그한 파일이 영역 위에 올라왔을 때
fileBox.addEventListener("dragover", (event) => {
    event.preventDefault(); //브라우저에 파일 뜨는거 막기
    fileBox.style.border = "2px dashed #007bff"; 
});

// 드래그한 파일이 영역을 벗어났을 때
fileBox.addEventListener("dragleave", () => {
    fileBox.style.border = "2px dashed #d9d9d9"; 
});

// 파일을 드롭했을 때
fileBox.addEventListener("drop", (event) => {
    event.preventDefault(); 
    fileBox.style.border = "2px dashed #d9d9d9"; // 원래 스타일로 변경

    if (event.dataTransfer.files.length > 0) {
        fileInput.files = event.dataTransfer.files; // input에 파일 추가
        fileBox.innerHTML = `<span id="file-add">${event.dataTransfer.files[0].name}</span>`; // 파일명 표시
    }
});

// 클릭해서 파일 선택 시 파일명 업데이트
fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        fileBox.innerHTML = `<span id="file-add">${fileInput.files[0].name}</span>`; // 파일명 표시
    }
});
