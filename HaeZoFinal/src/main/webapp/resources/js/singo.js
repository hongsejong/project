const singoBtn= document.getElementById("singo")

if(singoBtn != null){
    singoBtn.addEventListener("click", ()=>{

const pathname = window.location.pathname; 


const pathParts = pathname.split('/');


let url, url2, url3;


if (pathParts.length === 3) {
    url = pathParts[1];  
    url2 = pathParts[2]; 
    console.log('url:', url);
    console.log('url2:', url2);


}


else if (pathParts.length === 4) {
    url = pathParts[1];   
    url2 = pathParts[2];  
    url3 = pathParts[3]; 
    console.log('url:', url);
    console.log('url2:', url2);
    console.log('url3:', url3);

}
let popupUrl = "/singoPopup?url=" + encodeURIComponent(url) + "&url2=" + encodeURIComponent(url2);
if (url3) {
    popupUrl += "&url3=" + encodeURIComponent(url3);
}

        window.open(popupUrl, "_blank", "width=620 , height=800 , top=30 ,left=620");
    })
}


// document.addEventListener("DOMContentLoaded", function(){
//     // 모든 singoDetailOpen 클래스를 가진 요소를 선택
//     const links = document.querySelectorAll(".singoDetailOpen");
//     links.forEach(link => {
//         link.addEventListener("click", function(e){
//             e.preventDefault();
//             // data-report-no 속성에서 신고 번호 가져오기
//             const reportNo = link.getAttribute("data-report-no");
//             // 필요에 따라 URL에 파라미터 추가
//             const popupUrl = "/singoDetail?reportNo=" + encodeURIComponent(reportNo);
//             window.open(popupUrl, "_blank", "width=620,height=800,top=30,left=620");
//         });
//     });
// });  singoList.js에서 처리함

const singoForm=document.getElementById('singoForm')
if(singoForm!=null){

    document.getElementById('singoForm').addEventListener('submit', function(event) {
        const titleInput = document.getElementById("titleinput");
        const contentInput = document.getElementById("singo-textarea");
        const reportSelect = document.querySelector("select[name='reportType']");
    
        // 제목이 비어있으면 경고 후 포커스
        if (!titleInput.value.trim()) {
            alert("신고 제목을 입력해주세요");
            titleInput.focus();
            event.preventDefault();
            return;
        }
        if (reportSelect.value=="x") {
            alert("신고 유형을 선택해주세요");
            reportSelect.focus();
            event.preventDefault();
            return;
          }
        // 내용이 비어있으면 경고 후 포커스
        if (!contentInput.value.trim()) {
            alert("신고 내용을 입력해주세요");
            contentInput.focus();
            event.preventDefault();
            return;
        }
    });
}