package edu.kh.haezo.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.haezo.member.model.service.AjaxService;

@Controller
public class AjaxController {

	@Autowired
	private AjaxService service;
	
	
	@ResponseBody
	@GetMapping("/dupCheck/email")
	public String checkEmail(String email) {
		
		return service.checkEmail(email);
		
	}
	
	//닉네임 중복 검사
	@ResponseBody
	@GetMapping("/dupCheck/nickname")
	public int checkNickname(String nickname) {

		return service.checkNickname(nickname);

	}
}
