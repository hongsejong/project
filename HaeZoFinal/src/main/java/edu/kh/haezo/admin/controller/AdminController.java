package edu.kh.haezo.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.customer.controller.model.service.CustomerService;
import edu.kh.haezo.member.model.dto.Member;

@Controller
public class AdminController {
	
	
	@Autowired
	private CustomerService service;
	
	
	@GetMapping("/admin")
	public String adminMain(Model model,
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			RedirectAttributes ra) {
		
		  if(loginMember == null) {
		        ra.addFlashAttribute("message", "로그인 후 이용해주세요.");
		        return "redirect:/";
		    }
		  

			if(loginMember.getMemberDeleteFlag().equals("H")){
				

				
				
				Map<String, Object> map = service.noticeselect();
				Map<String, Object> map2 = service.newsSelect();
				Map<String, Object> map3 = service.singoSelect();
				Map<String, Object> map4 = service.inqSelect();
				int todayBoardCount=service.todayBoardCount();
				int todayInquiryCount=service.todayInquiryCount();
				int yesCount=service.yesCount();
				int iyesCount=service.iyesCount();
				
				model.addAttribute("map",map);
				model.addAttribute("map2",map2);
				model.addAttribute("map3",map3);
				model.addAttribute("map4",map4);
				model.addAttribute("todayBoardCount",todayBoardCount);
				model.addAttribute("todayInquiryCount",todayInquiryCount);
				model.addAttribute("yesCount",yesCount);
				model.addAttribute("iyesCount",iyesCount);
				return "admin/adminMain";
			}else {
				ra.addFlashAttribute("message","관리자만 이용가능합니다.");
				return "redirect:/";
			}
			
		
	
	}
	
	@ResponseBody
	@GetMapping("/chart")
	public Map<String, Object> getChartData(){
	    List<Map<String, Object>> inquiryData = service.getChartData();
	    List<Map<String, Object>> newPostData = service.getAllChartData();
	    
	    Map<String, Object> result = new HashMap<>();
	    result.put("inquiryData", inquiryData);
	    result.put("newPostData", newPostData);
	    
	    return result;
	}
	

	@GetMapping("/fullcalendar")
	public String calendar() {
		return "admin/fullcalendar";
	}
	
	@GetMapping("/admin/adminChatting")
	public String adminChattingPage(@SessionAttribute("loginMember") Member loginMember, Model model) {
	    List<ChattingRoom> chattingRoomList = service.selectChattingRoomList(loginMember);
	    model.addAttribute("chattingRoomList", chattingRoomList);
	    model.addAttribute("loginMember", loginMember);

	    return "admin/adminChatting"; 
	}


}
