console.log("withdrawPoint.js");

const container2 = document.getElementById("radio-container2");
const totalAmountDisplay2 = document.getElementById("totalAmountDisplay2");
const quantityInput2 = document.getElementById("quantity2");

// 금액 선택 라디오 버튼 동적 생성
for (let i = 10000; i <= 100000; i += 10000) {
    const radio2 = document.createElement("input");
    radio2.classList.add("input");
    radio2.type = "radio";
    radio2.id = `withdraw-price-${i}`;
    radio2.name = "withdraw-price";
    radio2.value = i;

    const label2 = document.createElement("label");
    label2.setAttribute("for", `withdraw-price-${i}`);
    label2.className = "price-label";
    label2.textContent = `${i.toLocaleString()}원`;

    // 왼쪽(10,000원~50,000원) vs 오른쪽(60,000원~100,000원) 배치
    const wrapper2 = document.createElement("div");
    wrapper2.className = i <= 50000 ? "price-item left" : "price-item right";
    wrapper2.appendChild(radio2);
    wrapper2.appendChild(label2);

    container2.appendChild(wrapper2);

    // 라디오 버튼 선택 시 총 출금 금액 업데이트
    radio2.addEventListener("change", updateTotalAmount2);
}

// 변경 버튼 클릭 시 수량 적용
document.getElementById("updateQuantity2").addEventListener("click", updateTotalAmount2);

// 총 결제 금액 업데이트 함수
function updateTotalAmount2() {
    const selectedPrice2 = document.querySelector('input[name="withdraw-price"]:checked');
    const quantity2 = parseInt(quantityInput2.value);

    if (selectedPrice2) {
        const totalAmount2 = selectedPrice2.value * quantity2;
        totalAmountDisplay2.textContent = `총 금액 : ${totalAmount2.toLocaleString()}원`;
    } else {
        totalAmountDisplay2.textContent = "총 금액: 0원";
    }
};

function resetForm2() {
    // 1. 모든 라디오 버튼 초기화
    const radios2 = document.querySelectorAll('input[type="radio"]');
    radios2.forEach(radio => {
        radio.checked = false; // 라디오 버튼 체크 해제
    });
    // 2. 수량 입력값 초기화
    quantityInput2.value = "1"; // 수량 입력 초기화
    totalAmountDisplay2.textContent = "총 금액: 0원"; // 총 금액 초기화
}

// 출금 form 제출 이벤트
const withdrawPointFrm = document.getElementById("withdrawPointFrm");
// 성공/실패 모달
const withdrawSuccess = document.getElementById("withdrawSuccess");
const withdrawFail = document.getElementById("withdrawFail");

withdrawPointFrm?.addEventListener("submit", async(e) => {
    e.preventDefault(); // 기본 제출 막기
    
    const selectedPrice2 = document.querySelector('input[name="withdraw-price"]:checked');
    const quantity2 = parseInt(quantityInput2.value);
    const bank = document.getElementById("bank").value;
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const accountHolder = document.getElementById("accountHolder").value.trim();
    
    if (!selectedPrice2) { // 금액 선택 안 하고 출금하기 버튼 클릭할 경우
        alert("금액을 선택해주세요!");
        return;
    }
    if (!bank) { // 은행 선택 안 할 경우
        alert("은행을 선택해주세요!");
        return;
    }
    if (!accountNumber || !/^\d+$/.test(accountNumber)) { // 계좌번호 입력을 안 할 경우
        alert("유효한 계좌번호를 입력해주세요!");
        document.getElementById("accountNumber").focus();
        return;
    }
    if (!accountHolder) { // 예금주명 입력 안 할 경우
        alert("예금주명을 입력해주세요!");
        document.getElementById("accountHolder").focus();
        return;
    }
    const amount = Number(selectedPrice2.value * quantity2);
    // amount(금액 * 수량_기본값: 1)를 폼에 추가 (hidden input)
    const amountInput = document.createElement('input');
    amountInput.type = 'hidden';
    amountInput.name = 'amount';
    amountInput.value = amount;
    withdrawPointFrm.appendChild(amountInput);
    
    try{
        // 잔액이 출금할 금액보다 적은 경우 출금 막기
        // 현재 잔액 가져오기 (비동기 요청을 동기적으로 처리)
        const resp = await fetch("/remainingAmount");
        const data = await resp.text();
        const formattedAmount = Number(data);
        // 잔액이 출금할 금액보다 적은 경우 출금 차단
        if (amount > formattedAmount) {
            alert("출금 신청 금액이 잔액보다 많습니다.");
            return;
        }

        // 기존 amount input 제거 (중복 방지)
        const existingAmountInput = document.querySelector('input[name="amount"]');
        if (existingAmountInput) {
            existingAmountInput.remove();
        }

        // 새로운 amount input 추가
        const amountInput = document.createElement('input');
        amountInput.type = 'hidden';
        amountInput.name = 'amount';
        amountInput.value = amount;
        withdrawPointFrm.appendChild(amountInput);

        console.log("새로운 amount 값: ", amount);  // 값이 맞는지 확인
        console.log(amountInput);  // 새로운 input 확인

        // FormData 생성
        const formData = new FormData(withdrawPointFrm);
        console.log(formData.get("amount")); // 서버로 전송될 amount 값 확인

        // 출금신청 성공/실패 ajax
        const response = await fetch("/withdrawPoint", {
            method : "POST",
            body: formData,
        })
        // 서버에서 응답 받을 경우
        const result = await response.json();

        if(result.withdrawResult == "success"){ // 출금신청 성공 시 성공화면 모달
            const childModalContent = document.getElementsByClassName("childModal-content")[0];
            childModalContent.innerHTML = "";
            const childModalClose = document.createElement("span");
            childModalClose.classList.add("childModal-close");
            childModalClose.innerText = "x";
            const withdrawResultBody = document.createElement("div");
            withdrawResultBody.classList.add("withdrawResult-body");
            const boxSection = document.createElement("div");
            boxSection.classList.add("box_section");
            const checkIcon = document.createElement("img");
            checkIcon.classList.add("check-icon");
            checkIcon.setAttribute("src", "https://static.toss.im/illusts/check-blue-spot-ending-frame.png");
            const infoTitle = document.createElement("h2");
            infoTitle.classList.add("infoTitle");
            infoTitle.innerText = "출금신청이 완료되었습니다.";
            const infoGrid = document.createElement("div");
            infoGrid.classList.add("info-grid");
            const infoRow = document.createElement("div");
            infoRow.classList.add("info-row");
            const amountTitle = document.createElement("span");
            amountTitle.classList.add("label");
            amountTitle.innerText = "출금 예정 금액"
            const amount = document.createElement("span");
            amount.classList.add("value");
            amount.textContent = formatCurrency(result.amount);
            amount.style.marginLeft = "40px";
            infoRow.append(amountTitle, amount);
            const infoRow2 = document.createElement("div");
            infoRow2.classList.add("info-row");
            const amountTitle2 = document.createElement("span");
            amountTitle2.classList.add("label");
            amountTitle2.innerText = "보유 포인트 잔액";
            const afterTotalAmount = document.createElement("span");
            afterTotalAmount.classList.add("value");
            afterTotalAmount.textContent = formatCurrency(result.afterTotalAmount);
            afterTotalAmount.style.marginLeft = "15px";
            infoRow2.append(amountTitle2, afterTotalAmount);
            const infoRow3 = document.createElement("div");
            infoRow3.classList.add("info-row");
            const infoContent = document.createElement("span");
            infoContent.classList.add("label");
            infoContent.innerText = "💲 출금 신청 후 5 영업일 이내로 계좌 이체 예정입니다. 💲";
            infoRow3.append(infoContent);
            infoGrid.append(infoRow, infoRow2, infoRow3);
            boxSection.append(checkIcon, infoTitle, infoGrid);
            withdrawResultBody.append(boxSection);
            childModalContent.append(childModalClose, withdrawResultBody);

            withdrawSuccess.classList.toggle('show'); // add

        } else{ // 출금신청 실패 시 실패화면 모달
            const childModalContent2 = document.getElementsByClassName("childModal-content")[1];
            childModalContent2.innerHTML = "";
            const childModalClose2 = document.createElement("span");
            childModalClose2.classList.add("childModal-close");
            childModalClose2.innerText = "x";
            const withdrawResultBody2 = document.createElement("div");
            withdrawResultBody2.classList.add("withdrawResult-body");
            const boxSection2 = document.createElement("div");
            boxSection2.classList.add("box_section");
            const failIcon2 = document.createElement("img");
            failIcon2.classList.add("check-icon");
            failIcon2.setAttribute("src", "https://static.toss.im/lotties/error-spot-no-loop-space-apng.png");
            const infoTitle2 = document.createElement("h2");
            infoTitle2.classList.add("infoTitle");
            infoTitle2.innerText = "출금신청을 실패했습니다.";
            const infoGrid2 = document.createElement("div");
            infoGrid2.classList.add("info-grid");
            const infoRow4 = document.createElement("div");
            infoRow4.classList.add("info-row2");
            const failContent2 = document.createElement("span");
            failContent2.classList.add("label");
            failContent2.innerText = "출금신청 실패 시 고객센터로 출금 문의 부탁드립니다.";
            infoRow4.append(failContent2);
            infoGrid2.append(infoRow4);
            boxSection2.append(failIcon2, infoTitle2, infoGrid2);
            withdrawResultBody2.append(boxSection2);
            childModalContent2.append(childModalClose2, withdrawResultBody2);

            withdrawFail.classList.toggle('show'); // add
        }
    } catch(error){
        console.error("출금 요청 실패:", error);
        alert("출금 요청 중 오류가 발생했습니다.");
    }
});

// 출금신청 성공/실패 모달 작동
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("childModal-close")) {
        const childModal = document.querySelector('.childModal');
        if (childModal) {
            childModal.classList.toggle('hide'); // hide 클래스 추가
            childModal.classList.toggle('hide'); // hide 클래스 제거
            childModal.classList.toggle('show'); // remove
            // 0.5초 후 메인 페이지로 이동
            setTimeout(function () {
                window.location.href = "/";
            }, 500);
        }
    }
});

// 출금신청 성공 시 금액 표기 숫자 포맷 변환
function formatCurrency(number) {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        minimumFractionDigits: 0,
    }).format(number).replace("₩", "") + "원";
}