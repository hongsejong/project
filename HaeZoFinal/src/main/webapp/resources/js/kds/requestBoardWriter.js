console.log("requestBoardWriter.js");

const modalOverlay9 = document.getElementById('modalOverlay9');
const closeModal9 = document.getElementById('closeModal9');
const requestAddBtn = document.getElementById('requestAddBtn');
const requestNoAddBtn = document.getElementById('requestNoAddBtn');
const requestBtn = document.getElementById("requestBtn");
const requestBoardForm = document.getElementById("requestBoardForm");


// 토스트 에디터
const editor = new toastui.Editor({
    el: document.querySelector('#toastEditor'),
    height: '500px',
    initialEditType: 'WYSIWYG',
    previewStyle: 'vertical',
    hooks: {
        addImageBlobHook: (blob, callback) => {
        const formData = new FormData();
        formData.append('image', blob);

        fetch('/requestBoard2/uploadImage', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            callback(data.imageUrl, 'image alt text');
        });
        }
    }
});


// 시도 / 시군구
const regionSidoSelect = document.getElementById('regionSido');
const regionSigunguSelect = document.getElementById('regionSigungu');
const hiddenRegionSido = document.getElementById('hiddenRegionSido');
const hiddenRegionSigungu = document.getElementById('hiddenRegionSigungu');
regionSidoSelect.addEventListener('change', function () {
    hiddenRegionSido.value = this.options[this.selectedIndex].text; // 또는 this.value
});

regionSigunguSelect.addEventListener('change', function () {
    hiddenRegionSigungu.value = this.options[this.selectedIndex].text; 
});

 // 시도 불러오기
fetch('/requestBoard/region/sido')
.then(res => res.json())
.then(data => {
    const sidoSelect = document.getElementById('regionSido');
    data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.cd;
    option.textContent = item.name;
    sidoSelect.appendChild(option);
    });
});



// 시군구 연동
document.getElementById('regionSido').addEventListener('change', function () {
    const sidoCode = this.value;
    const sigunguSelect = document.getElementById('regionSigungu');
    
    // 기존 옵션 초기화
    sigunguSelect.innerHTML = '<option value="">시/군/구 선택</option>';
    
    // 선택 안했을 경우 종료
    if (!sidoCode) return;
    
    fetch('/requestBoard/region/sigungu?cd=' + sidoCode)
        .then(res => res.json())
        .then(data => {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.cd;
            option.textContent = item.name;
            sigunguSelect.appendChild(option);
        });
    });
});


// 게시글 등록 시 제목, 내용 작성 여부 검사
requestBtn.addEventListener("click", e => {

    if (!checkValidate(e)) return false;

    modalOverlay9.style.display = 'flex';
    setTimeout(() => {
        modalOverlay9.style.opacity = '1';
        document.querySelector('.modal').style.transform = 'translateY(0)';
    }, 10);
})


// 모달창 

function closeModalAction9() {
    modalOverlay9.style.opacity = '0';
    document.getElementById('modalOverlay9').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay9.style.display = 'none';
    }, 300); 
}

closeModal9.addEventListener('click', closeModalAction9);
requestNoAddBtn.addEventListener('click', closeModalAction9);

requestAddBtn.addEventListener('click', () => {
    const agreeCheck2 = document.getElementById("agreeCheck2");
    console.log(agreeCheck2);             // 객체가 잘 잡히는지
    console.log(agreeCheck2.checked);     // 체크 상태가 실제 true로 나오는지
    if (!agreeCheck2.checked){
        alert("먼저 주의사항에 동의해주세요.");
        return
    };
    
    // 토스트 에디터 콘텐츠 가져오기
    getMarkdownContent();
    
    // 폼 제출
    requestBoardForm.submit();
    closeModalAction9();
});


function submitEditor() {
    // 에디터 내용 → hidden input에 넣기
    document.getElementById('hiddenContent').value = editor.getHTML();
    return true; 
}


// 제목 입력 제한
const boardTitle = document.getElementById("boardTitle");

boardTitle.addEventListener("input", e => {
    if (boardTitle.value.length > 20) {
        alert("제목은 20자 이내로 작성해 주세요.");
        boardTitle.value = boardTitle.value.slice(0, 20);
    }
});
