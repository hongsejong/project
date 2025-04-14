package edu.kh.haezo.inquiry.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Files;

public interface InquiryService {

	/** 문의 게시글 조회
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectInquiryListAll(int cp, int listCount);



	/** 답변 전만 보기
	 * @param cp
	 * @param listCount
	 * @return
	 */
	Map<String, Object> boardStatusCheck(Map<String, Object> tmap);



	/** 문의 상세조회
	 * @param map
	 * @return
	 */
	Board selectBoard(Map<String, Object> map);



	Map<String, Object> selectInquiryListAll(int cp, int listCount, int memberNo);



	/** 문의사항 등록
	 * @param board
	 * @return
	 */
	int insertInquiry(Board board);



	/** 파일등록 
	 * @param file
	 * @param boardNo
	 * @param webPath
	 * @param filePath
	 * @return
	 */
	int insertFile(MultipartFile file, int boardNo, String webPath, String filePath);






	/** 파일조회
	 * @param boardNo
	 * @return
	 */
	List<Object> selectFiles(int boardNo);



	/** 게시글 삭제
	 * @param boardNo
	 * @return
	 */
	int inquiryDelete(int boardNo);


	//답글 등록
	int insertComment(Map<String, Object> map);


	//게시글의 답글조회
	String selectComment(int boardNo);


	//답변 등록후 BOARD_STATUS y로 변경
	void anwerChange(int boardNo);


	//자동파일삭제 파일목록 조회
	List<String> selectFileList();









}
