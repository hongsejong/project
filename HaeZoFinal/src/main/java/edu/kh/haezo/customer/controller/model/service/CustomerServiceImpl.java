package edu.kh.haezo.customer.controller.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.customer.controller.model.dao.CustomerDAO;
import edu.kh.haezo.member.model.dto.Member;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerDAO dao;

	@Override
	public Map<String, Object> noticeselect() {
		List<Board> boardList = dao.noticeselect();
		
		Map<String, Object> map = new HashMap<>();
		map.put("boardList", boardList);
		return map;
	}

	@Override
	public Map<String, Object> newsSelect() {
		List<Board> boardList = dao.newsSelect();
		Map<String, Object> map2 = new HashMap<>();
		map2.put("boardList", boardList);
		return map2;
	}

	@Override
	public Map<String, Object> singoSelect() {
		List<Board> boardList = dao.singoSelect();
		Map<String, Object> map3 = new HashMap<>();
		map3.put("boardList", boardList);
		return map3;
	}

	@Override
	public Map<String, Object> inqSelect() {
		List<Board> boardList = dao.inqSelect();
		Map<String, Object> map4 = new HashMap<>();
		map4.put("boardList", boardList);
		return map4;
	}

	//오늘의 게시글 수
	@Override
	public int todayBoardCount() {
		return dao.todayBoardCount();
	}

	//오늘의 문의글 수
	@Override
	public int todayInquiryCount() {
		return dao.todayInquiryCount();
	}

	@Override
	public int yesCount() {
		return dao.yesCount();
	}

	@Override
	public int iyesCount() {
		return dao.iyesCount();
	}

	//차트 데이터 받아오기
	@Override
	public List<Map<String, Object>> getChartData() {
		return dao.getChartData();
	}

	@Override
	public List<Map<String, Object>> getAllChartData() {
		return dao.getAllChartData();
	}

	@Override
	public List<ChattingRoom> selectChattingRoomList(Member loginMember) {
		// TODO Auto-generated method stub
		return null;
	}

}
