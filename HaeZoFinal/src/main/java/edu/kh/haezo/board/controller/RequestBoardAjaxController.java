package edu.kh.haezo.board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.service.RequestBoardAjaxService;
import edu.kh.haezo.member.model.dto.Member;

@RestController
@RequestMapping("/requestBoard")
public class RequestBoardAjaxController {

	@Autowired
	private RequestBoardAjaxService service;
	
	//	요청글 조력자 등록
	@PostMapping("/addSupporter")
	public int supportRequestBoard(@RequestBody Map<String, Object> map, @SessionAttribute("loginMember") Member loginMember) {
		RequestSupporter supporter = new RequestSupporter();
		supporter.setMemberNo(loginMember.getMemberNo());
		supporter.setBoardCode(Integer.parseInt((String) map.get("boardNo")));
		return service.supportRequestBoard(supporter);
	}
	
//	요청글 조력자 선택
	@PostMapping("/chooseSupporterAndPay")
	public int chooseSupporterAndPay(@RequestBody Map<String, Object> map) {
		return service.chooseSupporterAndPay(map);
	}
	
//	요청글 조력자 신청 철회
	@DeleteMapping("/withdraw")
	public int withdrawRequestSupporter(@RequestBody Map<String, Object> map) {
		return service.withdrawRequestSupporter(map);
	}
	
//	의뢰 완료
	@PostMapping("/completeAndReceive")
	public int updateRequestStatusComplete(@RequestBody Map<String, Object> map) {
		return service.updateRequestStatusComplete(map);
	}
	
//	리뷰 등록
	@PostMapping("/writeReview")
	public int writeReview(@RequestBody Map<String, Object> map) {
		return service.writeReview(map);
	}
	
	
	
	
}
