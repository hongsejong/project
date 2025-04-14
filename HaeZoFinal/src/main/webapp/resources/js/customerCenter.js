document.addEventListener("DOMContentLoaded", function(){
    // 모든 details 요소 선택
    const details = document.querySelectorAll("details");
    
    details.forEach((targetDetail) => {
      targetDetail.addEventListener("toggle", () => {
        // 현재 details가 열렸다면
        if (targetDetail.open) {
          // 다른  details  닫기
          details.forEach((detail) => {
            if (detail !== targetDetail && detail.open) {
              detail.open = false;
            }
          });
        }
      });
    });
  });
//innerHtml로 새로 만들어진 애들 이벤트리스너 달기
  function bindDetailsToggle() {
    const details = document.querySelectorAll("details");
    details.forEach((targetDetail) => {
      targetDetail.addEventListener("toggle", () => {
        if (targetDetail.open) {
          details.forEach((detail) => {
            if (detail !== targetDetail && detail.open) {
              detail.open = false;
            }
          });
        }
      });
    });
  }

const qcon=document.getElementById("qcon");
document.getElementById("tab1").addEventListener("click",function(){
    qcon.innerHTML="";

    qcon.innerHTML=`
    <div class="qdiv">
    <details>
        <summary>[서비스 소개] 해조 서비스가 처음이신가요?</summary>
                <pre class="s-div">안녕하세요, 해조에 오신 여러분을 환영합니다.

해조는 각 분야의 전문가가 제공하는 서비스와 상품을 편리하고 안전하게 거래할 수 있는 프리랜서 마켓입니다.

조력자가 제공하는 서비스가 카테고리별로 나누어져 있으며 원하는 '카테고리'를 선택하시면 관련된 서비스 목록만 확인하실 수 있습니다.

조력자는 판매할 의사가 있는 서비스를 크몽에 등록하거나 관련 정보를 프로필에 등록한 회원을 의미합니다.

의뢰인은 전문가의 서비스를 탐색하고 구매하는 회원을 의미합니다.</pre>
            </details>
</div>
<div class="qdiv">
    <details>
      <summary>[서비스 소개] 해조의 주요 서비스는 무엇인가요?</summary>
      <pre class="s-div">
해조는 다양한 분야의 전문가들이 제공하는 서비스를 한 곳에서 만날 수 있는 플랫폼입니다.

주요 서비스로는 디자인, IT 개발, 마케팅, 번역 등 여러 전문 영역의 서비스가 있으며,

각 서비스는 상세 페이지에서 전문가의 경력과 고객 후기를 통해 신뢰성을 확인할 수 있습니다.
      </pre>
    </details>
  </div>
  
  <!-- 추가 2: 해조 이용 시 혜택에 대한 질문과 답변 -->
  <div class="qdiv">
    <details>
      <summary>[서비스 소개] 해조 이용 시 어떤 혜택이 있나요?</summary>
      <pre class="s-div">
해조를 이용하면 검증된 전문가의 서비스를 합리적인 가격에 이용할 수 있습니다.

또한, 안전한 거래 시스템과 신뢰할 수 있는 고객 후기 시스템을 통해 최적의 서비스를 선택할 수 있으며,

빠른 고객 지원을 받아 보다 편리하게 이용하실 수 있습니다.
      </pre>
    </details>
  </div>
  
  <!-- 추가 3: 해조에서 전문가 선택 방법에 대한 질문과 답변 -->
  <div class="qdiv">
    <details>
      <summary>[서비스 소개] 해조에서 전문가를 어떻게 선택하나요?</summary>
      <pre class="s-div">
해조에서는 전문가의 프로필, 경력, 그리고 실제 고객 후기를 종합적으로 확인할 수 있습니다.

또한, 상세 페이지에서 제공되는 상담 기능을 통해 직접 문의하고 비교하여,

자신의 요구사항에 가장 적합한 전문가를 선택할 수 있도록 도와드립니다.
      </pre>
    </details>
  </div>
`
bindDetailsToggle();

});
document.getElementById("tab2").addEventListener("click",function(){
    qcon.innerHTML="";
    qcon.innerHTML=`
    <div class="qdiv">
  <details>
    <summary>[회원정보] 내 정보를 어떻게 확인하나요?</summary>
    <pre class="s-div">
회원정보 페이지에서는 프로필, 가입일, 최근 활동 내역 등 기본 정보를 확인할 수 있습니다.
로그인 후 '회원정보' 메뉴를 클릭하면 상세 정보와 업데이트 내역을 쉽게 확인할 수 있습니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[회원정보] 비밀번호는 어떻게 변경하나요?</summary>
    <pre class="s-div">
비밀번호 변경은 '회원정보' 내 '내 정보 수정' 페이지에서 진행됩니다.
현재 비밀번호를 입력한 후, 새 비밀번호와 확인을 입력하고 저장 버튼을 클릭하면 변경이 완료됩니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[회원정보] 내 프로필 정보는 어떻게 수정하나요?</summary>
    <pre class="s-div">
회원정보 페이지에서 이름, 이메일, 전화번호 등 개인 정보를 수정할 수 있습니다.
프로필 수정 버튼을 클릭하여 변경 사항을 입력한 후 저장하면 최신 정보로 업데이트됩니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[회원정보] 회원 탈퇴는 어떻게 진행되나요?</summary>
    <pre class="s-div">
회원 탈퇴는 '회원정보' 페이지 하단 또는 별도의 '회원 탈퇴' 메뉴를 통해 진행됩니다.
탈퇴 전에 모든 데이터를 백업하시고, 탈퇴 시 즉시 서비스 이용이 중지되며 재가입이 어려울 수 있으므로 신중히 결정해 주세요.
    </pre>
  </details>
</div>`;
bindDetailsToggle();
});
document.getElementById("tab3").addEventListener("click",function(){
    qcon.innerHTML="";
    qcon.innerHTML=`
    <div class="qdiv">
  <details>
    <summary>[이용 방법] 해조 서비스 이용은 어떻게 시작하나요?</summary>
    <pre class="s-div">
해조 서비스 이용은 먼저 회원가입과 로그인을 통해 시작됩니다.
로그인 후, 원하는 서비스 카테고리를 선택하여 전문가들의 프로필 및 후기를 확인한 뒤 상담 요청을 하실 수 있습니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[이용 방법] 주문 및 상담 절차는 어떻게 진행되나요?</summary>
    <pre class="s-div">
주문 및 상담 절차는 다음과 같이 진행됩니다:
1. 전문가 선택: 원하는 분야의 전문가 프로필을 확인합니다.
2. 상담 요청: 서비스 상세 내용과 요구사항을 전달합니다.
3. 견적 및 계약: 전문가로부터 견적을 받고, 상담 후 계약을 체결합니다.
4. 결제 및 서비스 시작: 결제를 완료하면 서비스가 진행됩니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[이용 방법] 서비스 진행 상황은 어떻게 확인하나요?</summary>
    <pre class="s-div">
서비스 진행 상황은 내 주문 내역 및 상담 채팅창을 통해 확인할 수 있습니다.
전문가와의 실시간 소통을 통해 현재 진행 단계와 예상 완료 시점을 파악하실 수 있습니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[이용 방법] 서비스 완료 후 피드백은 어떻게 남기나요?</summary>
    <pre class="s-div">
서비스 완료 후, 내 주문 내역 페이지에서 리뷰 작성 기능을 통해 피드백을 남길 수 있습니다.
피드백은 전문가 선택에 큰 도움이 되며, 다른 고객들에게도 유익한 정보를 제공합니다.
    </pre>
  </details>
</div>
`;
bindDetailsToggle();
})
document.getElementById("tab4").addEventListener("click",function(){
    qcon.innerHTML="";
    qcon.innerHTML=`<div class="qdiv">
  <details>
    <summary>[결제] 결제 방법은 무엇인가요?</summary>
    <pre class="s-div">
해조는 신용카드, 계좌이체, 모바일 결제 등 다양한 결제 수단을 지원합니다.
결제 과정에서 원하는 결제 수단을 선택하고, 결제 정보를 입력하면 안전하게 결제가 진행됩니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[결제] 결제 보안은 어떻게 보장되나요?</summary>
    <pre class="s-div">
모든 결제 과정은 SSL 암호화를 통해 안전하게 처리되며,
인증된 결제 대행사와의 협업으로 고객님의 결제 정보가 철저하게 보호됩니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[결제] 결제 후 취소/환불은 어떻게 진행되나요?</summary>
    <pre class="s-div">
결제 후 취소 및 환불은 결제 약관에 따라 진행됩니다.
일정 기간 내 취소 요청 시 환불이 가능하며, 자세한 사항은 고객센터 또는 결제 약관을 참고해 주세요.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[결제] 결제 관련 문의는 어디로 해야 하나요?</summary>
    <pre class="s-div">
결제와 관련된 모든 문의는 고객센터(전화 또는 온라인 문의)를 통해 접수할 수 있습니다.
문의 시 결제 번호와 상세 상황을 함께 전달해 주시면 빠른 답변을 받으실 수 있습니다.
    </pre>
  </details>
</div>
`;
bindDetailsToggle();
})
document.getElementById("tab5").addEventListener("click",function(){
    qcon.innerHTML="";
    qcon.innerHTML=`<div class="qdiv">
  <details>
    <summary>[취소/환불] 주문 취소는 어떻게 진행되나요?</summary>
    <pre class="s-div">
주문 취소는 고객센터를 통해 요청하실 수 있습니다.
주문 상태에 따라 자동 취소가 어려운 경우, 고객지원팀에서 확인 후 취소 처리가 진행됩니다.
취소 요청 시 주문번호와 취소 사유를 반드시 제출해 주세요.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[취소/환불] 환불 절차는 어떻게 되나요?</summary>
    <pre class="s-div">
환불은 주문 취소 승인이 완료된 후 진행됩니다.
일반적으로 환불 처리 기간은 결제 수단에 따라 3~5 영업일 정도 소요됩니다.
자세한 내용은 고객센터 및 결제 약관을 참고해 주세요.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[취소/환불] 취소/환불 시 수수료가 부과되나요?</summary>
    <pre class="s-div">
취소 및 환불 시 수수료 부과 여부는 주문의 상태와 결제 조건에 따라 달라집니다.
일부 경우에는 취소 수수료가 발생할 수 있으므로, 관련 약관을 미리 확인해 주세요.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[취소/환불] 결제 취소 시 주의사항은 무엇인가요?</summary>
    <pre class="s-div">
결제 취소 시 결제 내역이 즉시 반영되지 않을 수 있으니,
환불 완료 여부를 반드시 확인해 주세요.
또한, 일부 결제 수단은 환불 처리가 지연될 수 있으므로 주의하시기 바랍니다.
    </pre>
  </details>
</div>
`;
bindDetailsToggle();
})
document.getElementById("tab6").addEventListener("click",function(){
    qcon.innerHTML="";
    qcon.innerHTML=`
    <div class="qdiv">
  <details>
    <summary>[분쟁/패널티] 분쟁 발생 시 해결 방법은 무엇인가요?</summary>
    <pre class="s-div">
분쟁이 발생한 경우, 해조 고객센터에 신고하시면 담당 팀에서 상황을 검토하고,
전문가와 의뢰인 간의 중재를 통해 합리적인 해결 방안을 제시합니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[분쟁/패널티] 분쟁 신고 절차는 어떻게 진행되나요?</summary>
    <pre class="s-div">
분쟁 신고는 고객센터 온라인 신고 시스템 또는 전화를 통해 접수할 수 있습니다.
신고 접수 후, 관련 증빙 자료와 함께 상세한 상황 설명을 제출하면 담당자가 검토합니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[분쟁/패널티] 패널티 부과 기준은 무엇인가요?</summary>
    <pre class="s-div">
패널티는 서비스 이용 규정 위반 정도와 빈도, 피해 규모 등을 고려하여 부과됩니다.
경고부터 일시적 이용 제한, 최악의 경우 영구 탈퇴까지 다양한 조치가 적용될 수 있습니다.
    </pre>
  </details>
</div>

<div class="qdiv">
  <details>
    <summary>[분쟁/패널티] 분쟁 해결 소요 시간은 얼마나 걸리나요?</summary>
    <pre class="s-div">
분쟁 해결 소요 시간은 사안의 복잡성에 따라 다르지만,
대체로 신고 접수 후 3~5 영업일 이내에 중재 결과를 안내해 드립니다.
    </pre>
  </details>
</div>

    `;
    bindDetailsToggle();
})


document.querySelector(".search-box input").addEventListener("input", function(e) {
  const keyword = e.target.value.toLowerCase();
  const questions = document.querySelectorAll(".qdiv");

  questions.forEach(q => {
    const summaryText = q.querySelector("summary").innerText.toLowerCase();
    const answerText = q.querySelector(".s-div")?.innerText.toLowerCase() || "";
    
    if (summaryText.includes(keyword) || answerText.includes(keyword)) {
      q.style.display = "block";
    } else {
      q.style.display = "none";
    }
  });
});
