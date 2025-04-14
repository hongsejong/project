console.log("chargePoint.js");

const container1 = document.getElementById("radio-container1");
const totalAmountDisplay1 = document.getElementById("totalAmountDisplay1");
const quantityInput1 = document.getElementById("quantity1");

// 금액 선택 라디오 버튼 동적 생성
for (let i = 10000; i <= 100000; i += 10000) {
    const radio1 = document.createElement("input");
    radio1.classList.add("input");
    radio1.type = "radio";
    radio1.id = `charge-price-${i}`;
    radio1.name = "charge-price";
    radio1.value = i;

    const label1 = document.createElement("label");
    label1.setAttribute("for", `charge-price-${i}`);
    label1.className = "price-label";
    label1.textContent = `${i.toLocaleString()}원`;

    // 왼쪽(10,000원~50,000원) vs 오른쪽(60,000원~100,000원) 배치
    const wrapper1 = document.createElement("div");
    wrapper1.className = i <= 50000 ? "price-item left" : "price-item right";
    wrapper1.appendChild(radio1);
    wrapper1.appendChild(label1);

    container1.appendChild(wrapper1);

    // 라디오 버튼 선택 시 총 결제 금액 업데이트
    radio1.addEventListener("change", updateTotalAmount1);
}

// 변경 버튼 클릭 시 수량 적용
document.getElementById("updateQuantity1").addEventListener("click", updateTotalAmount1);

// 총 결제 금액 업데이트 함수
function updateTotalAmount1() {
    const selectedPrice1 = document.querySelector('input[name="charge-price"]:checked');
    const quantity1 = parseInt(quantityInput1.value);

    if (selectedPrice1) {
        const totalAmount1 = selectedPrice1.value * quantity1;
        totalAmountDisplay1.textContent = `총 금액 : ${totalAmount1.toLocaleString()}원`;
    } else {
        totalAmountDisplay1.textContent = "총 금액: 0원";
    }
}

function resetForm1() {
    // 1. 모든 라디오 버튼 초기화
    const radios1 = document.querySelectorAll('input[type="radio"]');
    radios1.forEach(radio => {
        radio.checked = false; // 라디오 버튼 체크 해제
    });
    // 2. 수량 입력값 초기화
    quantityInput1.value = "1"; // 수량 입력 초기화
    totalAmountDisplay1.textContent = "총 금액: 0원"; // 총 금액 초기화
}

// 결제 버튼 클릭 이벤트
document.getElementById("chargeBtn").addEventListener("click", function() {
    const selectedPrice1 = document.querySelector('input[name="charge-price"]:checked');
    const quantity1 = parseInt(quantityInput1.value);

    if (!selectedPrice1) { // 금액 선택 안 하고 결제하기 버튼 클릭할 경우
        alert("금액을 선택해주세요!");
        return;
    }

    const totalAmount1 = Number(selectedPrice1.value * quantity1);

    // 결제 화면 이동
    const payUrl = "/checkout?totalAmount=" + totalAmount1;
    openPopup(payUrl, "payPop", "width=700,height=715,top=50,left=600");
});