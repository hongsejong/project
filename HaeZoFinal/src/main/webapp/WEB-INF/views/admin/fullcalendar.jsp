<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <link href='../../../resources/fullcalendar/main.css' rel='stylesheet' />

    <script>
        // IndexedDB 설정
        const DB_NAME = "event_calendar";
        const STORE_NAME = "events";
      
        function openDB() {
          return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = () => {
              const db = request.result;
              if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
              }
            };
          });
        }
      
        function saveEventToDB(eventData) {
          openDB().then(db => {
            const tx = db.transaction(STORE_NAME, "readwrite");
            const store = tx.objectStore(STORE_NAME);
            store.add(eventData);
          });
        }
      
        function loadEventsFromDB() {
          return openDB().then(db => {
            return new Promise((resolve, reject) => {
              const tx = db.transaction(STORE_NAME, "readonly");
              const store = tx.objectStore(STORE_NAME);
              const request = store.getAll();
              request.onsuccess = () => resolve(request.result);
              request.onerror = () => reject(request.error);
            });
          });
        }
      
        document.addEventListener('DOMContentLoaded', function () {
          const calendarEl = document.getElementById('calendar');
      
          //  먼저 DB에서 이벤트 불러오기  그 후 캘린더 초기화
          loadEventsFromDB().then(eventsFromDB => {
            const calendar = new FullCalendar.Calendar(calendarEl, {
              locale: 'ko',
              headerToolbar: {
                left: 'prevYear,prev,next,nextYear today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              },
              selectable: true,
              selectMirror: true,
              navLinks: true,
              editable: true,
              dayMaxEvents: true,
              dayCellContent: function(arg) {
                return { html: arg.date.getDate().toString() }; // '일' 제거
              },
              events: eventsFromDB, // IndexedDB에서 불러온 이벤트 적용
      
              // 일정 등록
              select: function (arg) {
                Swal.fire({
                  html: "<div class='mb-3'>일정을 등록하시겠습니까?</div><div class='fw-bold mb-2'>일정 이름:</div><input type='text' class='form-control' name='event_name' />",
                  icon: "info",
                  showCancelButton: true,
                  buttonsStyling: false,
                  confirmButtonText: "등록",
                  cancelButtonText: "취소",
                  customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                  }
                }).then(function (result) {
                  if (result.value) {
                    const title = document.querySelector("input[name='event_name']").value;
                    if (title) {
                      const newEvent = {
                        title: title,
                        start: arg.startStr,
                        end: arg.endStr,
                        allDay: arg.allDay
                      };
                      calendar.addEvent(newEvent);     // UI에 추가
                      saveEventToDB(newEvent);         // IndexedDB에 저장
                    }
                    calendar.unselect();
                  } else if (result.dismiss === "cancel") {
                    Swal.fire({
                      text: "일정 등록이 취소되었습니다",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "확인",
                      customClass: {
                        confirmButton: "btn btn-primary"
                      }
                    });
                  }
                });
              },
      
              //  일정 삭제
              eventClick: function (arg) {
                Swal.fire({
                  text: "일정을 지우시겠습니까?",
                  icon: "warning",
                  showCancelButton: true,
                  buttonsStyling: false,
                  confirmButtonText: "지우기",
                  cancelButtonText: "취소",
                  customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                  }
                }).then(function (result) {
                  if (result.value) {
                    arg.event.remove(); // 화면에서 삭제
                    //  IndexedDB 삭제는 아직 없음. 
                  } else if (result.dismiss === "cancel") {
                    Swal.fire({
                      text: "일정이 삭제되지 않았습니다",
                      icon: "error",
                      buttonsStyling: false,
                      confirmButtonText: "확인",
                      customClass: {
                        confirmButton: "btn btn-primary"
                      }
                    });
                  }
                });
              }
            });
      
            calendar.render(); //  이벤트 불러온 뒤에 렌더링
          });
        });
      </script>
      
  </head>
  <body>
    <div id='calendar'></div>
  </body>
  <script src='../../../resources/fullcalendar/main.js'></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/locales-all.min.js"></script>

</html>