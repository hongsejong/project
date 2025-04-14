console.log("board.js");
// 모달 열기
function openModalFromDiv(divElement) {
// divElement 내부에 있는 img 요소를 찾는다 (가장 첫 번째 img라고 가정)
const img = divElement.querySelector('img');
// img.src 가져오기
openModal(img.src);
}

function openModal(imageSrc) {
    // 모달 요소를 가져옴
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    // 모달에 큰 이미지를 설정
    modalImg.src = imageSrc;

    // 모달 표시
    modal.style.display = 'block';
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

/* 대댓글 접기/펼치기 */
document.querySelectorAll(".toggle-replies").forEach(function(button) {
    button.addEventListener("click", function() {
        const replyList = button.nextElementSibling.nextElementSibling; // 대댓글 리스트 선택
        if (replyList.classList.contains("show")) {
            replyList.classList.remove("show");
            button.textContent = "답글 보기";
        } else {
            replyList.classList.add("show");
            button.textContent = "답글 숨기기";
        }
    });
});


/* 현재 보고있는 게시판 종류 */
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname; // ex) "/board/2/475"
  const links = document.querySelectorAll(".boardType");

  links.forEach(function (link) {
    // link.href를 완전한 URL 객체로 만든 뒤, pathname 추출
    // (상대 경로가 있으면 window.location.origin을 두번째 인자로 추가)
    const linkPath = new URL(link.href, window.location.origin).pathname; 
    // ex) "/board/2"

    // 쿼리 파라미터(?cp=1)는 pathname 비교 시 무시됨

    // "현재 경로가 링크 path로 시작" or "정확히 같은지"를 확인
    // ex) "/board/2/475".startsWith("/board/2") => true
    if (
      currentPath === linkPath ||
      currentPath.startsWith(linkPath + "/")
    ) {
      link.style.backgroundColor = "#6B98F2";
      link.style.color = "white";
      link.style.borderRadius = "10px";
    }
  });
});

// 검색창에 이전 검색 기록 남기기
const searchKey = document.getElementById("searchKey");
const searchQuery = document.getElementById("searchQuery");
const options = document.querySelectorAll("#searchKey > option"); // option 태그 4개

(() => {
    const params = new URL(location.href).searchParams;

    const key = params.get("key"); // t, c, tc, w 중 하나
    const query = params.get("query"); // 검색어
    //console.log(key);
    //console.log(query);
    
    // 검색 했을 때
    if(key != null){

        // option 태그에 selected 속성 추가
        // -> option 태그를 하나씩 접근해서 value가 key와 같으면 속성 추가
        for(let option of options){
            if(key == option.value){
                option.selected = true;
            }
        }
        if(searchQuery != null){
            // 검색어 화면에 출력
            searchQuery.value = query;
        }
    }
})();

// 검색어 입력 없이 제출된 경우
document.getElementById("boardSearch")?.addEventListener("submit", e=>{
  if(searchQuery.value.trim().length == 0){
      // form 기본 이벤트 제거
      e.preventDefault();
      searchQuery.value = "";
      // 해당 게시판 1페이지로 이동
      location.href = location.pathname
      // location.pathname : 쿼리스트링을 제외한 실제 주소
  }
})
