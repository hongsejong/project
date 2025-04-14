package edu.kh.haezo.customer.controller.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.member.model.dto.Member;

public interface CustomerService {

	Map<String, Object> noticeselect();

	Map<String, Object> newsSelect();

	Map<String, Object> singoSelect();

	Map<String, Object> inqSelect();

	int todayBoardCount();

	int todayInquiryCount();

	int yesCount();

	int iyesCount();

	List<Map<String, Object>> getChartData();

	List<Map<String, Object>> getAllChartData();

	List<ChattingRoom> selectChattingRoomList(Member loginMember);
	

}
