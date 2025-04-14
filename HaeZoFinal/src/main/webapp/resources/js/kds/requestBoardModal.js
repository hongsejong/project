// 모달 선언부
const modalOverlay = document.getElementById('modalOverlay');
const modalOverlay2 = document.getElementById('modalOverlay2');
const modalOverlay3 = document.getElementById('modalOverlay3');
const modalOverlay4 = document.getElementById('modalOverlay4');
const modalOverlay5 = document.getElementById('modalOverlay5');
const modalOverlay6 = document.getElementById('modalOverlay6');


// 모달창 닫는 X버튼
const closeModal = document.getElementById('closeModal');
const closeModal2 = document.getElementById('closeModal2');
const closeModal3 = document.getElementById('closeModal3');
const closeModal4 = document.getElementById('closeModal4');
const closeModal5 = document.getElementById('closeModal5');
const closeModal6 = document.getElementById('closeModal6');



// 카테고리 접었다 펴기
const categoryPList = document.querySelectorAll(".categoryP");
categoryPList.forEach(categoryP => {
    categoryP.addEventListener("click", () => {
        const parent = categoryP.parentElement;
        const labels = parent.querySelectorAll("label");

        labels.forEach(label => {
        // 라벨 토글
        label.style.display = (label.style.display === "none" || !label.style.display) ? "flex" : "none";
        });
    });
});


// 별점
const rating = document.getElementById("rating");
const stars = rating.querySelectorAll(".star");
let selectedRating = 0;

stars.forEach((star, index) => {
    star.addEventListener("mousemove", (e) => {
        const { left, width } = star.getBoundingClientRect();
        const percent = (e.clientX - left) / width;
        const isHalf = percent < 0.5;
        updateDisplay(index, isHalf);
    });

    star.addEventListener("mouseleave", () => {
        updateDisplayByValue(selectedRating);
    });

    star.addEventListener("click", (e) => {
        const { left, width } = star.getBoundingClientRect();
        const percent = (e.clientX - left) / width;
        const value = index + (percent < 0.5 ? 0.5 : 1);
        selectedRating = value;
        document.getElementById("hiddenRating").value = value;
        console.log(value);
        
    });
});

function updateDisplay(index, isHalf) {
    stars.forEach((star, i) => {
        star.classList.remove("full", "half");
        if (i < index) star.classList.add("full");
        else if (i === index) star.classList.add(isHalf ? "half" : "full");
    });
}

function updateDisplayByValue(value) {
    stars.forEach((star, i) => {
        star.classList.remove("full", "half");
        const starValue = i + 1;
        if (value >= starValue) {
        star.classList.add("full");
        } else if (value === starValue - 0.5) {
        star.classList.add("half");
        }
    });
}

// 조력자 상세보기
const supporterDetail = document.querySelector(".supporter-detail");
const supporterDetail2 = document.querySelector(".supporter-detail2");
const SupporterMemberNo = acceptRequestSupMemberNo;

if (supporterDetail != null ){

    supporterDetail.addEventListener("click", e=>{
    
        const supporter = document.querySelector('.supporter-card');
        const memberNo = supporter.dataset.memberno;
        console.log(memberNo);
    
        const url = `/myPage/viewPopUp?memNo=${memberNo}&bCode=3`;
        openPopup(url, "popUp", "width=640,height=1200,top=200,left=620"); // 공통 함수 호출
    
    });
}

if (supporterDetail2 != null) {

    supporterDetail2.addEventListener("click", e=>{
    
        console.log(SupporterMemberNo);
    
        const url = `/myPage/viewPopUp?memNo=${SupporterMemberNo}&bCode=3`;
        openPopup(url, "popUp", "width=640,height=1200,top=200,left=620"); // 공통 함수 호출
    
    });
}

// 리뷰 제출
document.getElementById("requestReviewConfirm").addEventListener("click", () => {
    const reviewText = document.getElementById("requestReviewText").value.trim();
    const selectedRadio = document.querySelector(".rating input[type='radio']:checked");

    // 1. 유효성 검사
    if (!reviewText) {
        alert("리뷰 내용을 입력해주세요.");
        return;
    }

    if (reviewText.length > 100) {
        alert("리뷰는 100자 이내로 작성해주세요.");
        return;
    }
    
    const rating = parseFloat(document.getElementById("hiddenRating").value);
    const parseModalBoardNo = parseFloat(modalBoardNo);
    console.log("rating : " + rating);
    console.log("parseModalBoardNo : " + parseModalBoardNo);
    console.log("reviewText : " + reviewText);
    

    // 2. 비동기 POST 요청
    fetch("/requestBoard/writeReview", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        content: reviewText,
        rating: rating,
        boardNo : modalBoardNo
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("서버 응답 오류");
        return res.text();
    })
    .then(result => {
        alert("리뷰가 성공적으로 등록되었습니다!");
        setTimeout(() => {
            modalOverlay14.style.display = 'none';
        }, 100); 
        location.reload(); 
    })
    .catch(err => {
        console.error(err);
        alert("리뷰 등록 중 오류가 발생했습니다.");
        setTimeout(() => {
        modalOverlay14.style.display = 'none';
    }, 100); 
    });
});




// 카테고리 모달
const categoryBtn = document.getElementById("categoryBtn");
const modalOverlay10 = document.getElementById("modalOverlay10");
const closeModal10 = document.getElementById("closeModal10");
const categoryNoConfirmBtn = document.getElementById("categoryNoConfirmBtn");
if (categoryBtn != null){

    categoryBtn.addEventListener("click", ()=>{
        modalOverlay10.style.display = 'flex';
        setTimeout(() => {
            modalOverlay10.style.opacity = '1';
            document.querySelector('.modal').style.transform = 'translateY(0)';
        }, 10);
    
    })
}

closeModal10.addEventListener("click", closeModalAction10);
categoryNoConfirmBtn.addEventListener("click", closeModalAction10);

function closeModalAction10(){
    modalOverlay10.style.opacity = '0';
    document.getElementById('modalOverlay10').style.transform = 'translateY(0)';
    setTimeout(() => {
        modalOverlay10.style.display = 'none';
    }, 300); 
}


// 체크박스 선택 하나만 될 수 있게
let checkCategory = "카테고리 선택";
let checkCategoryId;

const checkboxes = document.querySelectorAll('input[name="category"]');
const hiddenCategoryId = document.getElementById("hiddenCategoryId");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            // 선택된 경우 → 라벨 텍스트 저장
            checkCategory = this.parentElement.textContent.trim();
            checkCategoryId = this.value;
            // 다른 체크박스 해제
            checkboxes.forEach((other) => {
                if (other !== this) other.checked = false;
            });
            } else {
            // 선택 해제된 경우 → 모든 체크박스 체크 해제됐는지 확인
            // some : 조건에 하나라도 만족하는 요소가 있다면 true를 반환
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            if (!anyChecked) {
                checkCategory = "카테고리 선택";
                checkCategoryId = 0;
            }
        }

        console.log("현재 선택된 카테고리:", checkCategory);
    });
});

const categoryConfirmBtn = document.getElementById("categoryConfirmBtn");
// 카테고리 선택시 모달창 닫고 전송
categoryConfirmBtn.addEventListener("click", e=>{
    modalOverlay10.style.opacity = '0';
    document.getElementById('modalOverlay10').style.transform = 'translateY(0)';
    categoryBtn.innerText = checkCategory;
    hiddenCategoryId.value = checkCategoryId;
    setTimeout(() => {
        modalOverlay10.style.display = 'none';
    }, 300); 
});
