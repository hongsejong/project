package edu.kh.haezo.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.haezo.board.model.dao.RequestBoardDAO;
import edu.kh.haezo.board.model.dto.BoardSearch;
import edu.kh.haezo.board.model.dto.RequestBoard;
import edu.kh.haezo.board.model.dto.RequestPagination;
import edu.kh.haezo.board.model.dto.RequestSupporter;

@Service
public class RequestBoardServiceImpl implements RequestBoardService{

	@Autowired
	private RequestBoardDAO dao;

	private final String authUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
	private final String consumerKey = "ad8ba9bf55ff45ce8527";
	private final String consumerSecret = "084f1f6f7ec648558300";
	
	
	// 캐시형 accessToken (옵션)
    private String accessToken = null;

    // 토큰 발급 메서드
    public String getAccessToken() {
        // 이미 있으면 재사용
        if (accessToken != null) return accessToken;

        String url = authUrl + "?consumer_key=" + consumerKey + "&consumer_secret=" + consumerSecret;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> res = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> result = (Map<String, Object>) res.getBody().get("result");
        accessToken = result.get("accessToken").toString();
        System.out.println("✔ 발급된 accessToken: " + accessToken);
 
        return accessToken;
    }

	//	시도 조회
    private final String stageUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json";

    public List<Map<String, String>> getRegionList(String cd) {
        String token = getAccessToken();
        String url = stageUrl + "?accessToken=" + token;
        if (cd != null && !cd.isEmpty()) {
            url += "&cd=" + cd;
        }

        RestTemplate rest = new RestTemplate();
        ResponseEntity<String> response = rest.getForEntity(url, String.class); // JSON 원문으로 받기
        String jsonString = response.getBody();

//        System.out.println("✔ SGIS 응답 원문:\n" + jsonString);

        List<Map<String, String>> regionList = new ArrayList<>();

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> parsed = mapper.readValue(jsonString, Map.class);

            if (parsed.get("result") == null) {
                System.out.println("❗ result 필드 없음");
                throw new RuntimeException("SGIS result 필드 없음");
            }

            List<Map<String, Object>> result = (List<Map<String, Object>>) parsed.get("result");

            for (Map<String, Object> item : result) {
                Map<String, String> map = new HashMap<>();
                map.put("cd", item.get("cd").toString());
                map.put("name", item.get("addr_name") != null ? item.get("addr_name").toString() : "");
                regionList.add(map);
            }



        } catch (Exception e) {
            e.printStackTrace();
        }

        return regionList;
    }


    @Override
    public List<Map<String, String>> getSidoList() {
        return getRegionList(null);
    }

    @Override
    public List<Map<String, String>> getSigunguList(String sidoCd) {
        return getRegionList(sidoCd);
    }

    @Override
    public List<Map<String, String>> getEmdongList(String sigunguCd) {
        return getRegionList(sigunguCd);
    }


    
    
//	의뢰 요청 게시판 목록조회
	@Override
	public Map<String, Object> selectRequestBoardList(int categoryId, int cp) {

		int requestBoardListcount = dao.requestBoardListCount(categoryId);

		RequestPagination pagination = new RequestPagination(cp, requestBoardListcount);

		List<RequestBoard> requestBoardList = dao.selectRequestBoardList(categoryId, pagination);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("requestBoardList", requestBoardList);
		map.put("pagination", pagination);
		return map;

	}

	//	의뢰 요청 게시판 상세조회
	@Override
	public RequestBoard requestBoardDetail(Map<String, Object> map) {
		RequestBoard requestBoard = dao.requestBoardDetail(map);
		return requestBoard;
	}


	// 요청글 삽입
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertRequestBoard(RequestBoard requestBoard) {
	
		int boardNo  = dao.insertBoard(requestBoard);
		int result = 0;
		if (boardNo != 0) {
			requestBoard.setBoardNo(boardNo);
			result = dao.insertRequestBoard(requestBoard);
			if (result != 0) {
				result = boardNo;
			}
		}
		return result;
		
	}
	
//	요청글 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateRequestBoard(RequestBoard requestBoard) {
		int result = dao.updateBoard(requestBoard);
		if (result != 0) {
			System.out.println("게시글 수정은 성공함");
			result = dao.updateRequestBoard(requestBoard);
		}
		System.out.println("성공했니? " + result);
		return result;
	}

	//	요청글 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteRequestBoard(int boardNo) {
		return dao.deleteRequestBoard(boardNo);
	}
	

//	요청글 검색
	@Override
	public Map<String, Object> searchRequestBoardList(BoardSearch boardSearch, int cp) {

		int requestBoardListcount = dao.searchRequestBoardListCount(boardSearch);

		RequestPagination pagination = new RequestPagination(cp, requestBoardListcount);

		List<RequestBoard> requestBoardList = dao.serachSelectRequestBoardList(boardSearch, pagination);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("requestBoardList", requestBoardList);
		map.put("pagination", pagination);

		return map;
	}
	
//	요청글 조력자 모두 조회
	@Override
	public List<RequestSupporter> selectRequestSupporter(int boardNo) {
		return dao.selectRequestSupporter(boardNo);
	}
	
//	요청글 선택한 조력자 조회
	@Override
	public RequestSupporter acceptRequestSupporter(int boardNo) {
		return dao.acceptRequestSupporter(boardNo);
	}
	
//	리뷰 개수 조회
	@Override
	public int reviewCount(int boardNo) {
		return dao.reviewCount(boardNo);
	}
	
}
