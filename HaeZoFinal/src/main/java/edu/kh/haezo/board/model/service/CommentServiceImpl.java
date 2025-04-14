package edu.kh.haezo.board.model.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.board.model.dao.CommentDAO;
import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Comment;
import edu.kh.haezo.common.utility.Util;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentDAO dao;
	
	// 댓글 목록 조회
	@Override
	public List<Comment> selectList(int boardNo) {
		return dao.selectList(boardNo);
	}
	
	// 댓글/대댓글 등록
	@Override
	public int insert(Comment comment) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		int result = dao.insert(comment);
		
		if(result > 0) result = comment.getCommentNo();
		
		return result;
	}
	
	// 댓글 삭제
	@Override
	public int delete(int commentNo) {
		return dao.delete(commentNo);
	}
	
	// 댓글 수정
	@Override
	public int update(Comment comment) {
		
		comment.setCommentContent(Util.XSSHandling(comment.getCommentContent()));
		
		return dao.update(comment);
	}
	
	// 스레드 등록
	@Override
	public int threadInsert(Board board) {
		
		//board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		
		return dao.threadInsert(board);
	}
	
	// 스레드 게시글 목록 조회
	@Override
	public List<Board> selectThredList() {
		return dao.selectThredList();
	}
	
	// 스레드 게시글 삭제
	@Override
	public int deleteThred(int boardNo) {
		return dao.deleteThred(boardNo);
	}
	
	// 스레드 게시글 수정
	@Override
	public int updateThread(Board board) {
		return dao.updateThread(board);
	}

	
}
