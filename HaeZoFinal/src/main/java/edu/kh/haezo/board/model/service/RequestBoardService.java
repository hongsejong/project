package edu.kh.haezo.board.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.haezo.board.model.dto.BoardSearch;
import edu.kh.haezo.board.model.dto.RequestBoard;
import edu.kh.haezo.board.model.dto.RequestSupporter;

public interface RequestBoardService {

	/** 의뢰 요청 게시판 목록조회
	 * @param categoryCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectRequestBoardList(int categoryCode, int cp);

	/** 의뢰 요청 게시판 상세조회
	 * @param map
	 * @param map 
	 * @return requestBoard
	 */
	RequestBoard requestBoardDetail(Map<String, Object> map);

	/** 의뢰 요청 게시판 요청글 삭제
	 * @param boardNo
	 * @return result
	 */
	int deleteRequestBoard(int boardNo);

	/** 시도 불러오기
	 * @return list
	 */
	List<Map<String, String>> getSidoList();

	/** 시군구 불러오기
	 * @param sidoCode
	 * @return list
	 */
	List<Map<String, String>> getSigunguList(String sidoCode);

	/** 읍면동 불러오기
	 * @param sigunguCode
	 * @return list
	 */
	List<Map<String, String>> getEmdongList(String sigunguCode);

	/** 요청글 삽입
	 * @param requestBoard
	 * @return result
	 */
	int insertRequestBoard(RequestBoard requestBoard);

	/** 요청글 수정
	 * @param requestBoard
	 * @return result
	 */
	int updateRequestBoard(RequestBoard requestBoard);

	/** 요청글 검색
	 * @param boardSearch
	 * @param cp
	 * @return map
	 */
	Map<String, Object> searchRequestBoardList(BoardSearch boardSearch, int cp);

	/** 요청글 조력자 모두 조회
	 * @param boardNo
	 * @return requestSupporterArr
	 */
	List<RequestSupporter> selectRequestSupporter(int boardNo);

	/** 요청글 선택한 조력자 조회
	 * @param boardNo
	 * @return requestSupporter
	 */
	RequestSupporter acceptRequestSupporter(int boardNo);

	/** 의뢰에 리뷰가 등록되었는지 조회
	 * @param boardNo
	 * @return reviewCount
	 */
	int reviewCount(int boardNo);


}
