package edu.kh.haezo.board.model.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;


import edu.kh.haezo.board.model.dto.Board;

public interface BoardService {
	
	/** 게시글 목록 전체 조회
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardListAll(int boardCode, int cp);

	/** 게시판 타입 목록
	 * @return
	 */
	List<Map<String, Object>> selectBoardTypeList();

	/** 게시글 상세조회
	 * @param board
	 * @return boardDetail
	 */
	Board selectBoardDetail(Board board);

	/** 쓰레드 게시글 조회
	 * @param boardCode
	 * @return
	 */
	Map<String, Object> selectThredList(int boardCode);
	
	/** 좋아요 체크
	 * @param map
	 * @return result
	 */
	int boardLikeCheck(Map<String, Object> map);

	/** 좋아요 처리
	 * @param paramMap
	 * @return result
	 */
	int like(Map<String, Integer> paramMap);

	/** 게시글 등록(텍스트)
	 * @param board
	 * @return boardNo
	 */
	int boardInsert(Board board);

	/** 게시글 삭제
	 * @param boardNo
	 * @return result
	 */
	int deleteBoard(int boardNo);

	/** 게시글 이미지 등록
	 * @param boardNo
	 * @param boardContent
	 * @param session
	 * @throws Exception 
	 */
	void saveBoardImages(int boardNo, String boardContent, HttpSession session);

	/** 게시글 수정(제목,본문내용)
	 * @param board
	 * @return result
	 */
	int updateBoard(Board board);

	/** 게시글 수정(등록된 이미지 전체 삭제)
	 * @param boardNo
	 * @param boardContent 
	 */
	void deleteFilesByBoardNo(int boardNo, String boardContent, HttpSession session);

	/** 조회수 증가
	 * @param boardNo
	 * @return result
	 */
	int updateReadCount(int boardNo);

	/** 조건별 검색 조회
	 * @param paramMap
	 * @param cp
	 * @return BoardList
	 */
	Map<String, Object> selectBoardListAll(Map<String, Object> paramMap, int cp);

	/** 헤더 검색
	 * @param query
	 * @return 
	 */
	List<Map<String, Object>> headerSearch(String query);

	/** DB에 없는 게시판 이미지 파일을 서버에서 주기적으로 삭제
	 * @return
	 */
	List<String> selectBoardImageFileList();


}
