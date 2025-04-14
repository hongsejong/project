package edu.kh.haezo.board.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.haezo.board.model.dao.BoardDAO;
import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Pagination;

@Service
public class BoardServiceImpl implements BoardService  {
	
	@Autowired
	private BoardDAO dao;
	
	// 게시글 목록 전체 조회
	@Override
	public Map<String, Object> selectBoardListAll(int boardCode, int cp) {
		
		int listCount = dao.getListCount(boardCode);
		
		Pagination pagination = new Pagination(cp, listCount);
		
		List<Board> boardList = dao.selectBoardList(boardCode, pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	// 게시판 타입 목록
	@Override
	public List<Map<String, Object>> selectBoardTypeList() {
		return dao.selectBoardTypeList();
	}
	
	// 게시글 상세 조회
	@Override
	public Board selectBoardDetail(Board board) {
		return dao.selectBoardDetail(board);
	}
	
	// 쓰레드 게시글 조회
	@Override
	public Map<String, Object> selectThredList(int boardCode) {
		
		List<Board> boardList = dao.selectThredList(boardCode);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		
		return map;
	}
	
	// 좋아요 여부 확인
	@Override
	public int boardLikeCheck(Map<String, Object> map) {
		return dao.boardLikeCheck(map);
	}
	
	// 좋아요 처리
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int like(Map<String, Integer> paramMap) {
		int result = 0;
		System.out.println("check 값 :" + paramMap.get("check"));
		if(paramMap.get("check") == 0) { // 좋아요 상태 X
			result = dao.insertBoardLike(paramMap);
		} else { // 좋아요 상태 O
			result = dao.deleteBoardLike(paramMap);
		}
		if(result == 0) return -1; // 좋아요 상태 O,X 상관없이 문제 있으면 -1 값 리턴
		// 문제없으면 해당 게시글 좋아요 수 조회
		return dao.boardLikeCount(paramMap);
	}
	
	// 게시글 등록(텍스트)
	@Override
	public int boardInsert(Board board) {
		//board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		//board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		
		return dao.boardInsert(board);
	}
	
	// 게시글 삭제
	@Override
	public int deleteBoard(int boardNo) {
		return dao.deleteBoard(boardNo);
	}
	
	// 게시글 이미지 등록
	@Override
	public void saveBoardImages(int boardNo, String boardContent, HttpSession session) {
		dao.saveBoardImages(boardNo, boardContent, session);
		
	}
	
	// 게시글 수정(제목,본문내용)
	@Override
	public int updateBoard(Board board) {
		return dao.updateBoard(board);
	}
	
	// 게시글 수정(등록된 이미지 전체 삭제)
	@Override
	public void deleteFilesByBoardNo(int boardNo, String boardContent, HttpSession session) {
		dao.deleteFilesByBoardNo(boardNo, boardContent, session);
	}
	
	// 조회수 증가
	@Override
	public int updateReadCount(int boardNo) {
		return dao.updateReadCount(boardNo);
	}
	
	// 조건별 검색 조회
	@Override
	public Map<String, Object> selectBoardListAll(Map<String, Object> paramMap, int cp) {
		
		int listCount = dao.getListCount(paramMap);
		Pagination pagination = new Pagination(cp, listCount);
		List<Board> boardList = dao.selectBoardListAll(paramMap, pagination);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		map.put("listCount", listCount);
		
		return map;
	}

	@Override
	public List<Map<String, Object>> headerSearch(String query) {
		return dao.headerSearch(query);
	}
	
	// DB에 없는 게시판 이미지 파일을 서버에서 주기적으로 삭제
	@Override
	public List<String> selectBoardImageFileList() {
		return dao.selectBoardImageFileList();
	}
	
	
}
