package edu.kh.haezo.board.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.haezo.board.model.dto.Review2;

public interface ReviewService2 {
    Review2 getReviewDetail(int boardNo);
    int getCompleteReviewCount(Map<String, Object> paramMap);
    List<Review2> getCompleteReviewListPaginated(Map<String, Object> paramMap);
    
    List<Review2> getCompleteReviewListByHelperId(int helperId);
    List<Review2> getCompleteReviewListByHelperNick(String helperNick);
    List<Review2> getCompleteReviewListAll();
}
