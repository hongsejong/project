package edu.kh.haezo.main.model.service;

import java.util.List;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.dto.Review;


public interface MainService {

	/** 1) 최신 의뢰 게시글 목록 조회
	 * @return 최신 의뢰 게시글 목록
	 */
	List<Board> selectRecentRqList();

	/**2) 최신 리뷰글 목록 조회
	 * @return 최신 리뷰글 목록
	 */
	List<Review> selectRecentRvList();

	/**3) 자유게시판 인기글 목록 조회
	 * @return 자유게시판 인기 게시글 목록
	 */
	List<Board> selectMostBoardLikeList();

	/**4) 카테고리별 상위 조력자 목록 조회(평점 높은 순)
	 * @return 카테고리별 상위 조력자 목록
	 */
	List<RequestSupporter> selectpopularSupporterList();

	/**5) 최상위 조력자 목록 조회(조건: 의뢰 완료 개수 1회 이상 / 평균 별점 높은 순&조력자 NO 최신 순)
	 * @return 최상위 조력자 목록
	 */
	List<RequestSupporter> selecttopSupporterList();

	/** 최신 의뢰 게시글 목록 조회(카테고리별 ajax)
	 * @param cgIndex
	 * @return 카테고리별 최신 의뢰 게시글 목록
	 */
	List<Board> selectlatestRequestList(int cgIndex);

	/** 인기 조력자 목록 조회(카테고리별 ajax)
	 * @param cgIndex
	 * @return 인기 조력자 목록
	 */
	List<RequestSupporter> selectcgPopularSupporterList(int cgIndex);

	/** 자유게시판 게시판 코드 조회
	 * @return boardCode(자유게시판)
	 */
	int selectFreeBoardCode();

	/**의뢰게시판 게시판 코드 조회
	 * @return boardCode(의뢰게시판)
	 */
	int selectRequestBoardCode();

}
