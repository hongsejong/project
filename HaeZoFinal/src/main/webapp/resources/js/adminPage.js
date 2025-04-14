document.getElementById("adp-text").addEventListener("click", function(){

    location.href="/admin";

})
let sortableOn = false;
// div자리바꾸기 인덱스디비

const dbName = 'adminLayoutDB';
const storeName = 'layoutOrderStore';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onerror = () => reject('DB 열기 실패');
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            db.createObjectStore(storeName);
        };
    });
}

function saveOrderToDB(order) {
    openDB().then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put(order, 'layout');
        tx.oncomplete = () => console.log('IndexedDB에 저장됨:', order);
    });
}

function loadOrderFromDB() {
    return new Promise((resolve) => {
        openDB().then(db => {
            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const request = store.get('layout');
            request.onsuccess = () => resolve(request.result || []);
        });
    });
}

//  jQuery DOM 준비되었을 때 실행
$(document).ready(function () {
    let sortableOn = false;

    //  IndexedDB에서 저장된 순서 불러와 적용
    loadOrderFromDB().then(savedOrder => {
        if (savedOrder.length > 0) {
            const container = $('#sortable-wrap');
            const currentBoxes = {};
    
            // 기존 박스를 안전하게 복사
            container.find('.sortable-box').each(function () {
                const type = $(this).data('type');
                currentBoxes[type] = $(this).clone(true); //  이거해야함
            });
    
            container.empty();
    
            //  저장된 순서대로 다시 배치
            savedOrder.forEach(type => {
                if (currentBoxes[type]) {
                    container.append(currentBoxes[type]);
                }
            });
        }
    });

    //  설정 버튼 클릭 시 드래그 정렬 활성화 및 저장
    $('#settingBtn').click(function () {
        if (!sortableOn) {
            $('#sortable-wrap').sortable({
                placeholder: 'sortable-placeholder',
                opacity: 0.8,
                revert: true,

                update: function () {
                    const newOrder = [];
                    $('#sortable-wrap .sortable-box').each(function () {
                        newOrder.push($(this).data('type'));
                    });
                    saveOrderToDB(newOrder);
                    alert('순서 저장 완료!');
                }
            }).disableSelection();

            alert('순서 변경 모드가 활성화되었습니다.');
            sortableOn = true;
        }
    });
});



document.getElementById("bun").addEventListener("click", function(){
    // 우측 영역 및 기존 콘텐츠 저장
    const rightContainer = document.getElementById("right");
    const originalRightContent = rightContainer.innerHTML;
    rightContainer.innerHTML = "";

    // 차트 컨테이너 생성 (크기 조절 CSS 적용)
    const chartContainer = document.createElement("div");
    chartContainer.id = "chartContainer";
    chartContainer.style.width = "1000px";
    chartContainer.style.height = "600px";

    // Chart.js를 위한 canvas 요소 생성
    const canvas = document.createElement("canvas");
    canvas.id = "analysisChart";
    chartContainer.appendChild(canvas);


    // 차트 컨테이너를 우측 영역에 추가
    rightContainer.appendChild(chartContainer);

    // 백엔드 /chart 엔드포인트에서 데이터 fetch
    fetch('/chart')
        .then(response => response.json())
        .then(data => {
            console.log("전체 데이터:", data);
    

            // inquiryData와 newPostData에서 각각 날짜 추출
            const inquiryDates = data.inquiryData.map(item => item.INQUIRY_DATE);
            const newPostDates = data.newPostData.map(item => item.INQUIRY_DATE);

            // 두 날짜 배열의 합집합(중복 제거)
            const unionDatesSet = new Set([...inquiryDates, ...newPostDates]);
            // 날짜 문자열(YYYY-MM-DD)이라면 정렬도 가능
            const labels = Array.from(unionDatesSet).sort();

            // 각 날짜별 문의 횟수와 새글 횟수를 매핑 (해당 날짜 데이터가 없으면 0)
            const inquiryCounts = labels.map(date => {
                const found = data.inquiryData.find(item => item.INQUIRY_DATE === date);
                return found ? found.INQUIRYCOUNT : 0;
            });
            const newPostCounts = labels.map(date => {
                const found = data.newPostData.find(item => item.INQUIRY_DATE === date);
                return found ? found.INQUIRYCOUNT : 0;
            });

            // Chart.js 차트 생성
            const ctx = canvas.getContext('2d');
            if(window.myChart) {
                window.myChart.destroy();
            }
            window.myChart = new Chart(ctx, {
                type: 'line', // line bar radar doughnut pie polarArea bubble scatter
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '문의 횟수',
                            data: inquiryCounts,
                            borderColor: 'blue',
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 4,
                            pointHoverRadius: 7,
                            pointBackgroundColor: 'blue',
                            pointHoverBackgroundColor: '#007BFF'
                        },
                        {
                            label: '새글 횟수',
                            data: newPostCounts,
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                            fill: true,
                            tension: 0.4,
                            pointRadius: 4,
                            pointHoverRadius: 7,
                            pointBackgroundColor: 'red',
                            pointHoverBackgroundColor: '#FF4C4C'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: '최근 10일 문의 및 새글 횟수',
                            font: { size: 18 }
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                font: { size: 14 }
                            },
                            grid: { display: false }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                font: { size: 14 }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('데이터 로딩 실패:', error));


});



document.getElementById("calendarBtn").addEventListener("click", function () {
    const rightContainer = document.getElementById("right");
    rightContainer.innerHTML = ""; // 기존 내용 비우기

    const iframe = document.createElement("iframe");
    iframe.src = "/fullcalendar";
    iframe.style.width = "100%";
    iframe.style.height = "1000px"; 
    iframe.style.border = "none";

    rightContainer.appendChild(iframe);
});





//시계
function updateClock() {
    const clockEl = document.getElementById("clock");
    if (!clockEl) return; //  clock이 없으면 아무것도 안 함 (에러 방지)
  
    const now = new Date();
    const formatted =
      now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0') + ' ' +
      String(now.getHours()).padStart(2, '0') + ':' +
      String(now.getMinutes()).padStart(2, '0') + ':' +
      String(now.getSeconds()).padStart(2, '0');
  
    clockEl.textContent = formatted;
  }

  updateClock(); // 최초 실행
  setInterval(updateClock, 1000); // 1초마다 반복


  //문의목록
  document.getElementById("inquiry2").addEventListener("click",function(){
    location.href="/inquiryList";
  })
  //문의목록
  document.getElementById("singo2").addEventListener("click",function(){
    location.href="/singo";
  })


  document.getElementById("adminChatBtn").addEventListener("click", function () {
    
    console.log("1:1 채팅 관리 클릭됨");
  
    const right = document.getElementById("right");
  
    // 이미 iframe이 있으면 제거
    const existingFrame = document.getElementById("chattingFrame");
    if (existingFrame) existingFrame.remove();
  
    // iframe 생성
    const iframe = document.createElement("iframe");
    iframe.id = "chattingFrame";
    iframe.src = "/chatting"; //  채팅 JSP 경로
    iframe.style.width = "100%";
    iframe.style.height = "1200px";
    iframe.style.border = "none";
  
    // right 영역에 삽입
    right.innerHTML = ""; // 기존 내용 제거
    right.appendChild(iframe);

    // 음성인식 버튼 생성
  const micBtn = document.createElement("button");
  micBtn.innerText = " 음성 녹음 시작";
  micBtn.style.margin = "10px";
  micBtn.style.padding = "8px 16px";
  micBtn.style.fontSize = "16px";
  micBtn.style.cursor = "pointer";
  micBtn.style.backgroundColor = "#4CAF50";
  micBtn.style.color = "white";
  micBtn.style.border = "none";
  micBtn.style.borderRadius = "5px";

  // 음성인식 이벤트 연결
  micBtn.addEventListener("click", () => {
    startVoiceRecognition();
  });
    // 마지막 메시지 읽기 버튼 생성
  const readLastBtn = document.createElement("button");
  readLastBtn.innerText = "📢 마지막 메시지 읽기";
  readLastBtn.style.margin = "10px";
  readLastBtn.style.padding = "8px 16px";
  readLastBtn.style.fontSize = "16px";
  readLastBtn.style.cursor = "pointer";
  readLastBtn.style.backgroundColor = "#FF9800";
  readLastBtn.style.color = "white";
  readLastBtn.style.border = "none";
  readLastBtn.style.borderRadius = "5px";

// 버튼 클릭 시: iframe 안에서 마지막 메시지 찾아서 읽어줌
readLastBtn.addEventListener("click", () => {
  const iframe = document.getElementById("chattingFrame");
  if (!iframe || !iframe.contentWindow) return;

  const chatElems = iframe.contentWindow.document.querySelectorAll(".display-chatting .chat");
  if (chatElems.length === 0) {
    alert("읽을 메시지가 없습니다.");
    return;
  }

  const lastChat = chatElems[chatElems.length - 1];
  const text = lastChat.innerText;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "ko-KR";
  msg.pitch = 1;
  msg.rate = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
});

// 버튼 붙이기
right.appendChild(readLastBtn);


  right.appendChild(micBtn);
  right.appendChild(iframe);
  });


  function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR"; // 한국어 인식
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
    alert(" 음성 인식이 시작되었습니다. 말씀해 주세요.");
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("인식된 텍스트:", transcript);
  
      // 채팅 iframe 안의 입력창에 값 입력
      const iframe = document.getElementById("chattingFrame");
      if (iframe && iframe.contentWindow) {
        const textarea = iframe.contentWindow.document.getElementById("inputChatting");
        if (textarea) {
          textarea.value = transcript;
          textarea.focus();
        }
      }
    };
  
    recognition.onerror = (event) => {
      console.error("음성 인식 오류:", event.error);
      alert("음성 인식 도중 오류가 발생했습니다: " + event.error);
    };
  
    recognition.onend = () => {
      console.log("음성 인식 종료");
    };
  }

// 숫자카운트
window.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('today-count');
    const target = parseInt(counter.getAttribute('data-count'), 10);
    const duration = 1500; // 전체 시간(ms)
  
    let start = null;
  
    const easeOut = t => 1 - Math.pow(1 - t, 3); // 처음 빠르고 점점 느려짐
  
    const animate = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1); // 0 ~ 1 사이
      const easedProgress = easeOut(progress);
      const value = Math.floor(easedProgress * target);
  
      counter.innerText = value.toLocaleString();
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.innerText = target.toLocaleString(); // 최종 값 
      }
    };
  
    requestAnimationFrame(animate);
  });
  