package edu.kh.haezo.board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Comment;

@Repository
public class CommentDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	/** 댓글 목록 조회
	 * @param boardNo
	 * @return cList
	 */
	public List<Comment> selectList(int boardNo) {
		return sqlSession.selectList("commentMapper.selectList", boardNo);
	}

	/** 댓글/대댓글 등록
	 * @param comment
	 * @return result
	 */
	public int insert(Comment comment) {
		return sqlSession.insert("commentMapper.insert", comment);
	}

	/** 댓글 삭제
	 * @param commentNo
	 * @return result
	 */
	public int delete(int commentNo) {
		return sqlSession.update("commentMapper.delete", commentNo);
	}

	/** 댓글 수정
	 * @param comment
	 * @return
	 */
	public int update(Comment comment) {
		return sqlSession.update("commentMapper.update", comment);
	}

	/** 스레드 등록
	 * @param board
	 * @return result
	 */
	public int threadInsert(Board board) {
		return sqlSession.insert("boardMapper.threadInsert", board);
	}
	
	/** 스레드 게시글 목록 조회
	 * @return List<Board>
	 */
	public List<Board> selectThredList() {
		return sqlSession.selectList("boardMapper.selectThredList");
	}

	/** 스레드 게시글 삭제
	 * @param boardNo
	 * @return result
	 */
	public int deleteThred(int boardNo) {
		return sqlSession.update("boardMapper.deleteThred", boardNo);
	}

	/** 스레드 게시글 수정
	 * @param board
	 * @return result
	 */
	public int updateThread(Board board) {
		return sqlSession.update("boardMapper.updateThread", board);
	}

}
