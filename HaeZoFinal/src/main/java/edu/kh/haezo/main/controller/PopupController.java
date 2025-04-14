package edu.kh.haezo.main.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PopupController {
	
	@GetMapping("/popup/open")
	public Map<String, String> openPopup(@RequestParam(name="url", required=false) String url, HttpSession session){
		Map<String, String> response = new HashMap<>();
		if(url == null) {
			response.put("message", "팝업창 열기 전");
			return response;
		}
		session.setAttribute("popupInfo", url); // 팝업 정보 저장
		response.put("message", "팝업창 정보 session에 저장 완료");
		response.put("popupUrl", url);
		return response;
	}
	
	@GetMapping("/popup/close")
	public Map<String, String> closePopup(HttpSession session){
		session.removeAttribute("popupInfo"); // 팝업 정보 삭제
		Map<String, String> response = new HashMap<>();
		response.put("message", "팝업창 정보 session에서 제거 완료");
		return response;
	}
	
	@GetMapping("/popup/info")
	public Map<String, String> popupCheck(HttpSession session){
		String popupUrl = (String) session.getAttribute("popupInfo");
		Map<String, String> response = new HashMap<>();
		if(popupUrl == null) {
			response.put("message", "session 제거 / 팝업 닫기 실행");
			response.put("popupUrl", "");
		} else {
			response.put("message", "session 유지");
			response.put("popupUrl", popupUrl);
		}
		return response;
	}
	
}
