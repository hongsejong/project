package edu.kh.haezo.inquiry.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Files;
import edu.kh.haezo.inquiry.model.service.InquiryService;
import edu.kh.haezo.member.model.dto.Member;
import oracle.jdbc.proxy.annotation.Post;

@Controller
public class InquiryController {
	
	@Autowired
	private InquiryService service;
	//문의 목록 조회
	@GetMapping("/inquiryList")
	public String inquiry(
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="listCount", required=false, defaultValue="10") int listCount,
			Model model,
			@SessionAttribute(value="loginMember",required=false)Member loginMember
			) {
	
		Map<String, Object> map = service.selectInquiryListAll(cp,listCount);
		model.addAttribute("map", map);
		model.addAttribute("listCount", listCount); 

		return "inquiry/inquiryList";
	}
	
	// 회원 문의목록 조회
	@GetMapping("/inquiryListMember")
	public String inquiryMember(
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="listCount", required=false, defaultValue="10") int listCount,
			Model model,
			@SessionAttribute(value="loginMember",required=false)Member loginMember,
			RedirectAttributes ra
			) {
		if(loginMember==null) {
			ra.addFlashAttribute("message", "로그인 후 이용해주세요.");
	        return "redirect:/"; // 메인 화면으로 리다이렉트
		}
		int memberNo= loginMember.getMemberNo();
		Map<String, Object> map = service.selectInquiryListAll(cp,listCount,memberNo);
		model.addAttribute("map", map);
		model.addAttribute("listCount", listCount); 

		return "inquiry/inquiryListMember";
	}
	//------------------------
	
	@ResponseBody
	@PostMapping("/inquiryList/boardStatusCheck")
	public Map<String, Object> boardStatusCheck(@RequestBody Map<String,Object> paramMap,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			Model model) {
		//{listCount=10, YNStatus=Y} 이렇게 받아옴
		int listCount = Integer.parseInt(paramMap.get("listCount").toString());
		String YNStatus = (String) paramMap.get("YNStatus");
		Map<String, Object> tmap = new HashMap<String, Object>();
		tmap.put("listCount", listCount);
		tmap.put("YNStatus", YNStatus);
		tmap.put("cp", cp);
		
		
		Map<String, Object> map = service.boardStatusCheck(tmap);
		model.addAttribute("map",map);
		model.addAttribute("listCount", listCount);
		model.addAttribute("YNStatus",YNStatus);
	
		

		return map;
	}
	
	
	
	
	
	
	// 글 작성으로 이동
	@GetMapping("/inquiryWrite")
	public String insertInquiry(@SessionAttribute(value="loginMember",required=false)Member loginMember,
			RedirectAttributes ra) {
		if(loginMember==null) {
			ra.addFlashAttribute("message", "로그인 후 이용해주세요.");
	        return "redirect:/customer"; 
		}
		return "inquiry/inquiryWrite";
	}
	
	
	//문의글 등록하기
	@PostMapping("/inquiryInsert")
	public String inquiryInsert(
			@RequestParam("inquiryTitle") String inquiryTitle,
			@RequestParam("inquiryContent") String inquiryContent,
			@RequestParam("file") MultipartFile[] files,
			Model model,
			@SessionAttribute("loginMember") Member loginMember,
			Board board,
			HttpSession session,
			RedirectAttributes ra
			) {
		if(loginMember==null) {
			ra.addFlashAttribute("message", "로그인 후 이용해주세요.");
	        return "redirect:/customer"; // 메인 화면으로 리다이렉트
		}
		
		board.setMemberNo(loginMember.getMemberNo());
		board.setBoardTitle(inquiryTitle);
		board.setBoardContent(inquiryContent);
		
		String webPath="/resources/files/inquiry/";
		String filePath=session.getServletContext().getRealPath(webPath);
		int boardNo = service.insertInquiry(board);
		int result=0;
		System.out.println("파일은"+files);
		if(boardNo>0) {
			if(files !=null && files.length>0) {
				for(MultipartFile file : files) {
					if(!file.isEmpty()) {
					result=service.insertFile(file,boardNo,webPath,filePath);
					}
				}
			}
		}
		if(boardNo>0) {
			model.addAttribute("message", " 문의가 등록되었습니다");
			return "redirect:/inquiryList/"+boardNo;
		}else {
			
			return "redirect:/inquiryInsert";
		}
		
	}
	
	// 글 상세조회
	@GetMapping("/inquiryList/{boardNo}")
	public String inquiryDetail(@PathVariable("boardNo") int boardNo,
								Model model,
								RedirectAttributes ra,
								@SessionAttribute(value="loginMember", required=false)Member loginMember) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardNo", boardNo);
		map.put("loginMember",loginMember);
		Board board = service.selectBoard(map);
		List<Object> files = service.selectFiles(boardNo);
		String CommentContent= service.selectComment(boardNo);
		System.out.println(board);
		String path;
		if(board!=null) {
			path = "inquiry/inquiryDetail";
			model.addAttribute("board",board);
			model.addAttribute("files",files);
			model.addAttribute("CommentContent",CommentContent);
		}else {
			path = "redirect:/inquiryList";
			ra.addAttribute("message","해당 게시글이 존재하지 않습니다.");
		}
		
		return path;
	}
	
	
	//글 삭제
	@PostMapping("/inquiryDelete")
	@ResponseBody
	public int inquiryDelete(@RequestBody int boardNo) {
		return service.inquiryDelete(boardNo);
	}
	
	@PostMapping("/answerInsert")
	@ResponseBody
	public int answerDelete(@RequestBody Map<String, Object> paramMap,
			Model model) {
		 int boardNo = Integer.parseInt((String) paramMap.get("boardNo"));
		 int loginMemberNo = Integer.parseInt((String) paramMap.get("loginMemberNo"));
		 String detailAnswer = (String) paramMap.get("detailAnswer");
		 System.out.println(paramMap);
		 Map<String, Object> map = new HashMap<String, Object>();
		 map.put("boardNo", boardNo);
		 map.put("loginMemberNo", loginMemberNo);
		 map.put("detailAnswer", detailAnswer);
		 
		 int result = service.insertComment(map);
		 if(result>0) {
			String CommentContent= service.selectComment(boardNo);
			model.addAttribute("CommentContent",CommentContent);
			service.anwerChange(boardNo);
		 }
		 
		
		
		return result;
	}
	
	

}
