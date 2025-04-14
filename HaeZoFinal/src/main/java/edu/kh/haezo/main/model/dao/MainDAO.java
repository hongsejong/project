package edu.kh.haezo.main.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.dto.Review;

@Repository
public class MainDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 1) 최신 의뢰 게시글 목록 조회
	 * @return 최신 의뢰 게시글 목록
	 */
	public List<Board> selectRecentRqList() {
		return sqlSession.selectList("mainMapper.selectRecentRqList");
	}

	/**2) 최신 리뷰글 목록 조회
	 * @return 최신 리뷰글 목록
	 */
	public List<Review> selectRecentRvList() {
		return sqlSession.selectList("mainMapper.selectRecentRvList");
	}

	/**3) 자유게시판 인기글 목록 조회
	 * @return 자유게시판 인기 게시글 목록
	 */
	public List<Board> selectMostBoardLikeList() {
		return sqlSession.selectList("mainMapper.selectMostBoardLikeList");
	}

	/**4) 카테고리별 상위 조력자 목록 조회(평점 높은 순)
	 * @return 카테고리별 상위 조력자 목록
	 */
	public List<RequestSupporter> selectpopularSupporterList() {
		return sqlSession.selectList("mainMapper.selectpopularSupporterList");
	}

	/**5) 최상위 조력자 목록 조회(조건: 의뢰 완료 개수 1회 이상 / 평균 별점 높은 순&조력자 NO 최신 순)
	 * @return 최상위 조력자 목록
	 */
	public List<RequestSupporter> selecttopSupporterList() {
		return sqlSession.selectList("mainMapper.selecttopSupporterList");
	}

	/**최신 의뢰 게시글 목록 조회(카테고리별 ajax)
	 * @param cgIndex
	 * @return 카테고리별 최신 의뢰 게시글 목록
	 */
	public List<Board> selectlatestRequestList(int cgIndex) {
		return sqlSession.selectList("mainMapper.selectlatestRequestList", cgIndex);
	}

	/**인기 조력자 목록 조회(카테고리별 ajax)
	 * @param cgIndex
	 * @return 인기 조력자 목록
	 */
	public List<RequestSupporter> selectcgPopularSupporterList(int cgIndex) {
		return sqlSession.selectList("mainMapper.selectcgPopularSupporterList", cgIndex);
	}

	/**자유게시판 코드 조회
	 * @return boardCode(자유게시판)
	 */
	public int selectFreeBoardCode() {
		return sqlSession.selectOne("mainMapper.selectFreeBoardCode");
	}

	/**의뢰게시판 코드 조회
	 * @return boardCode(의뢰게시판)
	 */
	public int selectRequestBoardCode() {
		return sqlSession.selectOne("mainMapper.selectRequestBoardCode");
	}
	
}
