package edu.kh.haezo.main.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.dto.Review;
import edu.kh.haezo.main.model.dao.MainDAO;

@Service
public class MainServiceImpl implements MainService{
	
	@Autowired
	private MainDAO dao;

	// 1) 최신 의뢰 게시글 목록 조회
	@Override 
	public List<Board> selectRecentRqList() { 
		return dao.selectRecentRqList();
	}

	// 2) 최신 리뷰글 목록 조회
	@Override
	public List<Review> selectRecentRvList() {
		return dao.selectRecentRvList();
	}

	// 3) 자유게시판 인기글 목록 조회
	@Override
	public List<Board> selectMostBoardLikeList() {
		return dao.selectMostBoardLikeList();
	}

	// 4) 카테고리별 상위 조력자 목록 조회
	@Override
	public List<RequestSupporter> selectpopularSupporterList() {
		return dao.selectpopularSupporterList();
	}

	// 5) 최상위 조력자 목록 조회
	@Override
	public List<RequestSupporter> selecttopSupporterList() {
		return dao.selecttopSupporterList();
	}

	// 최신 의뢰 게시글 목록 조회(카테고리별 ajax)
	@Override
	public List<Board> selectlatestRequestList(int cgIndex) {
		return dao.selectlatestRequestList(cgIndex);
	}

	// 인기 조력자 목록 조회(카테고리별 ajax)
	@Override
	public List<RequestSupporter> selectcgPopularSupporterList(int cgIndex) {
		return dao.selectcgPopularSupporterList(cgIndex);
	}

	// 자유게시판 코드 조회
	@Override
	public int selectFreeBoardCode() {
		return dao.selectFreeBoardCode();
	}

	// 의뢰게시판 코드 조회
	@Override
	public int selectRequestBoardCode() {
		return dao.selectRequestBoardCode();
	}
	
}
