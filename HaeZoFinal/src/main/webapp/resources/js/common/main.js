console.log("main.js"); 

/* 캐러셀 슬라이드 구현 */
// 현재 인덱스 초기화
let currentIndex = 0; // 현재 슬라이드의 인덱스를 나타내는 변수

// 요소 선택
const reviewArea = document.getElementById('reviewArea');
const reviewAvatars = document.getElementsByClassName("review-avatar");
const reviewCards = document.querySelectorAll('.review-card'); 
const profileImages = document.querySelectorAll('.profileImg');
const carouselBtnLeft = document.getElementById('carouselBtnLeft');
const carouselBtnRight = document.getElementById('carouselBtnRight'); 

// 총 리뷰 카드 개수
const totalCards = reviewCards.length; 

// 슬라이드 너비 계산
const slideWidth = reviewCards[0].offsetWidth + 20; // 슬라이드의 너비와 margin의 합계

/* // 각 프로필 이미지에 데이터 속성으로 인덱스 추가
profileImages.forEach((img, index) => {
    img.dataset.index = (3 + index) % totalCards;
    // 첫 번째 요소의 data-index 값을 "1"로 설정하고 나머지 요소를 순차적으로 설정
    // -> 캐러셀 프로필 이미지의 정 가운데 요소의 data-index 값은 0이 됨.
}); */

// DOMContentLoaded 이벤트 리스너를 사용하여 페이지 로드 후 초기화 함수 init을 호출
document.addEventListener('DOMContentLoaded', function() {
    init(); // 초기화 함수 init을 호출
});

// 캐러셀을 초기 위치로 설정하고 moveCarousel(0)을 호출하여 첫 번째 슬라이드를 표시. & 별점 업데이트를 위해 updateStars() 함수를 호출
function init() {
    moveCarousel(0); // 슬라이드 인덱스를 조정하고, 리뷰 영역을 이동시키며 프로필 이미지를 업데이트. & 별점 업데이트를 위해 updateStars()를 호출
    shiftImagesBackward(); // 프로필 이미지를 뒤로 2칸 이동
    updateStars(); // 각 리뷰 카드의 별점을 동적으로 설정
}

// 캐러셀 이동 함수
function moveCarousel(index) {
    // 인덱스가 범위를 벗어나지 않도록 조정
    if (index < 0) {
        currentIndex = totalCards - 1; // 인덱스가 0보다 작으면 마지막 슬라이드로 이동
    } else if (index >= totalCards) {
        currentIndex = 0; // 인덱스가 총 카드 수를 초과하면 첫 번째 슬라이드로 이동
    } else {
        currentIndex = index; // 유효한 인덱스 값으로 현재 인덱스 설정
    }
    // 리뷰 영역 이동
    reviewArea.style.transform = `translateX(-${currentIndex * slideWidth}px)`; 

    // 프로필 이미지 업데이트
    updateProfileImages(); // 현재 인덱스에 맞는 프로필 이미지 업데이트

    // 별점 업데이트
    updateStars();
}

// 별점 업데이트
function updateStars() {
    // .reviewStar 클래스가 적용된 모든 요소를 선택하여 배열로 반환
    const starsContainers = document.querySelectorAll('.reviewStar');
    // starsContainers가 비어 있지 않은 경우 실행
    if (starsContainers != null) {
        // 각 reviewStar 컨테이너를 반복 처리
        starsContainers.forEach((container, index) => {
            // 각 컨테이너 내의 star 클래스를 가진 요소들을 선택하여 배열로 반환
            const stars = container.querySelectorAll('.star');
            // reviewRatings 배열에서 현재 인덱스에 해당하는 리뷰 평점을 가져옴
            const reviewRating = reviewRatings[index];
            // 각 star 요소를 반복 처리
            for (let i = 0; i < stars.length; i++) {
                // 별의 인덱스가 리뷰 평점의 정수 부분보다 작은 경우 full 클래스를 추가하여 별을 채움
                if (i < Math.floor(reviewRating)) {
                    stars[i].classList.add('full');
                // 별의 인덱스가 리뷰 평점의 정수 부분과 같고, 리뷰 평점이 정수가 아닌 경우 half 클래스를 추가하여 반별을 채움
                } else if (i === Math.floor(reviewRating) && reviewRating % 1 !== 0) {
                    stars[i].classList.add('half');
                }
            }
        });
    }
}

// 각 프로필 이미지를 뒤로 2칸 이동시키는 함수
function shiftImagesBackward() {
    // profileImages는 NodeList 이므로 배열로 변환
    const profileImagesArray = Array.from(profileImages);

    // 뒤로 2칸 이동된 배열 생성
    const shiftedImages = [...profileImagesArray.slice(-2), ...profileImagesArray.slice(0, -2)];

    // 프로필 이미지 순서를 변경하고 data-index 값을 올바르게 설정
    shiftedImages.forEach((img, index) => {
        // 이동된 순서대로 DOM을 갱신하고 data-index 값을 설정
        reviewAvatars[index].appendChild(img);  // avatarArea 요소 순서대로 추가

        // 각 이미지의 data-index 값을 올바르게 설정
        img.dataset.index = (3 + index) % totalCards; // 인덱스 값을 새로 설정
    });

    // 프로필 이미지 업데이트 (현재 위치에 맞게 opacity 조정)
    updateProfileImages();
}

// 프로필 이미지 업데이트
function updateProfileImages() {
    // 프로필 이미지들에 대해 opacity를 업데이트
    profileImages.forEach((img) => {
        const index = parseInt(img.dataset.index, 10); // data-index 값을 가져와 정수로 변환
        if (index === currentIndex) {
            img.style.opacity = 1; // 현재 슬라이드에 맞는 프로필 이미지 선명하게 표시
        } else {
            img.style.opacity = 0.3; // 나머지 프로필 이미지 흐릿하게 표시
        }
    });
}

// 좌우 버튼 클릭 이벤트 핸들러
carouselBtnLeft.addEventListener('click', () => {
    moveCarousel(currentIndex - 1); // 왼쪽 버튼 클릭 시 이전 슬라이드로 이동
});

carouselBtnRight.addEventListener('click', () => {
    moveCarousel(currentIndex + 1); // 오른쪽 버튼 클릭 시 다음 슬라이드로 이동
});

//---------------------------------------------------------------------------------

// 프로필 이미지 클릭 시 마이페이지 팝업창 띄우기
const supporterProfileImgsP = document.querySelectorAll('.supporterProfileImgP');
const supporterProfileImgsT = document.querySelectorAll('.supporterProfileImgT');
const profileImgs1 = document.querySelectorAll('.profileImg');
//const profileImgs2 = document.querySelectorAll('#profileImg');

let currentPopUp; // 현재 열려 있는 팝업창을 저장할 변수

// 클릭 이벤트 핸들러 통합 함수
function addClickListenerForProfileImages(imgElements, memberNos, freeBoardCode, checkIndex = false) {
    for(let i=0; i<imgElements.length; i++){
        imgElements[i].addEventListener('click', (event) => {
            event.preventDefault(); // 기본 동작(페이지 이동, 리로드) 방지
            if (checkIndex) {
                const clickedIndex = parseInt(event.target.dataset.index, 10); // 클릭한 이미지의 인덱스 가져오기
                if (clickedIndex !== currentIndex) {
                    return; // 클릭한 이미지의 인덱스가 현재 인덱스와 일치하지 않는 경우, 함수 종료
                }
            }
            showPopUp(memberNos[i],freeBoardCode);
        });
    }
}

// 전체 기능
if(supporterProfileImgsP.length > 0 || profileImgs1.length > 0 || supporterProfileImgsT.length > 0){
    (function(){
        addClickListenerForProfileImages(profileImgs1, reviewMemNos, freeBoardCode, true); // 캐러셀의 프로필 이미지 (인덱스 확인 필요)
        //addClickListenerForProfileImages(profileImgs2, popBoardMemNos, freeBoardCode); // 자유 게시판 게시글(인기) 프로필 이미지
        addClickListenerForProfileImages(supporterProfileImgsP, popularSupporterMemNos, freeBoardCode); // 인기 조력자 프로필 이미지
        addClickListenerForProfileImages(supporterProfileImgsT, topSupporterMemNos, freeBoardCode); // 조력자 랭킹 프로필 이미지
    })();
}

let lastValidMemberNo = null; // 마지막으로 유효했던 memberNo 저장

// 프로필 이미지 클릭 시 팝업창 띄우기 작동 함수
function showPopUp(memberNo, freeBoardCode) {
    // memberNo가 undefined이면 마지막 유효한 값 사용
    if (!memberNo && lastValidMemberNo) {
        console.warn("memberNo가 undefined이므로 이전 값을 사용:", lastValidMemberNo);
        memberNo = lastValidMemberNo;
    } else if (memberNo) {
        lastValidMemberNo = memberNo; // 새로운 유효한 값 업데이트
    }
    // boardCode가 undefined이면 마지막 유효한 값 사용
    if (!freeBoardCode && lastValidBoardCode) {
        console.warn("boardCode가 undefined이므로 이전 값을 사용:", lastValidBoardCode);
        freeBoardCode = lastValidBoardCode;
    } else if (freeBoardCode) {
        lastValidBoardCode = freeBoardCode; // 새로운 유효한 값 업데이트
    }

    if (!memberNo) {
        console.error("memberNo : undefined");
        return;
    }
    if (!freeBoardCode) {
        console.error("freeBoardCode : undefined");
        return;
    }
    
    // 새로운 팝업창 열기
    const url = `/myPage/viewPopUp?memNo=${memberNo}&bCode=${freeBoardCode}`;
    openPopup(url, "popUp", "width=640,height=1200,top=200,left=620"); // 공통 함수 호출
}

/* ********************************************************************************* */

// 조력자 별점 화면 표시
// 별점 업데이트
// .reviewStar 클래스가 적용된 모든 요소를 선택하여 배열로 반환
const supporterStarsContainers = document.querySelectorAll('.supporterStars-area');
// starsContainers가 비어 있지 않은 경우 실행
if (supporterStarsContainers.length > 0) {
    (function() {
        function updateSupporterStars() {
            // 각 reviewStar 컨테이너를 반복 처리
            supporterStarsContainers.forEach((container, index) => {
                // 각 컨테이너 내의 star 클래스를 가진 요소들을 선택하여 배열로 반환
                const supporterStars = container.querySelectorAll('.supporterStar');
                // reviewRatings 배열에서 현재 인덱스에 해당하는 리뷰 평점을 가져옴
                const supporterRating = supporterRatings[index];
                // 각 star 요소를 반복 처리
                for (let i = 0; i < supporterStars.length; i++) {
                    // 별의 인덱스가 리뷰 평점의 정수 부분보다 작은 경우 full 클래스를 추가하여 별을 채움
                    if (i < Math.floor(supporterRating)) {
                        supporterStars[i].classList.add('full');
                    // 별의 인덱스가 리뷰 평점의 정수 부분과 같고, 리뷰 평점이 정수가 아닌 경우 half 클래스를 추가하여 반별을 채움
                    } else if (i === Math.floor(supporterRating) && supporterRating % 1 !== 0) {
                        supporterStars[i].classList.add('half');
                    }
                }
            });
        }
        updateSupporterStars();
    })();
}

/* ********************************************************************************* */

/* 1) 최신 의뢰 게시글 목록 조회(카테고리별 ajax) */
const categoryItemsT = document.querySelectorAll('.category-itemT'); // 카테고리 목록
if(categoryItemsT.length >0){
    for(let categoryT of categoryItemsT){
        categoryT.addEventListener('click', function(){
            const categoryIndex = categoryT.dataset.index; // 카테고리 인덱스 가져오기
            fetch("/main/latestRequestList?categoryIndex=" + categoryIndex, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            .then(resp => resp.json())
            .then(requestList => {
                const cardContainer1 = document.getElementsByClassName("card-container-1")[0];
                const cardContainer2 = document.getElementsByClassName("card-container-2")[0];
                cardContainer1.innerHTML = "";
                cardContainer2.innerHTML = "";
                for(let i=0; i<requestList.length-1; i+=2){
                    const card = document.createElement("div");
                    card.classList.add("card");
                    const thumbnailImg = document.createElement("img");
                    thumbnailImg.classList.add("cardImg")
                    if(requestList[i].thumbnail == null){
                        thumbnailImg.setAttribute("src", "/resources/images/Logo.WebP");
                    } else{
                        thumbnailImg.setAttribute("src", `${requestList[i].thumbnail}`);
                    }
                    const cardTitle = document.createElement("p");
                    cardTitle.classList.add("card-title");
                    cardTitle.innerText = requestList[i].boardTitle; // 의뢰 게시글 제목
                    const requestPriceP = document.createElement("p");
                    const requestPriceSpan = document.createElement("span");
                    requestPriceSpan.innerText = requestList[i].requestPrice; // 의뢰 가격
                    requestPriceP.append(requestPriceSpan);
                    const memberNicknameP = document.createElement("p");
                    const memberNicknameSpan = document.createElement("span");
                    memberNicknameSpan.innerText = requestList[i].memberNickname; // 게시글 작성자 닉네임
                    memberNicknameP.append(memberNicknameSpan);
                    card.append(thumbnailImg, cardTitle, requestPriceP, memberNicknameP);
                    card.setAttribute("onclick", `location.href = "/requestBoard/${requestList[i].categoryId}/${requestList[i].boardNo}"`);
                    cardContainer1.append(card);
                }
                for(let i=1; i<requestList.length; i+=2){
                    const card = document.createElement("div");
                    card.classList.add("card");
                    const thumbnailImg = document.createElement("img");
                    thumbnailImg.classList.add("cardImg")
                    if(requestList[i].thumbnail == null){
                        thumbnailImg.setAttribute("src", "/resources/images/Logo.WebP");
                    } else{
                        thumbnailImg.setAttribute("src", `${requestList[i].thumbnail}`);
                    }
                    const cardTitle = document.createElement("p");
                    cardTitle.classList.add("card-title");
                    cardTitle.innerText = requestList[i].boardTitle;
                    const requestPriceP = document.createElement("p");
                    const requestPriceSpan = document.createElement("span");
                    requestPriceSpan.innerText = requestList[i].requestPrice;
                    requestPriceP.append(requestPriceSpan);
                    const memberNicknameP = document.createElement("p");
                    const memberNicknameSpan = document.createElement("span");
                    memberNicknameSpan.innerText = requestList[i].memberNickname;
                    memberNicknameP.append(memberNicknameSpan);
                    card.append(thumbnailImg, cardTitle, requestPriceP, memberNicknameP);
                    card.setAttribute("onclick", `location.href = "/requestBoard/${requestList[i].categoryId}/${requestList[i].boardNo}"`);
                    cardContainer2.append(card);
                }
            })
            .catch(err => console.log(err));
        });
    }
}

//---------------------------------------------------------------------------------

/* 2) 인기 조력자 목록 조회(카테고리별 ajax) */
const categoryItemsB = document.querySelectorAll('.category-itemB'); // 카테고리 목록
if(categoryItemsB.length >0){
    for(let categoryB of categoryItemsB){
        categoryB.addEventListener('click', () => {
            const categoryIndex = categoryB.dataset.index; // 카테고리 인덱스 가져오기
            fetch("/main/cgPopularSupporterList?categoryIndex=" + categoryIndex, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            .then(resp => resp.json())
            .then(supporterList => {
                console.log("supporterList: " + supporterList);
                if(supporterList.length > 0){
                    const supporterProfileArea = document.getElementsByClassName("supporterProfileArea")[0];
                    supporterProfileArea.innerHTML = "";
                    for(let supporter of supporterList){
                        const supporterCard = document.createElement("div");
                        supporterCard.classList.add("supporter-profile-card");
                        const imgContainer = document.createElement("div");
                        const supporterProfileImgP = document.createElement("img");
                        supporterProfileImgP.classList.add("supporterProfileImgP");
                        // memberNo 값을 data 속성으로 저장
                        supporterProfileImgP.dataset.memNo = supporter.memberNo;
                        // boardCode 값은 data 속성으로 저장
                        supporterProfileImgP.dataset.boardC = supporter.boardCode;
                        if(supporter.supporterProfile == null){
                            supporterProfileImgP.setAttribute("src", "/resources/images/user.png");
                        } else{
                            supporterProfileImgP.setAttribute("src", `${supporter.supporterProfile}`);
                        }
                        imgContainer.append(supporterProfileImgP);
                        const ratingContainer = document.createElement("div");
                        ratingContainer.classList.add("supporterStars-area");
                        for(let i=0; i<5; i++){
                            const ratingStar = document.createElement("i");
                            ratingStar.classList.add("supporterStar");
                            if (i < Math.floor(supporter.reviewRating)) {
                                // 별의 인덱스가 리뷰 평점의 정수 부분보다 작은 경우 full 클래스를 추가하여 별을 채움
                                ratingStar.classList.add('full');
                            } else if (i === Math.floor(supporter.reviewRating) && supporter.reviewRating % 1 !== 0) {
                                // 별의 인덱스가 리뷰 평점의 정수 부분과 같고, 리뷰 평점이 정수가 아닌 경우 half 클래스를 추가하여 반별을 채움
                                ratingStar.classList.add('half');
                            }
                            ratingContainer.append(ratingStar);
                        }
                        const supporterNickname = document.createElement("p");
                        supporterNickname.classList.add("supporterNickname");
                        supporterNickname.innerText = supporter.supporterNickname;
                        const supporterService = document.createElement("p");
                        supporterService.classList.add("supporterService");
                        supporterService.innerText = supporter.topChildCategory;
                        supporterCard.append(imgContainer, ratingContainer, supporterNickname, supporterService);
                        supporterProfileArea.append(supporterCard);
                    }
                } else{
                    const noSelect = document.createElement("p");
                    noSelect.classList.add("noSelect");
                    noSelect.innerText = "현재 해당 카테고리에 인기 조력자가 없습니다.."
                    supporterProfileArea.append(noSelect);
                }
            })
            .catch(err => console.log(err));
        });
    }
}

// 2-1) [이벤트 위임] 동적으로 추가된 supporterProfileImg 요소도 클릭 이벤트 감지 가능
document.querySelector('.supporterProfileArea').addEventListener('click', function (event) {
    const target = event.target.closest('.supporterProfileImgP'); // 클릭된 요소 찾기
    // 클릭된 요소가 supporterProfileImg 클래스를 가진 경우 팝업 띄우기
    if(!target) return;
    if (target.classList.contains('supporterProfileImgP')) {
        const memNo = event.target.dataset.memNo; // memberNo 가져오기
        const boardC = event.target.dataset.boardC; // boardCode 가져오기
        showPopUp(memNo,boardC); // 함수 호출 시 memberNo 전달
    }
});

// 의뢰 게시글 클릭 시 해당 게시글로 이동
const requestCards = document.getElementsByClassName("card");
if(requestCards.length > 0){
    for(let requestCard of requestCards){
        requestCard.addEventListener("click", e => {
            const card = e.target.closest(".card");
            if(card){
                location.href = "/requestBoard/" + card.dataset.categoryId + "/" + card.dataset.requestBoardNo;
            }
        })
    }
}

// 인기 게시글 클릭 시 해당 게시글로 이동
const popularContents = document.getElementsByClassName("popular-content-card");
if(popularContents.length > 0){
    for(let popularContent of popularContents){
        popularContent.addEventListener("click", e => {
            const card = e.target.closest(".popular-content-card");
            if(card){
                location.href = "/board/"+ freeBoardCode + "/" + card.dataset.boardNo
            }
        })
    }    
}