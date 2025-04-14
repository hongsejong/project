console.log("requestBoardWriter.js");

const requestUpdateBtn = document.getElementById('requestUpdateBtn');
const requestUpdateBtnModal = document.getElementById('requestUpdateBtnModal');
const requestNoUpdateBtnModal = document.getElementById('requestNoUpdateBtnModal');
const requestBoardUpdateForm = document.getElementById("requestBoardUpdateForm");

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

// 시도 불러오기 및 선택값 설정
// === 변수 선언 ===
const regionSidoSelect = document.getElementById('regionSido');
const regionSigunguSelect = document.getElementById('regionSigungu');
const hiddenRegionSido = document.getElementById('hiddenRegionSido');
const hiddenRegionSigungu = document.getElementById('hiddenRegionSigungu');

// === 초기 로딩 함수 ===
function loadInitialRegion() {
    fetch('/requestBoard/region/sido')
    .then(res => res.json())
    .then(sidoList => {
        // 기본 옵션 먼저 추가
        regionSidoSelect.innerHTML = '<option value="">시/도 선택</option>';

        let selectedSidoCode = "";

        sidoList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.cd;
        option.textContent = item.name;
        regionSidoSelect.appendChild(option);

        if (item.name === locationParts1) {
            selectedSidoCode = item.cd;
            regionSidoSelect.value = item.cd;
            hiddenRegionSido.value = item.name;
        }
        });

        if (!selectedSidoCode) return;

        return fetch(`/requestBoard/region/sigungu?cd=${selectedSidoCode}`);
    })
    .then(res => res?.json())
    .then(sigunguList => {
        if (!sigunguList) return;

        regionSigunguSelect.innerHTML = '<option value="">시/군/구 선택</option>';

        sigunguList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.cd;
        option.textContent = item.name;
        regionSigunguSelect.appendChild(option);

        if (item.name === locationParts2) {
            regionSigunguSelect.value = item.cd;
            hiddenRegionSigungu.value = item.name;
        }
        });
    });


}

// === 시군구 불러오는 함수 ===
function loadSigunguList(sidoCode, selectedSigunguText = "") {
    fetch(`/requestBoard/region/sigungu?cd=${sidoCode}`)
        .then(res => res.json())
        .then(sigunguList => {
            regionSigunguSelect.innerHTML = '<option value="">시/군/구 선택</option>';
            let matchedCode = '';

            sigunguList.forEach(item => {
                const option = document.createElement('option');
                option.value = item.cd;
                option.textContent = item.name;
                regionSigunguSelect.appendChild(option);

                if (item.name === selectedSigunguText) {
                    matchedCode = item.cd;
                }
            });

            if (matchedCode) {
                regionSigunguSelect.value = matchedCode;
                hiddenRegionSigungu.value = selectedSigunguText;
            }
        });
}

// === 시도 변경 시 동작 ===
regionSidoSelect.addEventListener('change', function () {
    const sidoCode = this.value;
    hiddenRegionSido.value = this.options[this.selectedIndex].text;

    regionSigunguSelect.innerHTML = '<option value="">시/군/구 선택</option>';
    hiddenRegionSigungu.value = "";

    if (!sidoCode) return;

    fetch(`/requestBoard/region/sigungu?cd=${sidoCode}`)
    .then(res => res.json())
    .then(sigunguList => {
        sigunguList.forEach(item => {
        const option = document.createElement('option');
        option.value = item.cd;
        option.textContent = item.name;
        regionSigunguSelect.appendChild(option);
        });
    });
});

regionSigunguSelect.addEventListener('change', function () {
    hiddenRegionSigungu.value = this.options[this.selectedIndex].text;
});

// === 로딩 시 최초 실행 ===
document.addEventListener("DOMContentLoaded", () => {
    loadInitialRegion();
});


// 의뢰 수정 시 제목, 내용 작성 여부 검사
requestUpdateBtn.addEventListener("click", e => {

    if (!checkValidate(e)) return false;

    modalOverlay11.style.display = 'flex';
    setTimeout(() => {
        modalOverlay11.style.opacity = '1';
        document.querySelector('.modal').style.transform = 'translateY(0)';
    }, 10);
})

// 모달창 
const modalOverlay11 = document.getElementById('modalOverlay11');
const closeModal11 = document.getElementById("closeModal11");
function closeModalAction11() {
    modalOverlay11.style.opacity = '0';
    document.getElementById('modalOverlay11').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay11.style.display = 'none';
    }, 300); 
}

closeModal11.addEventListener('click', closeModalAction11);
requestNoUpdateBtnModal.addEventListener('click', closeModalAction11);

requestUpdateBtnModal.addEventListener('click', () => {
    const agreeCheck3 = document.getElementById("agreeCheck3");
    console.log(agreeCheck3);             // 객체가 잘 잡히는지
    console.log(agreeCheck3.checked);     // 체크 상태가 실제 true로 나오는지
    if (!agreeCheck3.checked){
        alert("먼저 주의사항에 동의해주세요.");
        return
    };

    getMarkdownContent();
    // 폼 제출
    requestBoardUpdateForm.submit();
    closeModalAction();
});


function submitEditor() {
    document.getElementById('hiddenContent').value = editor.getHTML();

    return true; 
}


const boardTitle = document.getElementById("boardTitle");

boardTitle.addEventListener("input", e => {
    if (boardTitle.value.length > 20) {
        alert("제목은 20자 이내로 작성해 주세요.");
        boardTitle.value = boardTitle.value.slice(0, 20);
    }
});