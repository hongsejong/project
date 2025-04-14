package edu.kh.haezo.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.dto.Review;
import edu.kh.haezo.main.model.service.MainService;

@Controller
@SessionAttributes({"freeBoardCode", "requestBoardCode"})
public class MainController {
	
	@Autowired
	private MainService service;
	
	// 메인 페이지 화면 전환 및 각 컨테이너별 목록 조회
	@RequestMapping("/")
	public String mainForward(Model model) {
		Map<String, Object> mainMap = new HashMap<String, Object>();
		// 1) 최신 의뢰 게시글 목록 조회
		List<Board> recentRqList = service.selectRecentRqList();
		mainMap.put("requestList", recentRqList);
		
		// 2) 최신 의뢰 리뷰 목록 조회(평점 4점 이상)
		List<Review> recentRvList = service.selectRecentRvList();
		mainMap.put("recentRvList", recentRvList);
		
		// 3) 자유게시판 인기글 목록 조회(좋아요 많은 순)
		List<Board> mostBoardLikeList = service.selectMostBoardLikeList();
		mainMap.put("mostBoardLikeList", mostBoardLikeList);
		
		// 4) 카테고리별 상위 조력자 목록 조회(카테고리 아이디 순)
		List<RequestSupporter> popularSupporterList = service.selectpopularSupporterList();
		mainMap.put("popularSupporterList", popularSupporterList);
		
		// 5) 최상위 조력자 목록 조회(조건: 의뢰 완료 개수 1회 이상 / 평균 별점 높은 순&조력자 NO 최신 순)
		List<RequestSupporter> topSupporterList = service.selecttopSupporterList();
		mainMap.put("topSupporterList", topSupporterList);
		
		// 6) 마이 페이지 자유게시판 게시글 목록 조회를 위한 boardCode(3) 조회
		int boardCode1 = service.selectFreeBoardCode();
		model.addAttribute("freeBoardCode", boardCode1);
		
		// 7) 마이 페이지 의뢰게시판 게시글 목록 조회를 위한 boardCode(5) 조회
		int boardCode2 = service.selectRequestBoardCode();
		model.addAttribute("requestBoardCode", boardCode2);
		
		model.addAttribute("mainMap", mainMap);
		return "common/main";
	}
	
	// 카테고리별 최신 의뢰 게시글 목록 조회(ajax)
	@GetMapping("/main/latestRequestList")
	@ResponseBody
	public List<Board> latestRequestList(@RequestParam String categoryIndex){
		int cgIndex = Integer.parseInt(categoryIndex);
		return service.selectlatestRequestList(cgIndex);
	}
	
	// 카테고리별 인기 조력자 목록 조회(ajax)
	@GetMapping("/main/cgPopularSupporterList")
	@ResponseBody
	public List<RequestSupporter> cgPopularSupporterList(@RequestParam String categoryIndex){
		int cgIndex = Integer.parseInt(categoryIndex);
		return service.selectcgPopularSupporterList(cgIndex);
	}
	
}	