package edu.kh.haezo.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.haezo.board.model.service.CommentService;
import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Comment;

@RestController
public class CommentController {
	
	@Autowired
	private CommentService service;
	
	
	/** 댓글 목록 조회
	 * @param boardNo
	 * @return cList
	 */
	@GetMapping(value="/comment", produces="application/json; charset=UTF-8")
	public List<Comment> selectList(int boardNo){
		return service.selectList(boardNo);
	}
	
	/** 댓글/대댓글 등록
	 * @param comment
	 * @return commentNo
	 */
	@PostMapping("/comment")
	public int insert(@RequestBody Comment comment) {
		return service.insert(comment);
	}
	
	/** 댓글 삭제
	 * @param commentNo
	 * @return result
	 */
	@DeleteMapping("/comment")
	public int delete(@RequestBody int commentNo) {
		return service.delete(commentNo);
	}
	
	/** 댓글 수정
	 * @param paramMap
	 * @return result
	 */
	@PutMapping("/comment")
	public int update(@RequestBody Comment comment) {
		return service.update(comment);
	}
	
	/** 스레드 게시글 등록
	 * @param board
	 * @return result
	 */
	@PostMapping("/thread")
	public int threadInsert(@RequestBody Board board) {
		return service.threadInsert(board);
	}
	
	/** 스레드 게시글 목록 조회
	 * @return List<Board>
	 */
	@GetMapping(value="/threadList", produces="application/json; charset=UTF-8")
	public List<Board> selectThredList(){
		return service.selectThredList();
	}
	
	/** 스레드 게시글 삭제
	 * @param boardNo
	 * @return result
	 */
	@DeleteMapping("/threadNo")
	public int deleteThred(@RequestBody int boardNo) {
		return service.deleteThred(boardNo);
	}
	
	/** 스레드 게시글 수정
	 * @param board
	 * @return result
	 */
	@PutMapping("/thread")
	public int updateThread(@RequestBody Board board) {
		return service.updateThread(board);
	}
	

}
