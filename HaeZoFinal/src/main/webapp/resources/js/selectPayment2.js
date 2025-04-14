let offset = 0; // 처음부터 시작
const limit = 10; // 한 번에 가져올 데이터 개수
const tableBody = document.getElementById("paymentTableBody");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// 데이터 불러오기 함수
function loadPayments() {
    // 서버에서 데이터 가져오기
    fetch(`/selectPaymentData?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            // "더 보기" 버튼이 존재하는 경우 숨김 처리
            if (loadMoreBtn) loadMoreBtn.style.display = "none"; 

            // 이미 존재하는 메시지 제거 (중복 방지)
            const existingMessage = document.getElementById("no-payment-message");
            if (!existingMessage) {
                let notSelectPayment = document.createElement("tr");
                notSelectPayment.id = "no-payment-message"; // 중복 방지 ID 설정
                notSelectPayment.innerHTML = `<td colspan="6">조회할 내역이 없습니다.</td>`;
                tableBody.appendChild(notSelectPayment);
            }
            return;
        }
        data.forEach(payment => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${payment.orderName}</td>
                <td>${payment.approvedAt}</td>
                <td>${payment.method}</td>
                <td>${payment.totalAmount} 원</td>
                <td>${payment.cardType ? payment.cardType : '-'}</td>
                <td>${payment.receiptUrl ? `<a href="${payment.receiptUrl}" target="_blank" class="receipt-link">영수증 보기</a>` : ''}</td>
`
            ;
            tableBody.appendChild(row);
        });
        offset += limit; // 다음 데이터를 위해 증가
    })
    .catch(error => console.error("결제 내역 불러오기 실패:", error));
}

// "더 보기" 버튼 클릭 이벤트
loadMoreBtn?.addEventListener('click', function() {
    loadPayments();
});

// 테이블 정렬 기능
window.sortTable = function(columnIndex) {
    let rows = Array.from(tableBody.querySelectorAll("tr"));
    let isAscending = tableBody.getAttribute("data-sort") !== "asc";

    // "조회할 내역이 없습니다." 메시지를 찾고, 메시지를 제외한 나머지 행만 추출
    let noDataMessage = document.getElementById("no-payment-message");
    let rowsWithoutMessage = noDataMessage ? rows.filter(row => row !== noDataMessage) : rows;

    // 정렬 처리
    rowsWithoutMessage.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex];
        let cellB = rowB.cells[columnIndex];

        if (!cellA || !cellB) return 0;

        let cellAValue = cellA.innerText.trim();
        let cellBValue = cellB.innerText.trim();

        if (columnIndex === 1) { // 승인 시각
            let dateA = new Date(cellAValue);
            let dateB = new Date(cellBValue);
            return isAscending ? dateA - dateB : dateB - dateA;
        } else if (columnIndex === 3) { // 총 금액
            let amountA = parseInt(cellAValue.replace(' 원', '').replace(',', ''));
            let amountB = parseInt(cellBValue.replace(' 원', '').replace(',', ''));
            return isAscending ? amountA - amountB : amountB - amountA;
        }

        // 기본 문자열 비교 (기타 컬럼)
        return isAscending 
            ? cellAValue.localeCompare(cellBValue, undefined, { numeric: true }) 
            : cellBValue.localeCompare(cellAValue, undefined, { numeric: true });
    });

    // 기존 데이터를 갱신하지 않고 정렬된 순서대로 다시 삽입
    tableBody.innerHTML = "";  // 테이블을 초기화하지 않고 데이터만 정렬

    // 정렬된 데이터를 테이블에 추가
    rowsWithoutMessage.forEach(row => tableBody.appendChild(row));

    tableBody.appendChild(noDataMessage);

    tableBody.setAttribute("data-sort", isAscending ? "asc" : "desc");
};