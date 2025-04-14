
//목록으로
console.log("연결");
console.log(boardNo);
const listBtn =document.getElementById("listBtn")
if(listBtn!=null){

    document.getElementById("listBtn").addEventListener("click",()=>{
    
        // URL 내장 객체 : 주소 관련 정보를 나타내는 객체
        // URL.searchParams : 쿼리스트링만 별도 객체로 반환
        const params = new URL(location.href).searchParams
    
        let url;
    
        if(params.get("key") == 'all'){ //통합 검색인 경우
            url='/board/search';
        }else{
            url='/inquiryListMember/' ;
        }
    
        location.href= url + location.search;
                          
    })
}


const delBtn = document.getElementById("delBtn");

if(delBtn!=null){

    document.getElementById("delBtn").addEventListener("click",()=>{
        console.log(boardNo)
        if(!confirm("정말 삭제하시겠습니까?")) return;
    
        fetch("/inquiryDelete",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: boardNo
        })
        .then(resp => {
            console.log(resp)
            if(resp.ok){
                alert("삭제 되었습니다.")
                window.location.href="/inquiryListMember"
            }else{
                alert("삭제 실패")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    
    })
}
//답변등록 클릭
const answerBtn = document.getElementById("answerBtn")


if(answerBtn!=null){
    answerBtn.addEventListener("click",()=>{
        if(!confirm("답변을 등록하시겠습니까?")) return;
    const detailAnswer = document.getElementById("detailAnswer").value
        fetch("/answerInsert",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                boardNo: boardNo,
                loginMemberNo : loginMemberNo,
                detailAnswer : detailAnswer
            })
        })
        .then(resp => {
            console.log(resp)
            if(resp.ok){
                alert("답변이 등록 되었습니다.")
                window.location.href=`${boardNo}`
            }else{
                alert("등록 실패")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
};



