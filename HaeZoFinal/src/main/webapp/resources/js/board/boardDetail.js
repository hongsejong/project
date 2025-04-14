console.log("boardDetail")

const boardLike = document.getElementById("boardLike");
const likeCount = document.getElementById("likeCount");
const likeIcon = document.getElementById("likeIcon");

// 좋아요 체크 
if(boardLike){

    boardLike.addEventListener("click", e => {
    
        // 로그인 여부 검사
        if(memberNo == ""){
            alert("로그인 후 이용해주세요.");
            return;
        }
        // 기존에 좋아요 X(빈하트) : 0 || 기존에 좋아요 O(꽉찬하트) : 1
        const check = (likeCheck == "true") ? 1 : 0;
    
        console.log(check);
        // ajax로 서버에 제출할 파라미터를 모아둔 JS 객체
        const data = {
            "memberNo" : memberNo, 
            "boardNo" : boardNo, 
            "check" : check
        };
        
        // ajax
        fetch("/board/like", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(resp => resp.text()) // 응답 객체를 필요한 형태로 파싱하여 리턴
        .then(count => {
            // 파싱된 데이터를 받아서 처리하는 코드 작성
            //console.log("count : ", count);
    
            if(count == -1){ // INSERT, DELETE 실패 시
                alert("좋아요 처리 실패");
                return;
            }
            if(count != -1){
                if (likeIcon.src.includes("icons8-heart-50.png")) {
                    // 빈 하트라면 → 꽉 찬 하트로 바꿈
                    likeIcon.src = "/resources/images/board/icons8-heart-48.png";
                } else {
                    // 꽉 찬 하트라면 → 빈 하트로 바꿈
                    likeIcon.src = "/resources/images/board/icons8-heart-50.png";
                }
                likeCheck = (likeCheck === "true") ? "false" : "true";
            }
    
            // 현재 게시글의 좋아요 수를 화면에 출력
            likeCount.innerText = count;
    
            // 좋아요를 한 경우
            // 게시글 작성자에게 알림 전송
            // if(check == 0){
            //     const content = `<strong>${memberNickname}</strong>님이 <strong>${boardTitle}</strong> 게시글을 좋아합니다.`;
                
            //     // type, url, pkNo, content
            //     sendNotification(
            //         "boardLike",
            //         location.pathname, // 게시글 상세 조회 페이지 주소
            //         boardNo,
            //         content
            //     );
    
            // }
            
        })
        .catch(error => { // 예외 발생 시 처리하는 코드
            console.log("에러 :", error);
        });
    })
}

/* 목록으로 되돌아 가기 */
function goBack(){
    if(document.referrer){
        location.href = document.referrer;
    } else {
        // referrer가 없으면 기본 목록 페이지
        location.href = "/board/1?cp=1"; 
    }
}

// 게시글 삭제
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn?.addEventListener("click", ()=>{
    if(confirm("정말로 삭제하시겠습니까?")){
        location.href=location.pathname+"/delete"
    }
})

// 게시글 수정
const updateBtn = document.getElementById("updateBtn");
updateBtn?.addEventListener("click", ()=>{
    location.href = location.pathname + "/update"
})

document.addEventListener("DOMContentLoaded", ()=>{
    
})