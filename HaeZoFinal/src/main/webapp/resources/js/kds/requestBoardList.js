console.log("requestBoardList.js");

// 지역, 카테고리 검색
const searchCategoryBtn = document.getElementById("searchCategoryBtn");
const searchCategoryUl = document.querySelector(".searchCategoryUl");
const searchCategoryLi = document.querySelectorAll(".searchCategoryUl>li");
const hiddenSearchCategory = document.getElementById("hiddenSearchCategory");
const radios = document.querySelectorAll('#searchCategoryUl > li > input[type="radio"]');

searchCategoryUl.style.display = "none";

// 검색 조건 창 열기
searchCategoryBtn.addEventListener("click", function(){
    searchCategoryUl.style.display = (searchCategoryUl.style.display === "block") ? "none" : "block";
});

// 검색 조건 목록
for (let i = 0; i < searchCategoryLi.length; i++) {
    searchCategoryLi[i].addEventListener("change", e=>{
        searchCategoryBtn.innerText = searchCategoryLi[i].innerText;
        hiddenSearchCategory.value = radios[i].value;
    })
}

// 검색 조건 창 바깥 클릭 시 카테고리 숨김
document.addEventListener('click', function(event) {
    const categoryBtn = document.getElementById("searchCategoryBtn");
    const categoryBox = document.querySelector(".searchCategoryUl");

    // 버튼 또는 카테고리 박스 내부 클릭이면 무시
    if (categoryBtn.contains(event.target) || categoryBox.contains(event.target)) {
        return;
    }
    categoryBox.style.display = "none";
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



const requestBoardItem = document.getElementsByClassName("requestBoardItem");
const requestBtn = document.getElementById("requestBtn");



    
// 의뢰 클릭 시 상세조회화면
for (let requestBoard of requestBoardItem) {
    requestBoard.addEventListener("click", ()=>{
        location.href='/requestBoard/'+
        requestBoard.getAttribute("categoryId")+"/"+
        requestBoard.getAttribute("boardNo")+"?cp="+cp;
    })
}

// 글쓰기 버튼 클릭 시
if(requestBtn!= null) {
    requestBtn.addEventListener("click", () => {
    // JS BOM 객체 중 location
    location.href = `/requestBoard2/${categoryId}/insert`;
    })
}


// 가격 최소 최대금액
const priceInputArr = document.querySelectorAll('.priceInput');

for (let priceInput of priceInputArr) {
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
}

for (let priceInput of priceInputArr) {
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
}

const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");
const hiddenMinPrice = document.getElementById("hiddenMinPrice");
const hiddenMaxPrice = document.getElementById("hiddenMaxPrice");
// 제출 시 콤마 제거하고 전송, 최소 금액과 최대 금액 비교
function getPurePriceValue() {
    let pureValue1 = minPriceInput.value.replace(/[^0-9]/g, '') || "0";
    let pureValue2 = maxPriceInput.value.replace(/[^0-9]/g, '') || "10000000";

    if (parseInt(pureValue1) > parseInt(pureValue2)) {
        alert("최소 금액이 최대 금액보다 큽니다.");
        minPriceInput.value = '';
        maxPriceInput.value = '';
        hiddenMinPrice.value = "0";
        hiddenMaxPrice.value = "10000000";
        return false;
    }

    // hidden 필드에 값 세팅
    hiddenMinPrice.value = pureValue1;
    hiddenMaxPrice.value = pureValue2;
    return true;
}



// 검색창에 이전 검색 기록 남기기
const query = document.getElementById("query");

(()=>{

    for (let radio of radios) {
        if (radio.value === searchCategory) {
            radio.checked = true;

            // 라벨을 버튼 텍스트로 사용
            const label = document.querySelector(`label[for="${radio.id}"]`);
            if (label) {
                searchCategoryBtn.innerText = label.innerText;
            }
            break;
        }
    }

    // 검색어 화면에 출력
    if (querySearch) {
        query.value = querySearch;
    }

})();


// 검색 유효성 검사
const searchForm = document.getElementById("searchForm");
document.addEventListener("DOMContentLoaded", () => {
    
    hiddenCategoryId.value = categoryId == "" ? 0 : categoryId;
    // form submit 이벤트도 이 안에서 바인딩
    searchForm.addEventListener("submit", e => {
        if (!getPurePriceValue()) {
            e.preventDefault();
            return false;
        }
    });


     // 선택된 라디오 값을 hidden 필드에 넣기
    const selectedRadio = document.querySelector('input[name="searchCategory"]:checked');
    if (selectedRadio) {
        hiddenSearchCategory.value = selectedRadio.value;
    }
    
});

