function changeListCount(count) {
    location.href = '/inquiryList?cp=1&listCount=' + count ;
}





function boardStatus(cp) {
    cp = cp || 1;
    const YNStatus = document.getElementById('boardStatus').checked ? 'Y' : 'N';

    if(YNStatus=='Y'){

        fetch("/inquiryList/boardStatusCheck?cp="+cp, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listCount: currentListCount,  cp: cp })
        })
        .then(response => response.json())
        .then(response => {
            const boardList = response.boardList;
            const pagination = response.pagination;
            const tbody = document.querySelector('#table tbody');
            tbody.innerHTML = '';
    
            if (boardList.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3">게시글이 존재하지 않습니다.</td></tr>';
            } else {
                boardList.forEach(board => {
                    const tr = document.createElement('tr');
                    tr.classList.add("tr");
                    tr.innerHTML = `
                        <td>${board.boardNo}</td>
                        <td><a href="#">${board.boardTitle}</a></td>
                        <td>${board.boardStatus === 'N' 
                            ? '<span class="status-pending">답변 전</span>' 
                            : '<span class="status-complete">답변 완료</span>'}</td>
                        
                    `;
                    tbody.appendChild(tr);
                });
            }
            updatePagination(pagination);
        })
        .catch(err => {
            console.log(err);
        });
    }else{
        location.href = '/inquiryList?cp=1&listCount=' + currentListCount;
    }

}

function updatePagination(pagination) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';  // 기존 페이지네이션 초기화

    const currentPage = pagination.currentPage;
    const maxPage = pagination.maxPage;
    const startPage = pagination.startPage;
    const endPage = pagination.endPage;

    // 첫 페이지와 이전 페이지 
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(1)"><<</a></li>`;
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${Math.max(1, currentPage - 1)})"><</a></li>`;

    // 페이지 번호 
    for (let i = startPage; i <= endPage && i <= maxPage; i++) {
        if(i === currentPage) {
            paginationContainer.innerHTML += `<li><a class="current" href="javascript:void(0)">${i}</a></li>`;
        } else {
            paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${i})">${i}</a></li>`;
        }
    }

    // 다음 페이지와 마지막 페이지
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${Math.min(maxPage, currentPage + 1)})">></a></li>`;
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${maxPage})">>></a></li>`;
}
