console.log("연결)")
// form의 submit 이벤트에 대해 처리합니다.
document.getElementById("inquiryForm").addEventListener("submit", function(event) {
    const titleInput = document.getElementById("inquiryTitle");
    const contentInput = document.getElementById("inquiryContent");

    // 제목이 비어있으면 경고창을 띄우고 포커스 처리
    if (!titleInput.value.trim()) {
        alert("제목을 입력해주세요");
        titleInput.focus();
        event.preventDefault();
        return;
    }
    // 내용이 비어있으면 경고창을 띄우고 포커스 처리
    if (!contentInput.value.trim()) {
        alert("내용을 입력해주세요");
        contentInput.focus();
        event.preventDefault();
        return;
    }
});


document.getElementById('singo-input').addEventListener('change', function(event) {
    const fileNameDisplay = document.getElementById('file-name');
    const files = event.target.files;
    
    if (files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name).join(', ');
        fileNameDisplay.textContent = fileNames;
    } else {
        fileNameDisplay.textContent = "선택된 파일 없음";
    }
});