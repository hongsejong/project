package edu.kh.haezo.singo.model.dao;

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
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.dto.UserBan;
import edu.kh.haezo.singo.model.dto.Singo;

@Repository
public class SingoDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	
	//작성자 번호찾기
	public int getWriteMemberNo(int boardNo) {
		return sqlSession.selectOne("singoMapper.getWriteMemberNo",boardNo);
	}

	//신고하기
	public int insertReport(Map<String, Object> paramMap) {
		System.out.println(paramMap);
		return sqlSession.insert("singoMapper.insertReport",paramMap);
	}

	public int singoFile(Files files) {
		return sqlSession.insert("singoMapper.singoFile", files);
	}

	public Member findMember(int boardNo) {
		return sqlSession.selectOne("singoMapper.findMember",boardNo);
	}

	//신고 목록 조회
	public int getSingoCount() {
		return sqlSession.selectOne("singoMapper.getSingoCount");
	}

	//신고 게시글 조회
	public List<Board> singoBoardList(PaginationInquiry pagination) {
		  int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
	        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
	        return sqlSession.selectList("singoMapper.singoBoardList", new HashMap<>(), rowBounds);
	}

	//신고번호로 보드넘버 찾기
	public int getboardNo(int reportNo) {
		return sqlSession.selectOne("singoMapper.getboardNo",reportNo);
	}

	//신고 상세조회
	public Singo selectBoard(Map<String, Object> map) {
		return sqlSession.selectOne("singoMapper.selectBoard",map);
	}

	public List<Object> selectFiles(int boardNo) {
		return sqlSession.selectList("singoMapper.selectFiles",boardNo);
	}
	//신고 무시
	public void ignoreReport(int reportNo) {
		sqlSession.update("singoMapper.ignoreReport",reportNo);
		
	}
	//신고넘버로 보드넘버 찾기
	public int findBoardNoByReportNo(int reportNo) {
		return sqlSession.selectOne("singoMapper.findBoardNoByReportNo",reportNo);
	}
	//삭제된글 컬럼바꾸기
	public void updateBoardDelFl(int boardNo) {
		sqlSession.update("singoMapper.updateBoardDelFl",boardNo);
		
	}
	//신고 글 처리(삭제)
	public void deleteReport(int reportNo) {
		sqlSession.update("singoMapper.deleteReport",reportNo);
		
	}

	public int findMemberNoByBoardNo(int boardNo) {
		return sqlSession.selectOne("singoMapper.findMemberNoByBoardNo",boardNo);
	}

	//글 삭제당한사람 USER_BAN 테이블 BAN_COUNT ++1시키기
	public void userReportCount(int memberNo) {
		// TODO Auto-generated method stub
		
	}

	//밴 테이블에 있는지 조회함
	public UserBan selectBan(int memberNo) {
		return sqlSession.selectOne("singoMapper.selectBan", memberNo);
	}

	
	//밴 테이블에 없다면 새로 등록
	public void insertUserBan(int memberNo) {
		sqlSession.insert("singoMapper.insertUserBan", memberNo);
		
	}
	//밴 테이블에 있으면 밴카운트 1++
	public void banCountUp(int memberNo) {
		sqlSession.update("singoMapper.banCountUp",memberNo);
		
	}

	//총개수체크
	public int boardStatusCheck() {
		return sqlSession.selectOne("singoMapper.boardStatusCheck");
	}

	
	//신고 페이지네이션 조회
	public List<Board> singoBoardCheck(PaginationInquiry pagination) {
        int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
        RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
        return sqlSession.selectList("singoMapper.singoMapperBoardCheck", new HashMap<>(), rowBounds);
	}

	public List<String> selectSingoFileList() {
		return sqlSession.selectList("singoMapper.selectSingoFileList");
	}

	public List<UserBan> selectReportCount() {
		return sqlSession.selectList("singoMapper.selectReportCount");
	}

	public int userBan(UserBan ub) {
		return sqlSession.update("singoMapper.userBan",ub);
	}

	public void memberBan(UserBan ub) {
		 sqlSession.update("singoMapper.memberBan",ub);
		
	}

	public void memberOut(UserBan ub) {
		 sqlSession.update("singoMapper.memberOut",ub);
		
	}

	public void reportReset(UserBan ub) {
		 sqlSession.update("singoMapper.reportReset",ub);
		
	}

	public void memberRevive() {
		sqlSession.update("singoMapper.memberRevive");
	}

	
	
	




}
