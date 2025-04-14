package edu.kh.haezo.customer.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.kh.haezo.customer.controller.model.service.CustomerService;

@Controller
public class CustomerController {
	
	@Autowired
	private CustomerService service;
	
	@GetMapping("/customer")
	public String customerCenter(Model model) {
		
		
		Map<String, Object> map = service.noticeselect();
		Map<String, Object> map2 = service.newsSelect();
		model.addAttribute("map",map);
		model.addAttribute("map2",map2);
		System.out.println(map);
		
		return "customerCenter/customerCenter";
	}
	
	@GetMapping("/customer/detail")
	public String customerDetail() {
		return "customerCenter/customerDetail";
	}
	

}
