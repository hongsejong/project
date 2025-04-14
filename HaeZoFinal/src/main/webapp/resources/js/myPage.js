console.log("myPage.js");
/*****************************************************************************************/
// 자기소개 수정 후 화면(ajax)
function viewSelfIntro(){
    fetch("/myPage/viewSelfIntro",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify({"memberNo" : loginMemberNoInMyPage})
    })
    .then(resp => resp.text())
    .then(selfIntroContent => {
        const selfProduceArea = document.getElementsByClassName("selfProduceArea")[0];
        selfProduceArea.innerHTML = "";
        const selfProduceContent = document.createElement("p");
        selfProduceContent.classList.add("selfProduce-content");
        selfProduceContent.innerText = selfIntroContent;
        const btnArea = document.createElement("div");
        const updateBtn2 = document.createElement("button");
        updateBtn2.classList.add("updateBtn2");
        updateBtn2.innerText = "자기소개 작성";
        updateBtn2.setAttribute("onclick", "showUpdateIntro(this)");
        btnArea.append(updateBtn2);
        selfProduceArea.append(selfProduceContent, btnArea);
    })
    .catch(err => console.log(err))
}

// 자기소개 작성 화면 전환
const updateBtn2 = document.getElementsByClassName("updateBtn2")[0];
let beforeSelfIntro; // 수정 전 원래 행의 상태를 저장할 변수
if(updateBtn2 != null){
    function showUpdateIntro(btn){
        // 자기소개 전체 영역 선택
        const introRow = btn.parentElement.parentElement;
        // 이전 내용 저장
        beforeSelfIntro = introRow.innerHTML;
        // 자기소개 작성 내용만 저장
        let beforeContent = introRow.children[0].innerHTML;
        // 자기소개 행 내부 내용 모두 삭제
        introRow.innerHTML = "";
        // textarea 요소 생성 + 클래스 추가
        const textarea = document.createElement("textarea");
        textarea.classList.add("updateSelfIntro");
        textarea.setAttribute("placeholder", "110자 이내로 입력해주세요.");
        textarea.setAttribute("maxlength", 110); // 글자수 제한
        /* XSS 방지 처리 해제 */
        beforeContent = beforeContent.replaceAll("&amp;", "&");
        beforeContent = beforeContent.replaceAll("&lt;", "<");
        beforeContent = beforeContent.replaceAll("&gt;", ">");
        beforeContent = beforeContent.replaceAll("&quot;", "\"");
        // 내용 추가
        textarea.value = beforeContent;
        // 생성된 textarea 추가
        introRow.append(textarea);
        // 버튼 영역 및 버튼 생성
        const btnArea = document.createElement("div");
        btnArea.classList.add("updateBtnArea");
        const completeBtn = document.createElement("button");
        completeBtn.innerText = "수정 완료";
        completeBtn.classList.add("updateBtn3");
        completeBtn.setAttribute("onclick", "updateSelfIntro(this)");
        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "수정 취소";
        cancelBtn.classList.add("updateBtn3");
        cancelBtn.setAttribute("onclick", "cancelUpdateSelfInto(this)");
        // 버튼 추가
        btnArea.append(completeBtn, cancelBtn);
        introRow.append(btnArea);
    }
}

// 자기소개 수정(ajax)
function updateSelfIntro(btn){
    // 수정한 자기소개 내용
    const selfIntroContent = btn.parentElement.previousElementSibling.value;
    if(selfIntroContent  != ""){
        fetch("/myPage/updateSelfIntro",{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body: JSON.stringify({"memberSelfIntro": selfIntroContent, "memberNo" : loginMemberNoInMyPage})
        })
        .then(resp => resp.text())
        .then(result => {
            if(result > 0){
                alert("자기소개가 수정되었습니다.");
                viewSelfIntro();
            } else{
                alert("자기소개 수정 실패.. 다시 시도해주세요..");
            }
        })
        .catch(err => console.log(err))
    } else{
        alert("자기소개 작성 후 클릭해주세요!");
        return;
    }
}

// 자기소개 수정 취소
function cancelUpdateSelfInto(btn){
    if(confirm("자기소개 수정을 취소하시겠습니까?")){
        btn.parentElement.parentElement.innerHTML = beforeSelfIntro;
    }
}
/*****************************************************************************************/
// 점수에 따른 별 생성 함수
// profileStar 클래스가 적용된 모든 요소를 선택하여 배열로 반환
const starsContainers = document.querySelectorAll('.profileStars');
// starsContainers가 비어 있지 않은 경우 실행
if (starsContainers.length > 0) {
    (function(){
        // 각 reviewStar 컨테이너를 반복 처리
        starsContainers.forEach((container) => {
            // 각 컨테이너 내의 profileStar 클래스를 가진 요소들을 선택하여 배열로 반환
            const stars = container.querySelectorAll('.profileStar');
            // 각 star 요소를 반복 처리
            for (let i=0; i<stars.length; i++) {
                // 별의 인덱스가 리뷰 평점의 정수 부분보다 작은 경우 full 클래스를 추가하여 별을 채움
                if (i < Math.floor(reviewRating)) {
                    stars[i].classList.add('full');
                // 별의 인덱스가 리뷰 평점의 정수 부분과 같고, 리뷰 평점이 정수가 아닌 경우 half 클래스를 추가하여 반별을 채움
                } else if (i === Math.floor(reviewRating) && reviewRating % 1 !== 0) {
                    stars[i].classList.add('half');
                } else{
                    stars[i].classList.add('empty');
                }
            }
        });
    })();
};
/*****************************************************************************************/
// 마이페이지 자유게시판 작성 글 클릭 시 브라우저에서 해당 페이지로 이동
const mainContent = document.querySelectorAll(".mainContent");
if(mainContent.length > 0){
    for (let content of mainContent) {
        content.addEventListener("click", e => {
            const newUrl = "/board/" + `${freeBoardCode}` + "/" + e.target.closest(".mainContent").dataset.freeboardNo;
            //클릭 이벤트를 처리하는 코드
            if (opener) {
                opener.location.replace(newUrl);  // 부모 창의 URL 변경
            } else {
                console.log('No opener found.');
            } 
            // 추가로 클릭 방지 (이벤트가 계속 발생하는 문제 해결)
            e.stopPropagation();  // 버블링 방지
        });
    }
}

// 게시글 목록 조회(ajax)
// 전달할 매개변수 : 회원 번호(일반 회원 or 로그인 회원 번호), 게시판 코드(3: 자유 게시판 or 5: 의뢰 게시판)
const contentMenus = document.getElementsByClassName("contentMenu");
if(contentMenus.length > 0){
    for(let i=0; i<contentMenus.length; i++){
        contentMenus[i].querySelector("span").addEventListener("click", () => {
            // 모든 span 요소에서 hover 클래스 제거
            for (let menu of contentMenus) {
                menu.querySelector("span").classList.remove("hover");
            }
            // 현재 클릭한 span 요소에 hover 클래스 추가
            contentMenus[i].querySelector("span").classList.add("hover");

            if(Number(loginMemberNoInMyPage) != Number(myPMemNo)){ // 다른 회원 게시글 조회인 경우
                if(contentMenus[i].dataset.myIndex == 0 || contentMenus[i].dataset.myIndex == 3){ // 자유게시판 코드인 경우(작성 게시글 || 좋아요 게시글)
                   if(contentMenus[i].dataset.myIndex == 0){ // 자유게시판 게시글 목록 조회
                        freeBoardList(myPMemNo, freeBoardCode);
                   } else{ // 좋아요 누른 자유게시판 게시글 목록 조회
                        freeBoardLikeList(myPMemNo, freeBoardCode);
                    }
                } else{ // 의뢰게시판 코드인 경우(요청 의뢰 || 처리 의뢰)
                    if(contentMenus[i].dataset.myIndex == 1){ // 요청한 의뢰게시판 게시글 목록 조회
                        RequestBoardListIsNotDone(myPMemNo, requestBoardCode);
                    } else{ // 처리한 의뢰게시판 게시글 목록 조회
                        RequestBoardListIsDone(myPMemNo, requestBoardCode);
                    }
                }
            } else{ // 로그인한 회원 게시글 조회인 경우
                if(contentMenus[i].dataset.myIndex == 0 || contentMenus[i].dataset.myIndex == 3){ // 자유게시판 코드인 경우(작성 게시글 || 좋아요 게시글)
                    if(contentMenus[i].dataset.myIndex == 0){ // 자유게시판 게시글 목록 조회
                        freeBoardList(loginMemberNoInMyPage, freeBoardCode);
                    } else{ // 좋아요 누른 자유게시판 게시글 목록 조회
                        freeBoardLikeList(loginMemberNoInMyPage ,freeBoardCode);
                    }
                 } else{ // 의뢰게시판 코드인 경우(요청 의뢰 || 처리 의뢰)
                    if(contentMenus[i].dataset.myIndex == 1){ // 요청한 의뢰게시판 게시글 목록 조회
                        RequestBoardListIsNotDone(loginMemberNoInMyPage, requestBoardCode);
                    } else{ // 처리한 의뢰게시판 게시글 목록 조회
                        RequestBoardListIsDone(loginMemberNoInMyPage, requestBoardCode);
                    }
                 }
            }
        });
    }
}

function freeBoardList(memberNo,freeBoardCode){ // 자유게시판 게시글 목록 조회(ajax)
    fetch("/myPage/FreeBoardList",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({"memberNo" : memberNo, "boardCode" : freeBoardCode})
    })
    .then(resp => resp.json())
    .then(freeBoardList => {
        const myPageProfileMain = document.getElementById("myPageProfileMain");
        myPageProfileMain.innerHTML = "";
        if(freeBoardList.length > 0){
            const containerHead = document.createElement("div");
            const mainTitle = document.createElement("p");
            mainTitle.classList.add("mainTitle");
            mainTitle.innerText = "작성한 게시글 "
            const span = document.createElement("span");
            span.innerText = "("+freeBoardList.length+")" + "개";
            mainTitle.append(span);
            const line = document.createElement("div");
            containerHead.append(mainTitle,line);
            myPageProfileMain.append(containerHead);
            for(let freeBoard of freeBoardList){
                const mainContent = document.createElement("div");
                mainContent.classList.add("mainContent");
                const mainContentTop = document.createElement("div");
                mainContentTop.classList.add("mainContent-top");
                const mainContentTopInner1 = document.createElement("div");
                const mainCTitle = document.createElement("p");
                mainCTitle.classList.add("mainC-Title")
                mainCTitle.innerText = freeBoard.boardTitle;

                // 동적으로 생성한 게시글 내용을 담은 viewer 요소
                const mainCContent = document.createElement("div");
                // freeBoard.boardContent 데이터를 data-content 속성에 저장
                mainCContent.classList.add("viewer");
                mainCContent.setAttribute("data-content", freeBoard.boardContent);
                // 생성된 요소 mainCContent에 적용(Toast API / 토스트 API)
                applyToastViewer(mainCContent);

                mainContentTopInner1.append(mainCTitle,mainCContent);
                const mainContentTopInner2 = document.createElement("div");
                const contentImg = document.createElement("img");
                contentImg.classList.add("contentImg");
                if(freeBoard.thumbnail && freeBoard.thumbnail != ""){
                    contentImg.setAttribute("src", `${freeBoard.thumbnail}`);
                } else{
                    contentImg.setAttribute("src", "/resources/images/Logo.WebP");
                }
                mainContentTopInner2.append(contentImg);
                mainContentTop.append(mainContentTopInner1,mainContentTopInner2);
                const mainContentBottom = document.createElement("div");
                mainContentBottom.classList.add("mainContent-bottom");
                const iconArea = document.createElement("div");
                iconArea.classList.add("icon-area");
                const viewIcon = document.createElement("i");
                viewIcon.classList.add("view-comment-icon");
                viewIcon.innerText = "👁‍🗨";
                const viewIconSpan = document.createElement("span");
                viewIconSpan.innerText = freeBoard.readCount;
                const commentIcon = document.createElement("i");
                commentIcon.classList.add("view-comment-icon");
                commentIcon.innerText = "💬";
                const commentIconSpan = document.createElement("span");
                commentIconSpan.innerText = freeBoard.commentCount;
                iconArea.append(viewIcon,viewIconSpan,commentIcon,commentIconSpan);
                const contentWriter = document.createElement("div");
                contentWriter.classList.add("content-writer");
                const spanMemberNickname = document.createElement("span");
                spanMemberNickname.innerText = freeBoard.memberNickname;
                const memberProfileImg = document.createElement("img");
                if(freeBoard.profileImage && freeBoard.profileImage != ""){
                    memberProfileImg.setAttribute("src", `${freeBoard.profileImage}`);
                } else{
                    memberProfileImg.setAttribute("src", "/resources/images/user.png");
                }
                contentWriter.append(spanMemberNickname,memberProfileImg);
                mainContentBottom.append(iconArea,contentWriter);
                mainContent.append(mainContentTop,mainContentBottom);
                const newUrl = `/board/${freeBoardCode}/${freeBoard.boardNo}`;
                // mainContent 요소에 onclick 이벤트를 setAttribute로 설정
                mainContent.setAttribute("onclick", `
                    if (opener) {
                        opener.location.replace('${newUrl}');  // 부모 창의 URL 변경
                    } else {
                        console.log('No opener found.');
                    }
                `);
                myPageProfileMain.append(mainContent);
            }
        } else{
            const notWrite = document.createElement("p");
            notWrite.classList.add("notWrite");
            notWrite.innerText = "현재 작성하신 게시글이 없습니다.. 게시글을 작성해주세요!"
            myPageProfileMain.append(notWrite);
        }

    })
    .catch(err => console.log("자유게시판 게시글 목록 조회 중 오류 발생:", err))
}

function freeBoardLikeList(memberNo,freeBoardCode){ // 좋아요 누른 자유게시판 게시글 목록 조회(ajax)
    fetch("/myPage/FreeBoardListLike",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({"memberNo" : memberNo, "boardCode" : freeBoardCode})
    })
    .then(resp => resp.json())
    .then(freeBoardLikeList => {
        const myPageProfileMain = document.getElementById("myPageProfileMain");
        myPageProfileMain.innerHTML = "";
        if(freeBoardLikeList.length > 0){
            const containerHead = document.createElement("div");
            const mainTitle = document.createElement("p");
            mainTitle.classList.add("mainTitle");
            mainTitle.innerText = "좋아요 게시글 "
            const span = document.createElement("span");
            span.innerText = "("+freeBoardLikeList.length+")" + "개";
            mainTitle.append(span);
            const line = document.createElement("div");
            containerHead.append(mainTitle,line);
            myPageProfileMain.append(containerHead);
            for(let freeBoardLike of freeBoardLikeList){
                const mainContent = document.createElement("div");
                mainContent.classList.add("mainContent");
                const mainContentTop = document.createElement("div");
                mainContentTop.classList.add("mainContent-top");
                const mainContentTopInner1 = document.createElement("div");
                const mainCTitle = document.createElement("p");
                mainCTitle.classList.add("mainC-Title")
                mainCTitle.innerText = freeBoardLike.boardTitle;

                // 동적으로 생성한 게시글 내용을 담은 viewer 요소
                const mainCContent = document.createElement("div");
                // freeBoard.boardContent 데이터를 data-content 속성에 저장
                mainCContent.classList.add("viewer");
                mainCContent.setAttribute("data-content", freeBoardLike.boardContent);
                // 생성된 요소 mainCContent에 적용(Toast API / 토스트 API)
                applyToastViewer(mainCContent);

                mainContentTopInner1.append(mainCTitle,mainCContent);
                const mainContentTopInner2 = document.createElement("div");
                const contentImg = document.createElement("img");
                contentImg.classList.add("contentImg");
                if(freeBoardLike.thumbnail && freeBoardLike.thumbnail != ""){
                    contentImg.setAttribute("src", `${freeBoardLike.thumbnail}`);
                } else{
                    contentImg.setAttribute("src", "/resources/images/Logo.WebP");
                }
                mainContentTopInner2.append(contentImg);
                mainContentTop.append(mainContentTopInner1,mainContentTopInner2);
                const mainContentBottom = document.createElement("div");
                mainContentBottom.classList.add("mainContent-bottom");
                const iconArea = document.createElement("div");
                iconArea.classList.add("icon-area");
                const viewIcon = document.createElement("i");
                viewIcon.classList.add("view-comment-icon");
                viewIcon.innerText = "👁‍🗨";
                const viewIconSpan = document.createElement("span");
                viewIconSpan.innerText = freeBoardLike.readCount;
                const commentIcon = document.createElement("i");
                commentIcon.classList.add("view-comment-icon");
                commentIcon.innerText = "💬";
                const commentIconSpan = document.createElement("span");
                commentIconSpan.innerText = freeBoardLike.commentCount;
                iconArea.append(viewIcon,viewIconSpan,commentIcon,commentIconSpan);
                const contentWriter = document.createElement("div");
                contentWriter.classList.add("content-writer");
                const spanMemberNickname = document.createElement("span");
                spanMemberNickname.innerText = freeBoardLike.memberNickname;
                const memberProfileImg = document.createElement("img");
                if(freeBoardLike.profileImage && freeBoardLike.profileImage != ""){
                    memberProfileImg.setAttribute("src", `${freeBoardLike.profileImage}`);
                } else{
                    memberProfileImg.setAttribute("src", "/resources/images/user.png");
                }
                contentWriter.append(spanMemberNickname,memberProfileImg);
                mainContentBottom.append(iconArea,contentWriter);
                mainContent.append(mainContentTop,mainContentBottom);
                const newUrl = `/board/${freeBoardCode}/${freeBoardLike.boardNo}`;
                // mainContent 요소에 onclick 이벤트를 setAttribute로 설정
                mainContent.setAttribute("onclick", `
                    if (opener) {
                        opener.location.replace('${newUrl}');  // 부모 창의 URL 변경
                    } else {
                        console.log('No opener found.');
                    }
                `);
                myPageProfileMain.append(mainContent);
            }
        } else{
            const notWrite = document.createElement("p");
            notWrite.classList.add("notWrite");
            notWrite.innerText = "자유 게시판에 아직 좋아요 누른 게시글이 없습니다.."
            myPageProfileMain.append(notWrite);
        }

    })
    .catch(err => console.log("좋아요 누른 자유게시판 게시글 목록 조회 중 오류 발생:", err))
}

function RequestBoardListIsNotDone(memberNo,requestBoardCode){ // 요청한 의뢰 게시글 목록 조회(ajax)
    fetch("/myPage/RequestBoardListIsNotDone",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({ "memberNo": memberNo, "boardCode": requestBoardCode })
    })
    .then(resp => resp.json())
    .then(NDoneRequestBoardList => {
        const myPageProfileMain = document.getElementById("myPageProfileMain");
        myPageProfileMain.innerHTML = "";
        if(NDoneRequestBoardList.length > 0){
            const containerHead = document.createElement("div");
            const mainTitle = document.createElement("p");
            mainTitle.classList.add("mainTitle");
            mainTitle.innerText = "요청한 의뢰 "
            const span = document.createElement("span");
            span.innerText = "("+NDoneRequestBoardList.length+")" + "개";
            mainTitle.append(span)
            const line = document.createElement("div");
            containerHead.append(mainTitle,line);
            myPageProfileMain.append(containerHead);
            for(let NDoneRequestBoard of NDoneRequestBoardList){
                const mainContent = document.createElement("div");
                mainContent.classList.add("mainContent");
                const mainContentTop = document.createElement("div");
                mainContentTop.classList.add("mainContent-top");
                const mainContentTopInner1 = document.createElement("div");
                const mainCTitle = document.createElement("p");
                mainCTitle.classList.add("mainC-Title")
                mainCTitle.innerText = NDoneRequestBoard.boardTitle;

                // 동적으로 생성한 게시글 내용을 담은 viewer 요소
                const mainCContent = document.createElement("div");
                // freeBoard.boardContent 데이터를 data-content 속성에 저장
                mainCContent.classList.add("viewer");
                mainCContent.setAttribute("data-content", NDoneRequestBoard.boardContent)
                // 생성된 요소 mainCContent에 적용(Toast API / 토스트 API)
                applyToastViewer(mainCContent);

                mainContentTopInner1.append(mainCTitle,mainCContent);
                const mainContentTopInner2 = document.createElement("div");
                const contentImg = document.createElement("img");
                contentImg.classList.add("contentImg");
                if(NDoneRequestBoard.thumbnail && NDoneRequestBoard.thumbnail != ""){
                    contentImg.setAttribute("src", `${NDoneRequestBoard.thumbnail}`);
                } else{
                    contentImg.setAttribute("src", "/resources/images/Logo.WebP");
                }
                mainContentTopInner2.append(contentImg);
                mainContentTop.append(mainContentTopInner1,mainContentTopInner2);
                const mainContentBottom = document.createElement("div");
                mainContentBottom.classList.add("mainContent-bottom");
                const requestCondition = document.createElement("div");
                requestCondition.classList.add("request-condition");
                const p1 = document.createElement("p");
                const span1 = document.createElement("span");
                p1.innerText = "서비스";
                span1.innerText = NDoneRequestBoard.categoryName;
                p1.append(span1);
                const p2 = document.createElement("p");
                const span2 = document.createElement("span");
                p2.innerText = "장소";
                span2.innerText = NDoneRequestBoard.requestLocation;
                p2.append(span2);
                const p3 = document.createElement("p");
                const span3 = document.createElement("span");
                p3.innerText = "가격";
                span3.innerText = NDoneRequestBoard.requestPrice + "원";
                p3.append(span3);
                const p4 = document.createElement("p");
                const span4 = document.createElement("span");
                p4.innerText = "기한";
                span4.innerText = NDoneRequestBoard.requestDueDate;
                p4.append(span4);
                requestCondition.append(p1,p2,p3,p4)
                const requestSupporter = document.createElement("div");
                requestSupporter.classList.add("request-supporter");
                const spanMemberNickname = document.createElement("span");
                spanMemberNickname.innerText = NDoneRequestBoard.memberNickname;
                const memberProfileImg = document.createElement("img");
                if(NDoneRequestBoard.profileImage && NDoneRequestBoard.profileImage != ""){
                    memberProfileImg.setAttribute("src", `${NDoneRequestBoard.profileImage}`);
                } else{
                    memberProfileImg.setAttribute("src", "/resources/images/user.png");
                }
                requestSupporter.append(spanMemberNickname,memberProfileImg);
                mainContentBottom.append(requestCondition,requestSupporter);
                mainContent.append(mainContentTop,mainContentBottom);
                const newUrl = `/requestBoard/${NDoneRequestBoard.categoryId}/${NDoneRequestBoard.boardNo}`;
                // mainContent 요소에 onclick 이벤트를 setAttribute로 설정
                mainContent.setAttribute("onclick", `
                    if (opener) {
                        opener.location.replace('${newUrl}');  // 부모 창의 URL 변경
                    } else {
                        console.log('No opener found.');
                    }
                `);
                myPageProfileMain.append(mainContent);
            }
        } else{
            const notWrite = document.createElement("p");
            notWrite.classList.add("notWrite");
            notWrite.innerText = "현재 요청 중인 의뢰가 없습니다.."
            myPageProfileMain.append(notWrite);
        }
    })
    .catch(err => console.log("요청한 의뢰 게시글 목록 조회 중 오류 발생:", err))
}

function RequestBoardListIsDone(memberNo,requestBoardCode){ // 처리한 의뢰 게시글 목록 조회(ajax)
    fetch("/myPage/RequestBoardListIsDone",{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({"memberNo" : memberNo, "boardCode" : requestBoardCode})
    })
    .then(resp => resp.json())
    .then(DoneRequestBoardList => {
        const myPageProfileMain = document.getElementById("myPageProfileMain");
        myPageProfileMain.innerHTML = "";
        if(DoneRequestBoardList.length > 0){
            const containerHead = document.createElement("div");
            const mainTitle = document.createElement("p");
            mainTitle.classList.add("mainTitle");
            mainTitle.innerText = "처리한 의뢰 "
            const span = document.createElement("span");
            span.innerText = "("+DoneRequestBoardList.length+")" + "개";
            mainTitle.append(span);
            const line = document.createElement("div");
            containerHead.append(mainTitle,line);
            myPageProfileMain.append(containerHead);
            for(let DoneRequestBoard of DoneRequestBoardList){
                const mainContent = document.createElement("div");
                mainContent.classList.add("mainContent");
                const mainContentTop = document.createElement("div");
                mainContentTop.classList.add("mainContent-top");
                const mainContentTopInner1 = document.createElement("div");
                const mainCTitle = document.createElement("p");
                mainCTitle.classList.add("mainC-Title")
                mainCTitle.innerText = DoneRequestBoard.boardTitle;

                // 동적으로 생성한 게시글 내용을 담은 viewer 요소
                const mainCContent = document.createElement("div");
                // freeBoard.boardContent 데이터를 data-content 속성에 저장
                mainCContent.classList.add("viewer");
                mainCContent.setAttribute("data-content", DoneRequestBoard.boardContent)
                // 생성된 요소 mainCContent에 적용(Toast API / 토스트 API)
                applyToastViewer(mainCContent);

                mainContentTopInner1.append(mainCTitle,mainCContent);
                const mainContentTopInner2 = document.createElement("div");
                const contentImg = document.createElement("img");
                contentImg.classList.add("contentImg");
                if(DoneRequestBoard.thumbnail && DoneRequestBoard.thumbnail != ""){
                    contentImg.setAttribute("src", `${DoneRequestBoard.thumbnail}`);
                } else{
                    contentImg.setAttribute("src", "/resources/images/Logo.WebP");
                }
                mainContentTopInner2.append(contentImg);
                mainContentTop.append(mainContentTopInner1,mainContentTopInner2);
                const mainContentBottom = document.createElement("div");
                mainContentBottom.classList.add("mainContent-bottom");
                const requestCondition = document.createElement("div");
                requestCondition.classList.add("request-condition");
                const p1 = document.createElement("p");
                const span1 = document.createElement("span");
                p1.innerText = "서비스";
                span1.innerText = DoneRequestBoard.categoryName;
                p1.append(span1);
                const p2 = document.createElement("p");
                const span2 = document.createElement("span");
                p2.innerText = "장소";
                span2.innerText = DoneRequestBoard.requestLocation;
                p2.append(span2);
                const p3 = document.createElement("p");
                const span3 = document.createElement("span");
                p3.innerText = "가격";
                span3.innerText = DoneRequestBoard.requestPrice + "원";
                p3.append(span3);
                const p4 = document.createElement("p");
                const span4 = document.createElement("span");
                p4.innerText = "기한";
                span4.innerText = DoneRequestBoard.requestDueDate;
                p4.append(span4);
                const p5 = document.createElement("p");
                const span5 = document.createElement("span");
                const starsContainers = document.createElement("div");
                starsContainers.classList.add("profileStars");
                for(let i=0; i<5; i++){
                    const star = document.createElement("i");
                    star.classList.add("profileStar");
                    if(i < Math.floor(DoneRequestBoard.reviewRating)){
                        star.classList.add("full");
                    } else if( i == Math.floor(DoneRequestBoard.reviewRating) && DoneRequestBoard.reviewRating % 1 !== 0){
                        star.classList.add("half");
                    }
                    starsContainers.append(star);
                }
                p5.innerText = "후기";
                span5.innerText = DoneRequestBoard.reviewRating.toFixed(1);
                p5.append(starsContainers, span5);
                requestCondition.append(p1,p2,p3,p4,p5);
                const requestSupporter = document.createElement("div");
                requestSupporter.classList.add("request-supporter");
                const spanMemberNickname = document.createElement("span");
                spanMemberNickname.innerText = DoneRequestBoard.memberNickname;
                const memberProfileImg = document.createElement("img");
                if(DoneRequestBoard.profileImage && DoneRequestBoard.profileImage != ""){
                    memberProfileImg.setAttribute("src", `${DoneRequestBoard.profileImage}`);
                } else{
                    memberProfileImg.setAttribute("src", "/resources/images/user.png");
                }
                requestSupporter.append(spanMemberNickname,memberProfileImg);
                mainContentBottom.append(requestCondition,requestSupporter);
                mainContent.append(mainContentTop,mainContentBottom);
                const newUrl = `/requestBoard/${DoneRequestBoard.categoryId}/${DoneRequestBoard.boardNo}`;
                // mainContent 요소에 onclick 이벤트를 setAttribute로 설정
                mainContent.setAttribute("onclick", `
                    if (opener) {
                        opener.location.replace('${newUrl}');  // 부모 창의 URL 변경
                    } else {
                        console.log('No opener found.');
                    }
                `);
                myPageProfileMain.append(mainContent);
            }
        } else{
            const notWrite = document.createElement("p");
            notWrite.classList.add("notWrite");
            notWrite.innerText = "현재 처리한 의뢰가 없습니다.."
            myPageProfileMain.append(notWrite);
        }
    })
    .catch(err => console.log("처리한 의뢰 게시글 목록 조회 중 오류 발생:", err))
}

/**
 * 주어진 요소에 대해 Toast UI Viewer를 적용하는 함수
 * @param {HTMLElement} viewerElement - Toast UI Viewer를 적용할 요소
 */
function applyToastViewer(viewerElement) {
    let contentHtml = viewerElement.getAttribute("data-content");
    
    if (contentHtml) {
        try {
            // ✅ Toast UI Viewer 생성 (HTML을 그대로 렌더링)
            new toastui.Editor({
                el: viewerElement,
                initialValue: contentHtml, // HTML 그대로 사용
                viewer: true
            });
        } catch (error) {
            console.error("Viewer Rendering Error:", error);
        }
    }
}

/*****************************************************************************************/
// 회원정보 수정

// 회원정보 수정 화면 전환
const updateBtn = document.getElementById("updateBtn");
if(updateBtn != null){
    updateBtn.addEventListener("click", ()=>{
        location.href = "/myPage/goUpdateInfo";
    })
}

// 1) 프로필 이미지 수정
const profileImg = document.getElementById("profileImg");
const profileImgBtnArea = document.getElementById("profileImgBtnArea");
const deleteProfileImgBtn = document.getElementById("deleteProfileImgBtn");
const updateProfileImgBtn = document.getElementById("updateProfileImgBtn");
const inputImage = document.getElementById("inputImage");
let initCheck; // 초기 프로필 이미지 상태 저장 변수(false : 기본 이미지, true : 이전 이미지)
let originalImg; // 초기 프로필 이미지 파일경로 저장하는 변수
let deleteCheck = -1; // 프로필 이미지가 새로 업로드 되거나 삭제되었음을 나타내는 변수
                      //(-1 : 초기값 / 0 : 프로필 삭제 / 1 : 새 이미지 업로드)
// 프로필 이미지 변경/삭제 버튼 toggle
if(Number(loginMemberNoInMyPage) == Number(myPMemNo)){ // 본인 프로필 이미지만 변경 가능
    if(profileImg != null){
        profileImg.addEventListener("click", ()=>{
            event.stopPropagation(); // 프로필 이미지 클릭 시 이벤트 버블링 방지
            profileImgBtnArea.classList.toggle("visible");
            profileImgBtnArea.classList.toggle("hidden");
        })
    }
    // 페이지 내 다른 요소를 클릭했을 때 profileImgBtnArea 숨기기
    document.addEventListener("click", (event) => {
        // profileImgBtnArea가 보이는 상태일 때만 숨기기
        if(profileImgBtnArea.classList.contains("visible")) {
            // 클릭된 요소가 profileImg 또는 profileImgBtnArea가 아니라면
            if (!profileImg.contains(event.target) && !profileImgBtnArea.contains(event.target)) {
                profileImgBtnArea.classList.remove("visible");
                profileImgBtnArea.classList.add("hidden");
            }
        }
    });
}
// 프로필 이미지 수정(변경/삭제)
if(inputImage != null){
    // 프로필 이미지가 출력되는 img 태그의 src 속성 저장
    originalImg = profileImg.getAttribute("src");

    // 현재 회원의 프로필 이미지 상태 확인
    if(originalImg == "resources/images/user.png"){ // 기본 프로필 이미지인 경우
        initCheck = false;
    } else{ // 기본 프로필 이미지가 아닌 경우
        initCheck = true;
    }
    inputImage.addEventListener("change", e=> { // 변경 버튼 클릭한 경우
        // 최대 크기 제한(200MB)
        const maxSize = 1 * 1024 * 1024 * 200;
        const file = e.target.files[0]; // 업로드한 파일의 정보가 담긴 객체
        // 선택한 파일 크기가 최대 크기를 초과한 경우

        // 파일을 한 번 선택한 후 취소했을 때
        if(file == undefined){ // inputImage.value == ""
            deleteCheck = -1; // 파일 취소 == 파일 없음 == 초기 상태
            profileImg.setAttribute("src", originalImg); // 기존 프로필 이미지로 변경
            return;
        }
        // 선택된 파일의 크기가 최대 크기(maxSize)를 초과한 경우
        if(file.size > maxSize){
            alert("200MB 이하의 이미지를 선택해주세요.");
            inputImage.value = "";
            deleteCheck = -1;
            profileImg.setAttribute("src", originalImg);
            return;
        }
        const reader = new FileReader(); // JS에서 파일을 읽는 객체
        reader.readAsDataURL(file); // 파일을 나타내는 URL을 result 속성으로 얻어옴
        reader.onload = function(e){ // 파일을 다 읽었을 때
            profileImg.setAttribute("src", e.target.result); // 읽어온 파일의 URL 추가
            deleteCheck = 1; // 새 이미지 업로드
        }
    })
    deleteProfileImgBtn.addEventListener("click", e=>{ // 삭제 버튼 클릭한 경우
        // 프로필 이미지를 기본 프로필 이미지로 변경
        if(confirm("프로필 이미지 삭제 시 복구가 불가능합니다. 정말 삭제하시겠습니까?")){
            profileImg.setAttribute("src", "/resources/images/user.png");
            inputImage.value = "";
            deleteCheck = 0;
        } else{
            e.preventDefault();
            return;
        }
    })
    // form 태그 제출되었을 때
    const profileImgFrm = document.getElementById("profileImgFrm");
    profileImgFrm.addEventListener("submit", e=>{
        // 제출 여부 판별 변수
        let flag = false;
        // 프로필 이미지가 없다 -> 있다
        if(!initCheck && deleteCheck == 1) flag = true;
        // 이전 프로필 이미지가 있다 -> 삭제
        if(initCheck && deleteCheck == 0) flag = true;
        // 이전 프로필 이미지가 있다 -> 새 이미지
        if(initCheck && deleteCheck == 1) flag = true;

        if(!flag){ // 위 3가지 경우가 아닌 경우 제출 불가
            alert("프로필 이미지를 변경하신 후 클릭하세요.");
            e.preventDefault();
            return;
        }
    })
    // X 버튼 클릭 후 이미지 선택 취소 시 기존 이미지로 변경하기
    inputImage.addEventListener("click", ()=>{
        // 이미지 선택 이전에 x 버튼 클릭 여부 확인
        if(deleteCheck == 0){ // x 버튼 클릭 O

            document.body.onfocus = ()=>{
                setTimeout(function(){
                    // 파일 선택 취소 시
                    if(inputImage.value == ""){
                        profileImg.setAttribute("src", originalImg);
                        deleteCheck = -1;
                    }
                }, 400) // 0.4초 후 실행
                // 추가된 이벤트 초기화
                document.body.onfocus = null;
            }
        }
    })
};

// 2) 회원정보 수정
const updateInfo = document.getElementById("updateInfo");
const memberNickname = document.getElementById("memberNickname");
const memberTel = document.getElementById("memberTel");
const newNickMessage = document.getElementById("newNickMessage");
if(updateInfo != null){
    // 전역변수로 수정 전 닉네임 / 전화번호 저장
    initNickname = memberNickname.value;
    initTel = memberTel.value;
    initNewNickMessage = newNickMessage.innerText;
    initNewTelMessage = newTelMessage.innerText;
    // 닉네임 유효성 검사
    memberNickname.addEventListener("input", ()=>{
        // 변경 전 닉네임과 입력한 값이 같은 경우
        if(initNickname == memberNickname.value){
            memberNickname.style.color = "red";
            newNickMessage.style.color = "red";
            newNickMessage.innerText = "변경 전 닉네임 입니다. 다시 입력해주세요."
            return;
        } else{
            newNickMessage.style.color = "black";
            newNickMessage.innerText = initNewNickMessage;
        }
        // 정규 표현식으로 유효성 검사
        const regEx = /^[가-힣a-zA-Z\d]{2,10}$/;
        const nickName = memberNickname.value.trim();
        if(regEx.test(nickName)){
            memberNickname.style.color = "green";
        } else{
            memberNickname.style.color = "red";
        }
        if(nickName === ""){
            memberNickname.style.color = "red";
            newNickMessage.style.color = "red";
            newNickMessage.innerText = "닉네임을 입력해주세요.";
            return;
        }
    })
    // 전화번호 유효성 검사
    memberTel.addEventListener("input", ()=>{
        // 변경 전 전화번호와 입력한 값이 같은 경우
        if(initTel == memberTel.value){
            memberTel.style.color = "red";
            newTelMessage.style.color = "red";
            newTelMessage.innerText = "변경 전 전화번호 입니다. 다시 입력해주세요."
            return;
        } else{
            newTelMessage.style.color = "black";
            newTelMessage.innerText = initNewTelMessage;
        }
        // 정규 표현식으로 유효성 검사
        const regEx = /^0(1[01]|2|[3-6][1-5]|70)\d{7,8}$/;
        const memTel = memberTel.value.trim();
        if(regEx.test(memTel)){
            memberTel.style.color = "green";
        } else{
            memberTel.style.color = "red";
        }
        if(memTel === ""){
            memberTel.style.color = "red";
            newTelMessage.style.color = "red";
            newTelMessage.innerText = "전화번호를 입력해주세요. (-) 제외.";
            return;
        }
    })
    // form 태그 제출 시 유효하지 않은 값이 있을 경우 제출 X
    updateInfo.addEventListener("submit", e=>{
        // 닉네임이 유효하지 않은 경우
        if(memberNickname.style.color == "red"){
            alert("닉네임이 유효하지 않습니다.");
            memberNickname.focus();
            e.preventDefault();
            return;
        }
        // 전화번호가 유효하지 않은 경우
        if(memberTel.style.color == "red"){
            alert("전화번호가 유효하지 않습니다.");
            memberTel.focus();
            e.preventDefault();
            return;
        }
    })
};

// 3) 비밀번호 변경
(()=>{
    // 모달 작동
    const modal = document.querySelector('.modal');
    const changePwBtn  = document.getElementById("changePw");
    const modalClose = document.getElementById("modal-close");
    // 비밀번호 변경 버튼 클릭 시 모달 띄우기
    changePwBtn?.addEventListener("click", function(){
        modal.classList.toggle('show'); // add
    });
    // X버튼 클릭 시 모달 닫기
    modalClose?.addEventListener("click", function(){
        modal.classList.toggle('hide'); // hide 클래스 추가
        setTimeout(function(){ // 0.45초 후 동작
            modal.classList.toggle('hide'); // hide 클래스 제거
            modal.classList.toggle('show'); // remove
        }, 450);
    });
    // 모달 외부 클릭 시 닫기
    /* window.addEventListener("click", e=>{
        if(e.target == modal) {
            modal.classList.toggle('hide');
            setTimeout(() => modal.classList.remove("show"), 500);
        }
    }) */
    // 비밀번호 변경
    const pwCheckFrm = document.getElementById("pwCheckFrm");
    if(pwCheckFrm != null){
        pwCheckFrm.addEventListener("submit", e=>{
            e.preventDefault(); // 기본 제출 방지
            const currentPw = document.getElementById("currentPw");
            const newPw = document.getElementById("newPw");
            const checkPw = document.getElementById("checkPw");
            // 현재 비밀번호 미작성 시
            if(currentPw.value == ""){
                alert("현재 비밀번호를 작성해주세요.");
                //e.preventDefault();
                currentPw.focus();
                currentPw.value = "";
                return;
            }
            // 새 비밀번호 작성 시
            const regEx = /^[!@#-_a-zA-Z\d]{6,20}$/;
            if(!regEx.test(newPw.value)){
                alert("새 비밀번호가 유효하지 않습니다.");
                //e.preventDefault();
                newPw.focus();
                newPw.value = "";
                return;
            }
            // 새 비밀번호 != 새 비밀번호 확인 경우 "비밀번호가 일치하지 않습니다."
            if(newPw.value != checkPw.value){
                alert("새 비밀번호가 일치하지 않습니다.");
                //e.preventDefault();
                checkPw.focus();
                checkPw.value = "";
                return;
            }
            // 비밀번호 변경 ajax 요청
            fetch("/myPage/changePw",{
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"currentPw" : currentPw.value, "newPw" : newPw.value}) 
            })
            .then(resp => resp.json())
            .then(data => {
                alert(data.message); // 성공,실패 메세지 출력
                if(data.status == "success"){
                    // 성공 시 모달 닫고 페이지 이동
                    modal.classList.add("hide");
                    setTimeout(() => modal.classList.remove("show"), 500);
                    location.href = "goUpdateInfo";
                } else{
                    currentPw.value = "";
                    newPw.value = "";
                    checkPw.value = "";
                }
            })
            .catch(err => console.log("비밀번호 변경 에러 발생", err));
        })
    }
})();

// 메인 페이지 종료 시 팝업창 종료
setInterval(() => {
    const ts = localStorage.getItem("mainClosedTimestamp");
    if (ts) {
        // 현재 시간과 기록된 타임스탬프 차이를 계산 (밀리초 단위)
        const diff = Date.now() - parseInt(ts, 10);
        // 예를 들어, 3000ms(3초) 이상 차이가 나면 메인 페이지가 종료된 것으로 간주
        if (diff > 3000) {
            window.close(); // 메인 페이지가 종료되면 팝업 닫기
            localStorage.removeItem("mainClosedTimestamp");
        }
    }
}, 5000);


// 이미지와 말풍선 요소를 선택
const logoImage = document.getElementById('logoImage');
const speechBubble = document.getElementById('speechBubble');
// 클릭 이벤트 처리
logoImage?.addEventListener('click', function() {
    // 말풍선이 이미 보이면 숨기고, 숨겨져 있으면 보이게 함
    if (speechBubble.classList.contains('hidden')) {
        speechBubble.classList.remove('hidden');
        speechBubble.classList.add('visible');
    } else {
        speechBubble.classList.remove('visible');
        speechBubble.classList.add('hidden');
    }
});