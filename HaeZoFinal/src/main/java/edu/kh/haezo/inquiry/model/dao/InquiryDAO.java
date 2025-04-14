package edu.kh.haezo.inquiry.model.dao;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Files;
import edu.kh.haezo.inquiry.model.dto.PaginationInquiry;

@Repository
public class InquiryDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int getListCount() {
		return sqlSession.selectOne("inquiryMapper.getListCount");
	}
/*
	public List<Board> inquiryBoardList(Pagination pagination) {
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("inquiryMapper.selectBoardList",new HashMap<>(),  rowBounds);
	}
*/
	public List<Board> inquiryBoardList(edu.kh.haezo.inquiry.model.dto.PaginationInquiry pagination) {
        int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

        return sqlSession.selectList("inquiryMapper.selectBoardList", new HashMap<>(), rowBounds);
    }

	//갯수 체크
	public int boardStatusCheck() {
		return sqlSession.selectOne("inquiryMapper.boardStatusCheck");
	}
	
	// 찐 조회
	public List<Board> inquiryBoardCheck(PaginationInquiry pagination) {
        int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
        return sqlSession.selectList("inquiryMapper.inquiryBoardCheck", new HashMap<>(), rowBounds);
	}
	
	//문의게시글 상세조회
	public Board selectBoard(Map<String, Object> map) {
		return sqlSession.selectOne("inquiryMapper.selectBoard",map);
	}
	public int getListCount(int memberNo) {
		return sqlSession.selectOne("inquiryMapper.getListCountMember",memberNo);
	}
	
	
	//회원만 조회
	public List<Board> inquiryBoardList(Map<String, Object> params) {
		 PaginationInquiry pagination = (PaginationInquiry) params.get("pagination");
		    int memberNo = (Integer) params.get("memberNo");  
		  int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
	        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

	        return sqlSession.selectList("inquiryMapper.selectBoardListMember", memberNo, rowBounds);
	}
	
	
	
	//문의 등록
	public int insertInquiry(Board board) {
		sqlSession.insert("inquiryMapper.insertInquiry",board);
		return board.getBoardNo();
	}
	
	
	// 문의등록 성공시 파일 등록
	public int insertFile(Files files) {
		 return sqlSession.insert("inquiryMapper.insertFile", files);
	}

	
	//파일 조회
	public List<Object> selectFiles(int boardNo) {
		return sqlSession.selectList("inquiryMapper.selectFiles",boardNo);
	}
	public int inquiryDelete(int boardNo) {
		return sqlSession.update("inquiryMapper.inquiryDelete",boardNo);
	}
	
	
	//문의 답글 등록
	public int insertComment(Map<String, Object> map) {
		return sqlSession.insert("inquiryMapper.insertComment",map);
	}
	
	//답글 조회
	public String selectComment(int boardNo) {
		return sqlSession.selectOne("inquiryMapper.selectComment",boardNo);
	}
	public void anwerChange(int boardNo) {
		sqlSession.update("inquiryMapper.anwerChange",boardNo);
		
	}
	public List<String> selectFileList() {
		return sqlSession.selectList("inquiryMapper.selectFileList");
	}



}
