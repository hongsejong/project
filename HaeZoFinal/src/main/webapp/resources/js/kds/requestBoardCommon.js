// 가격

const priceInput = document.getElementById('requestPrice');

if (priceInput != null) {

    priceInput.addEventListener('input', function () {
        // 숫자만 남기기
        let value = this.value.replace(/[^0-9]/g, '');
        if (value === '') {
        this.value = '';
        return;
        }
    
        // 1000만 원 초과 제한 (선택)
        if (parseInt(value) > 10000000) value = '10000000';
    
        // 콤마 포맷만 적용
        this.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    
    // 포커스 빠질 때 10원 단위 절삭
    priceInput.addEventListener('blur', function () {
        let value = this.value.replace(/[^0-9]/g, '');
        if (value === '') return;
    
        let numericValue = parseInt(value, 10);
    
        // 10원 단위 내림
        numericValue = Math.floor(numericValue / 10) * 10;
    
        // 콤마 재적용
        this.value = numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    
    // 제출 시 콤마 제거하고 전송하려면
    function getPurePriceValue() {
        return priceInput.value.replace(/[^0-9]/g, '');
    }
}




// 달력 선택
const requestDueDate = document.getElementById("requestDueDate");
if (requestDueDate != null) {
    flatpickr("#requestDueDate", {
        dateFormat: "Y-m-d",
        minDate: "today", // 오늘 이전 날짜 선택 불가
        locale: "ko" // 한글 적용!
    });

}

function checkValidate(e){
    const boardTitle = document.getElementById("boardTitle")
    if (boardTitle.value.trim() == ''){
        e.preventDefault();
        alert("제목을 입력하세요");
        boardTitle.focus();
        boardTitle.value = '';
        return false;
    }

    if (categoryBtn.innerText == "카테고리 선택") {
        e.preventDefault();
        alert("카테고리를 선택하세요.");
        categoryBtn.focus();
        return false;
    }
    const regionSido = document.getElementById("regionSido");
    const regionSigungu = document.getElementById("regionSigungu");

    if (regionSido.value === "sido" || regionSigungu.value === "sigungu" || regionSido.value === "" || regionSigungu.value === "") {
        e.preventDefault();
        alert("시/도와 시/군/구를 모두 선택해주세요.");
        regionSido.focus();
        return false;
    }

    const requestDueDateInput = document.getElementById("requestDueDate");
    if (requestDueDateInput.value.trim() === '') {
        e.preventDefault();
        alert("의뢰 기한을 선택해주세요.");
        requestDueDateInput.focus();
        return false;
    }

    const priceValue = requestPrice.value.replace(/[^0-9]/g, '');
    if (priceValue === '') {
        e.preventDefault();
        alert("의뢰 가격을 입력해주세요.");
        requestPrice.focus();
        return false;
    }
    if (parseInt(priceValue) > 10000000) {
        e.preventDefault();
        alert("최대 1,000만 원까지 입력 가능합니다.");
        requestPrice.focus();
        return false;
    }

    const requestContent = editor.getMarkdown().trim();
    if (requestContent === '') {
        alert("내용을 입력해주세요.");
        e.preventDefault();
        return false;
    }

    return true;
};




// 요청 주소에 'requestBoard'가 포함돼 있으면 카테고리 active 적용
const categoryLi = document.querySelectorAll(".categoryLi");
const categoryLiA = document.querySelectorAll(".categoryLi a");
const isRequestBoard = location.pathname.includes("/requestBoard");
const isCategoryZero = location.pathname.match(/\/requestBoard\/0/); // /requestBoard/0인 경우만 true

// 카테고리 번호가 0번이 아닌 경우에만 active 적용
if (isRequestBoard && !isCategoryZero) {
    const savedCategory = localStorage.getItem('activeCategory');
    if (savedCategory) {
        categoryLi.forEach((li, i) => {
        const categoryText = categoryLiA[i].textContent.trim();
        if (categoryText === savedCategory) {
            li.classList.add('active');
        }
        });
    }
    } else {
    // 메인 또는 전체 선택(카테고리 0)이면 초기화
    localStorage.removeItem('activeCategory');
    }


    document.addEventListener("DOMContentLoaded", ()=>{
        let categoryNo = categoryId;
        if (categoryNo >= 6 && categoryNo < 10 ) categoryNo = 1;
        if (categoryNo >= 10 && categoryNo < 13 ) categoryNo = 2;
        if (categoryNo >= 13 && categoryNo < 16 ) categoryNo = 3;
        if (categoryNo >= 16 && categoryNo < 20 ) categoryNo = 4;
        if (categoryNo == 20) categoryNo = 5;
        // console.log("현재 카테고리 아이디 : " + categoryNo);
        categoryLi.forEach(el => el.classList.remove('active'));
        if (categoryNo > 0) {
            categoryLi[categoryNo-1].classList.add('active');
            localStorage.setItem('activeCategory', categoryNo);
        }
    })

    // 카테고리 클릭 시 localStorage 저장 + 이동
    categoryLi.forEach((li, i) => {
    li.addEventListener('click', (e) => {
        e.preventDefault();

        categoryLi.forEach(el => el.classList.remove('active'));
        li.classList.add('active');

        const selectedCategory = categoryLiA[i].textContent.trim();
        localStorage.setItem('activeCategory', selectedCategory);

        location.href = categoryLiA[i].getAttribute("href");
    });
});


// 목록으로
const goToListBtn = document.getElementById("goToListBtn");
if (goToListBtn != null){

    goToListBtn.addEventListener("click", () => {
        
        // URL 내장 객체 : 주소 관련 정보를 나타내는 객체
        // URL.searchParams : 쿼리스트링만 별도 객체로 반환
        const params = new URL(location.href).searchParams;
        
        let url;
    
        if (params.get("key" == 'all')) { // 통합 검색인 경우
            url = '/requestBoard/search';
        } else {
            url = '/requestBoard/' + categoryId;
        }
        
        location.href = url+location.search;
                                // 쿼리스트링만 반환
    });
}


// Toast UI Editor에서 마크다운 내용 가져오기 → hidden input에 넣기
function getMarkdownContent(){

    const editorContent = editor.getHTML();
    document.getElementById("hiddenContent").value = editorContent;
    
    // DOMParser로 이미지 URL만 가져오기
    function extractThumbnail(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
    
        const firstImage = doc.querySelector('img');
        return firstImage ? firstImage.src : '/resources/images/kds/Logo.WebP';
        
    }
    
    const thumbnailUrl = extractThumbnail(editorContent);
    const hiddenThumbnailUrl = document.getElementById("hiddenThumbnailUrl");
    hiddenThumbnailUrl.value = thumbnailUrl.replace("http://localhost", "");
    
    const priceInput = document.getElementById('requestPrice');
    
    priceInput.value = priceInput.value.replace(/,/g, '');
}
