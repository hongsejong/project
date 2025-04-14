package edu.kh.haezo.board.model.service;

import java.util.List;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Comment;

public interface CommentService {

	/** 댓글 목록 조회
	 * @param boardNo
	 * @return cList
	 */
	List<Comment> selectList(int boardNo);
	
	/** 댓글/대댓글 등록
	 * @param comment
	 * @return commentNo
	 */
	int insert(Comment comment);

	/** 댓글 삭제
	 * @param commentNo
	 * @return result
	 */
	int delete(int commentNo);

	/** 댓글 수정
	 * @param comment
	 * @return result
	 */
	int update(Comment comment);

	/** 스레드 등록
	 * @param board
	 * @return result
	 */
	int threadInsert(Board board);

	/** 스레드 목록
	 * @return List
	 */
	List<Board> selectThredList();

	/** 스레드 게시글 삭제
	 * @param boardNo
	 * @return result
	 */
	int deleteThred(int boardNo);

	/** 스레드 게시글 수정
	 * @param board
	 * @return result
	 */
	int updateThread(Board board);


}
