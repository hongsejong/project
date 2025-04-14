package edu.kh.haezo.board.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.kh.haezo.board.model.dao.ReviewDAO2;
import edu.kh.haezo.board.model.dto.Review2;

@Service
public class ReviewServiceImpl2 implements ReviewService2 {

    @Autowired
    private ReviewDAO2 dao;
    
    @Override
    public Review2 getReviewDetail(int boardNo) {
        return dao.getReviewDetail(boardNo);
    }
    
    @Override
    public int getCompleteReviewCount(Map<String, Object> paramMap) {
        return dao.selectCompleteReviewCount(paramMap);
    }
    
    @Override
    public List<Review2> getCompleteReviewListPaginated(Map<String, Object> paramMap) {
        return dao.selectCompleteReviewListPaginated(paramMap);
    }
    
    @Override
    public List<Review2> getCompleteReviewListByHelperId(int helperId) {
        return dao.selectCompleteReviewListByHelperId(helperId);
    }
    
    @Override
    public List<Review2> getCompleteReviewListByHelperNick(String helperNick) {
        return dao.selectCompleteReviewListByHelperNick(helperNick);
    }
    
    @Override
    public List<Review2> getCompleteReviewListAll() {
        return dao.selectCompleteReviewListAll();
    }
}
