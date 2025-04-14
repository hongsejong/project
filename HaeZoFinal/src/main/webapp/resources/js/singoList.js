function changeListCount(count) {
    location.href = '/singo?cp=1&listCount=' + count;
}

function boardStatus(cp) {
    cp = cp || 1;
    const YNStatus = document.getElementById('boardStatus').checked ? 'Y' : 'N';

    if (YNStatus === 'Y') {
        fetch("/singo/boardStatusCheck?cp=" + cp, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ listCount: currentListCount, cp: cp })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const boardList = response.boardList;
            const pagination = response.pagination;
            const tbody = document.querySelector('#table tbody');
            tbody.innerHTML = '';

            if (boardList.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7">게시글이 존재하지 않습니다.</td></tr>';
            } else {
                boardList.forEach(board => {
                    const tr = document.createElement('tr');
                    tr.classList.add('tr'); 
                
                    tr.innerHTML = `
                        <td><input type="checkbox" name="reportNos" value="${board.reportNo}"></td>
                        <td>${board.reportNo}</td>
                        <td><a href="#" class="singoDetailOpen" data-report-no="${board.reportNo}" onclick="return false;">${board.reportTitle}</a></td>
                        <td>${board.reportedNickname}</td>
                        <td>${board.reporterNickname}</td>
                        <td>${
                            board.reportType == '1'
                            ? '허위 정보를 기재하였습니다.'
                            : board.reportType == '2'
                            ? '부적절한 사진입니다.'
                            : board.reportType == '3'
                            ? '부적절한 내용입니다.'
                            : board.reportType == '4'
                            ? '규정을 위반하였습니다.'
                            : board.reportType == '5'
                            ? '기타'
                            : board.reportType
                        }</td>
                        <td>${
                            board.reportResult === 'A'
                            ? '<span class="status-pending">처리 전</span>'
                            : board.reportResult === 'B'
                            ? '<span class="status-complete">무효</span>'
                            : board.reportResult === 'C'
                            ? '<span class="status-cancel">글 삭제</span>'
                            : ''
                        }</td>
                    `;
                    tbody.appendChild(tr);
                });
            }
            updatePagination(pagination);
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        location.href = '/singo?cp=1&listCount=' + currentListCount;
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
        if (i === currentPage) {
            paginationContainer.innerHTML += `<li><a class="current" href="javascript:void(0)">${i}</a></li>`;
        } else {
            paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${i})">${i}</a></li>`;
        }
    }

    // 다음 페이지와 마지막 페이지
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${Math.min(maxPage, currentPage + 1)})">></a></li>`;
    paginationContainer.innerHTML += `<li><a href="javascript:void(0)" onclick="boardStatus(${maxPage})">>></a></li>`;
}





// tbody에 클릭 이벤트 위임 적용
// 비동기라 클래스에 먹이면 작동안함
document.querySelector('#table tbody').addEventListener("click", function(e) {
    if (e.target && e.target.matches("a.singoDetailOpen")) {
        const reportNo = e.target.getAttribute("data-report-no");
        const popupUrl = "/singoDetail?reportNo=" + encodeURIComponent(reportNo);
        window.open(popupUrl, "_blank", "width=620,height=800,top=30,left=620");
    }
});