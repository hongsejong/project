package edu.kh.haezo.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.haezo.board.model.dto.Pagination;
import edu.kh.haezo.board.model.dto.Review2;
import edu.kh.haezo.board.model.service.ReviewService2;

@Controller
public class ReviewController2 {

    @Autowired
    private ReviewService2 service;
    
    // 리뷰 상세 페이지
    @GetMapping("/reviewDetail")
    public String reviewDetail(@RequestParam("boardNo") int boardNo, Model model) {
        Review2 reviewDetail = service.getReviewDetail(boardNo);
        model.addAttribute("review", reviewDetail);
        return "board/requestCompleteReviewDetail"; // JSP: /WEB-INF/views/board/requestCompleteReviewDetail.jsp
    }
    
    // 완료된 리뷰 목록 페이지
    // 두 파라미터 모두 수용: helperId 우선, 그 다음 helperNick, 둘 다 없으면 전체 조회
    @GetMapping("/completeReviewList")
    public String completeReviewList(
            @RequestParam(value="helperId", required=false) Integer helperId,
            @RequestParam(value="helperNick", required=false) String helperNick,
            @RequestParam(value="cp", required=false, defaultValue="1") int currentPage,
            Model model) {
    	
    		System.out.println("helperId = " + helperId);
    	    System.out.println("helperNick = " + helperNick);
    	 Map<String, Object> paramMap = new HashMap<>();
         if(helperId != null) {
             paramMap.put("helperId", helperId);
             model.addAttribute("helperId", helperId);
         }
         if(helperNick != null && !helperNick.trim().isEmpty()){
             paramMap.put("helperNick", helperNick);
             model.addAttribute("helperNick", helperNick);
         }
           
         // 전체 목록 수 조회 (조건에 따른 총 개수)
         int listCount = service.getCompleteReviewCount(paramMap);
           
         // Pagination 객체 생성
         Pagination pagination = new Pagination(currentPage, listCount);
           
         // 페이징 처리를 위한 limit, offset 계산
         paramMap.put("limit", pagination.getLimit());
         paramMap.put("offset", (currentPage - 1) * pagination.getLimit());
           
         // 조건과 페이징 정보를 이용한 리뷰 목록 조회
         List<Review2> list = service.getCompleteReviewListPaginated(paramMap);
           
         model.addAttribute("pagination", pagination);
         model.addAttribute("completeReviewList", list);
           
         return "board/requestCompleteBoardList"; // JSP: /WEB-INF/views/board/requestCompleteBoardList.jsp
     }
}
