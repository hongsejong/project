package edu.kh.haezo.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.chatting.model.dto.Message;
import edu.kh.haezo.chatting.model.service.ChattingService;
import edu.kh.haezo.member.model.dto.Member;

@Controller
public class ChattingController {
	
	@Autowired
	private ChattingService service;
	
	// 채팅 화면 전환
	@GetMapping("/chatting")
	public String chatting(@SessionAttribute(name="loginMember", required=false) Member loginMember, Model model) {
		if(loginMember == null) {
			return "redirect:/";
		}
		List<ChattingRoom> chattingRoomList = service.selectChattingRoomList(loginMember);
		model.addAttribute("chattingRoomList",chattingRoomList);
		return "chatting/chatting";
	}
	
	// 채팅 상대방 검색
	@GetMapping(value="/chatting/selectTarget", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Member> selectTarget(String query, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("memberNo", loginMember.getMemberNo());
		map.put("query", query);
		return service.selectTarget(map);
	}
	
	// 채팅방 입장
	@GetMapping(value="/chatting/enter")
	@ResponseBody
	public int EnterRoom(int targetNo, @SessionAttribute("loginMember") Member loginMember){
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("targetNo", targetNo);
		map.put("memberNo", loginMember.getMemberNo());
		int chattingNo = service.selectChattingNo(map);
		if(chattingNo == 0) { // 기존에 채팅방이 없는 경우			
			// 채팅방 생성
			chattingNo = service.createChattingRoom(map);
		}
		return chattingNo;
	}
	
	// 채팅방 목록 조회(비동기)
	@GetMapping(value="/chatting/chattingRoomList", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<ChattingRoom> selectChattingRoomList(@SessionAttribute("loginMember") Member loginMember) {
		return service.selectChattingRoomList(loginMember);
	}
	
	// 채팅 읽음 표시
	@PutMapping("/chatting/updateReadFlag")
	@ResponseBody
	public int updateReadFlag(@RequestBody Map<String, Object> paramMap) {
		return service.updateReadFlag(paramMap);
	}
	
	// 채팅방 메세지 목록 조회(메세지 목록 존재하는 경우 알림 읽음 처리까지 진행)
	@GetMapping(value="/chatting/selectMessageList", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Message> selectMessageList(@RequestParam Map<String, Object> paramMap){
		return service.selectMessageList(paramMap);
	}
	
}
