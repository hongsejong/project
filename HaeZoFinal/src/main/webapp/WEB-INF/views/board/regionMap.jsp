
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>지도 검색</title>
    <link rel="stylesheet" href="../../../resources/css/kds/header-style.css">
    <link rel="stylesheet" href="../../../resources/css/kds/footer-style.css">
    <link rel="stylesheet" href="../../../resources/css/kds/common-style.css">
    <link rel="stylesheet" href="../../../resources/css/kds/community.css">
    <link rel="stylesheet" href="../../../resources/css/kds/main-searchMap.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e1f4e88f1a2ae0857755b12f7859b566&autoload&autoload=false&libraries=services,clusterer"></script>
</head>
<body>

    <div class="container">
        <!-- 왼쪽 영역 -->
        <!-- 가운데 영역 -->
        <div class="main-content">
            <div class="top-side">
                <div id="selectBox-container">
                    <div id="selectBox-title">
                        <p>지역</p>
                    </div>
                    <div id="selectBox-content">
                        <div id="selectBox">
                            <form action="map" name="searchMap-form">
                                <select name="city" id="selectCity">
                                    <option disabled selected>----"시"를 선택해주세요----</option>
                                    <option name="city" value="서울">서울</option>
                                </select>
                                <select name="district" id="selectDis">
                                    <option disabled selected>----"자치구"를 선택해주세요----</option>
                                    <option name="district" value="강남">강남구</option>
                                    <option name="district" value="강동">강동구</option>
                                    <option name="district" value="강북">강북구</option>
                                    <option name="district" value="관악">관악구</option>
                                    <option name="district" value="동대문">동대문구</option>
                                    <option name="district" value="서대문">서대문구</option>
                                    <option name="district" value="성동">성동구</option>
                                    <option name="district" value="송파">송파구</option>
                                    <option name="district" value="영등포">영등포구</option>
                                    <option name="district" value="종로">종로구</option>
                                </select>
                                <button type="button" id="searchMapBtn">검색</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-side">
                <div id="bottom-title">
                    <p>지도</p>
                </div>
                <div id="bottom-content">
                    <!-- 지도 API 위치 -->
                    <div class="map_wrap">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
        </div> <!-- 가운데 끝 -->
    </div> <!-- container 끝 -->

    <script>
        const contextPath = "${contextPath}";
    </script>

    <!-- 지도 API -->
    
    <script type="text/javascript">
        kakao.maps.load(function() {
            var mapContainer = document.getElementById("map"), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(37.49900093963835, 127.03292560412343), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
            };
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch('서울시 강남구 테헤란로14길 6', function(result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });
                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;"><a href='https://khedu.co.kr/main/main.kh'>KH정보교육원</a></div>`
                    });
                    infowindow.open(map, marker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                } 
            })
            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            var mapTypeControl = new kakao.maps.MapTypeControl();
            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
            // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        });   
    </script>
    
    <!-- DB 정보로 지도 비동기화(ajax) -->
    <script type="text/javascript">
        
        const btn = document.getElementById("searchMapBtn");
        
        btn.addEventListener("click", function(){

            const city = document.getElementById("selectCity").value;
            const district = document.getElementById("selectDis").value;
            
            $.ajax({
                url : "map",
                data : {"city" : city, "district" : district},
                type: "POST",
                dataType: "JSON",
                success:function(map){ // 팝업스토어 정보 반환

                    var popStoreList = map.popStoreList;

                    if(popStoreList.length != 0){ // 반환 받은 팝업스토어 리스트만큼 반복
                        
                        var boardTitle = "";
                        var location = "";
                    
                        kakao.maps.load(function() {
                            var mapContainer = document.getElementById("map"), // 지도를 표시할 div 
                                mapOption = {
                                    center: new kakao.maps.LatLng(37.49900093963835, 127.03292560412343), // 지도의 중심좌표
                                    level: 3 // 지도의 확대 레벨
                            };
                            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
                            
                            // 주소-좌표 변환 객체를 생성합니다
                            var geocoder = new kakao.maps.services.Geocoder();
                        
                            for(let popStore of popStoreList){
                    
                                // 주소로 좌표를 검색합니다
                                geocoder.addressSearch(popStore.location, function(result, status) { // 팝업스토어 주소 좌표 검색
                                    // 정상적으로 검색이 완료됐으면 
                                    if (status === kakao.maps.services.Status.OK) {
                                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                                        // 결과값으로 받은 위치를 마커로 표시합니다
                                        var marker = new kakao.maps.Marker({
                                            map: map,
                                            position: coords
                                        });
                                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                                        var infowindow = new kakao.maps.InfoWindow({
                                            // 팝업스토어 이름 출력
                                            content: "<div style='width:150px;text-align:center;padding:6px 0;'>"+"<a href='${contextPath}/pop/board?no="+popStore.boardNo+"'>"+popStore.boardTitle+"</a>"+"</div>"
                                        });
                                        infowindow.open(map, marker);
                                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                                        map.setCenter(coords);
                                    } 
                                })
                            }
                            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
                            var mapTypeControl = new kakao.maps.MapTypeControl();
                            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
                            // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
                            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                            var zoomControl = new kakao.maps.ZoomControl();
                            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                        }) 
                    }
                },error:function(req){
                    console.log("허허..");
                    console.log(req.responseText);
                }
            })
        })


        function selectRegion(regionValue) {
            // 부모창에 함수가 정의되어 있다고 가정
            window.opener.setSelectedRegion(regionValue);
            // 선택이 끝나면 팝업 닫기
            window.close();
        }

        function setSelectedRegion(address) {
            // 예: 게시글 제목에 지역명 입력
            document.getElementById("boardTitle").value = address;

            // 필요하다면 다른 요소에도 반영 가능
            // document.getElementById("regionSpan").innerText = address;
        }
    </script>

</body>
</html>