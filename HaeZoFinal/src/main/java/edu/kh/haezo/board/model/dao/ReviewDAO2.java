package edu.kh.haezo.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import edu.kh.haezo.board.model.dto.Review2;

@Repository
public class ReviewDAO2 {

    @Autowired
    private SqlSession sqlSession;
    
    public Review2 getReviewDetail(int boardNo) {
        return sqlSession.selectOne("reviewMapper2.getReviewDetail", boardNo);
    }
    
    public int selectCompleteReviewCount(Map<String, Object> paramMap) {
        return sqlSession.selectOne("reviewMapper2.selectCompleteReviewCount", paramMap);
    }
    
    public List<Review2> selectCompleteReviewListPaginated(Map<String, Object> paramMap) {
        return sqlSession.selectList("reviewMapper2.selectCompleteReviewListPaginated", paramMap);
    }
    
    public List<Review2> selectCompleteReviewListByHelperId(int helperId) {
        return sqlSession.selectList("reviewMapper2.selectCompleteReviewListByHelperId", helperId);
    }
    
    public List<Review2> selectCompleteReviewListByHelperNick(String helperNick) {
        return sqlSession.selectList("reviewMapper2.selectCompleteReviewListByHelperNick", helperNick);
    }
    
    public List<Review2> selectCompleteReviewListAll() {
        return sqlSession.selectList("reviewMapper2.selectCompleteReviewListAll");
    }
}
