package edu.kh.haezo.board.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.kh.haezo.board.model.dto.BoardSearch;
import edu.kh.haezo.board.model.dto.RequestBoard;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.service.RequestBoardService;
import edu.kh.haezo.member.model.dto.Member;

@Controller
@RequestMapping("/requestBoard")
@SessionAttributes({"loginMember","map","requestBoard"})
public class RequestBoardController {

	@Autowired
	private RequestBoardService service;
	
// 게시글 목록 조회
	@GetMapping("/{categoryId}")
	public String requestBoardListAll(@PathVariable("categoryId") int categoryId
			, @RequestParam(value="cp", required = false, defaultValue = "1") int cp
			, @RequestParam(value="query", required=false) String query
			, @RequestParam Map<String, Object> paramMap, // 전달받은 파라미터들
			Model model) {
		
			Map<String, Object> map = service.selectRequestBoardList(categoryId, cp);
			map.put("categoryId", categoryId);
			model.addAttribute("map", map);
				
		return "board/requestBoardList";
	}
	
//	게시글 상세 조회
	@GetMapping("/{categoryId}/{boardNo}")
	public String boardDetail(@PathVariable("categoryId") int categoryId, @PathVariable("boardNo") int boardNo, 
											@RequestParam(value="cp", required = false, defaultValue = "1") int cp, 
											Model model // 데이터 전달용 객체
											, RedirectAttributes ra, 
											@SessionAttribute(value="loginMember", required=false) Member loginMember,  
											// 세션에서 loginMember 얻어와서 회원 정보 저장, 없는 경우 null
											HttpServletRequest req, HttpServletResponse resp) throws ParseException, JsonProcessingException {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("categoryId", categoryId);
		map.put("boardNo", boardNo);
		
//		게시글 상세 조회 서비스 호출
		RequestBoard requestBoard = service.requestBoardDetail(map);

//	requestBoardDetail 페이지
		String path = null;
		if (requestBoard != null) { //	조회 결과가 있을 경우
		
			List<RequestSupporter> requestSupporterArr = service.selectRequestSupporter(boardNo);
			RequestSupporter acceptRequestSupporter = service.acceptRequestSupporter(boardNo);
			int reviewCount = service.reviewCount(boardNo);
			int checkAcceptSupport = 0;
			int checkAlreadySupport = 0;
			int checkLoginMemberEqualsRequester = 0;
			if (requestSupporterArr != null && !requestSupporterArr.isEmpty()) {
			    for (RequestSupporter rs : requestSupporterArr) {
			        if (rs.getRequestConfirm().equals("Y")) {
			            checkAcceptSupport = 1;
			        }
			        if (loginMember != null) {
			        	
			        	if ((rs.getMemberNo() == loginMember.getMemberNo()) || 
			        			(requestBoard.getMemberNo() == loginMember.getMemberNo())) {
			        		checkAlreadySupport = 1;
			        		model.addAttribute("checkSupporterNo", rs.getMemberNo());
			        		model.addAttribute("loginMemberSupporterNo", rs.getSupporterNo());
			        	}
			        }
			    }
			}

			ObjectMapper mapper = new ObjectMapper();
			String requestSupportersJson = mapper.writeValueAsString(requestSupporterArr);
			
			model.addAttribute("requestBoard", requestBoard);
			model.addAttribute("categoryId", categoryId);
			model.addAttribute("checkAlreadySupport", checkAlreadySupport);
			model.addAttribute("requestSupporterArr", requestSupporterArr);
			model.addAttribute("requestSupportersJson", requestSupportersJson);
			model.addAttribute("acceptRequestSupporter", acceptRequestSupporter);
			model.addAttribute("reviewCount", reviewCount);
			model.addAttribute("checkAcceptSupport", checkAcceptSupport);
			model.addAttribute("checkLoginMemberEqualsRequester", checkLoginMemberEqualsRequester);
			path= "board/requestBoardDetail"; // requestBoardDetail 페이지 forward
		} else {
//		조회 결과가 없을 경우
//		해당 게시판 목록 첫 페이지
			String message = "해당 게시글이 존재하지 않습니다.";
			ra.addFlashAttribute("message", message);
			path= "redirect:/requestBoard/"+categoryId;
			
		}
		return path;
		
	}
	
	//	시도, 시군구 얻어오기
	@GetMapping(value = "/region/sido", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Map<String, String>> getSidoList() {
		return service.getSidoList();
	}

	@GetMapping(value = "/region/sigungu", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Map<String, String>> getSigunguList(@RequestParam("cd") String sidoCode) {
		return service.getSigunguList(sidoCode);
	}

	@GetMapping(value = "/region/emdong", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Map<String, String>> getEmdongList(@RequestParam("cd") String sigunguCode) {
		return service.getEmdongList(sigunguCode);
	}
	
	
//	요청글 검색
	@GetMapping("/search")
	public String selectBoardList(@RequestParam(value="cp", required = false, defaultValue = "1") int cp
														,BoardSearch boardSearch, // 전달받은 파라미터들
														Model model) {
		
		Map<String, Object> map = new HashMap<String, Object>();
			
//	게시글 목록 조회 서비스 호출
		map = service.searchRequestBoardList(boardSearch, cp);
		
//	조회 결과를 request scope에 세팅 후 forward
		map.put("querySearch", boardSearch.getQuery());
		map.put("searchCategory", boardSearch.getHiddenSearchCategory());
		model.addAttribute("map", map);
		map.put("categoryId", boardSearch.getHiddenCategoryId());
		
		return "/board/requestBoardList";

	}
	
	
}