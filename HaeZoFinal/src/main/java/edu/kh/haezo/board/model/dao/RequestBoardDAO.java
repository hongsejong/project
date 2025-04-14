package edu.kh.haezo.board.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.BoardSearch;
import edu.kh.haezo.board.model.dto.RequestBoard;
import edu.kh.haezo.board.model.dto.RequestPagination;
import edu.kh.haezo.board.model.dto.RequestSupporter;

@Repository
public class RequestBoardDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

//	의뢰요청 게시글 수 조회
	public int requestBoardListCount(int categoryId) {
		
		return sqlSession.selectOne("requestBoardMapper.requestBoardListCount", categoryId);
	}

//	의뢰요청 게시글 목록조회
	public List<RequestBoard> selectRequestBoardList(int categoryId, RequestPagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("requestBoardMapper.selectRequestBoardList", categoryId, rowBounds);
	}

//	의뢰요청 게시글 상세조회
	public RequestBoard requestBoardDetail(Map<String, Object> map) {
		return sqlSession.selectOne("requestBoardMapper.requestBoardDetail", map);
	}

//	의뢰요청 게시글 BOARD 테이블에 먼저 삽입
	public int insertBoard(RequestBoard requestBoard) {
		int result = sqlSession.insert("requestBoardMapper.insertBoard", requestBoard);
		
//		게시글 삽입 성공 시 boardNo, 실패 시 0 반환
		if (result != 0) result = requestBoard.getBoardNo();
		return result;
	}

//	의뢰요청 게시글 삽입
	public int insertRequestBoard(RequestBoard requestBoard) {
		return sqlSession.insert("requestBoardMapper.insertRequestBoard", requestBoard);
	}

//	의뢰요청 게시글 BOARD 테이블부터 먼저 수정
	public int updateBoard(RequestBoard requestBoard) {
		return sqlSession.update("requestBoardMapper.updateBoard", requestBoard);
	}
	
//	의뢰요청 게시글 수정
	public int updateRequestBoard(RequestBoard requestBoard) {
		return sqlSession.update("requestBoardMapper.updateRequestBoard", requestBoard);
	}

//	의뢰요청 게시글 삭제
	public int deleteRequestBoard(int boardNo) {
		return sqlSession.update("requestBoardMapper.deleteRequestBoard", boardNo);
	}

//	의뢰요청 게시글 검색 게시글 수
	public int searchRequestBoardListCount(BoardSearch boardSearch) {
		return sqlSession.selectOne("requestBoardMapper.requestBoardListCount", boardSearch.getHiddenCategoryId());
	}

	
//	의뢰요청 게시글 검색
	public List<RequestBoard> serachSelectRequestBoardList(BoardSearch boardSearch, RequestPagination pagination) {
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("requestBoardMapper.searchSelectRequestBoardList", boardSearch, rowBounds);
	}

	
//	의뢰요청 게시글 조력자 조회
	public List<RequestSupporter> selectRequestSupporter(int boardNo) {
		return sqlSession.selectList("requestBoardMapper.selectRequestSupporter", boardNo);
	}

//	의뢰요청 게시글 선택한 조력자 조회
	public RequestSupporter acceptRequestSupporter(int boardNo) {
		return sqlSession.selectOne("requestBoardMapper.acceptRequestSupporter", boardNo);
	}

//	리뷰 개수 조회

	public int reviewCount(int boardNo) {
		return sqlSession.selectOne("requestBoardMapper.reviewCount", boardNo);
	}

	
}
