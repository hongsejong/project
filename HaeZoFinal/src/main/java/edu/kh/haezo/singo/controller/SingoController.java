package edu.kh.haezo.singo.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.inquiry.model.service.InquiryService;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.singo.model.dto.Singo;
import edu.kh.haezo.singo.model.service.SingoService;

@Controller
public class SingoController {

	@Autowired
	private SingoService service;


	@GetMapping("/singo")
	public String singo(@SessionAttribute(value="loginMember", required=false) Member loginMember ,
			RedirectAttributes ra,
			Model model,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam(value="listCount", required=false, defaultValue="10") int listCount
			) {
	    if(loginMember == null) {
	        ra.addFlashAttribute("message", "로그인 후 이용해주세요.");
	        return "redirect:/";
	    }
		

		if(loginMember.getMemberDeleteFlag().equals("H")){
			
			Map<String, Object> map = service.selectSingoListAll(cp,listCount);
			model.addAttribute("map", map);
			model.addAttribute("listCount", listCount); 
			
			System.out.println(map);
			return "singo/singoList";
		}else {
			ra.addFlashAttribute("message","관리자만 이용가능합니다.");
			return "redirect:/";
		}
		

		
	}
	
	//신고 팝업창 열기
	@GetMapping("/singoPopup")
	public String singoPopUp(@RequestParam("url") String url,
            @RequestParam("url2") String url2,
            @RequestParam(value = "url3", required = false) String url3,
            Model model
            ) {
		
		int boardNo;
		if( url3==null || url3.equals(""))  {
			boardNo = Integer.parseInt(url2);
		} else {
			boardNo = Integer.parseInt(url3);
		}
		Member member = service.findMember(boardNo);
		
		model.addAttribute("Wmem", member);
		
		
		return "singo/singoPopup";
	}

	@PostMapping("insertSingo")
	public String insertSingo( @RequestParam("singoTitle") String singoTitle,
			@RequestParam("reportType") String reportType,
			@RequestParam("singoContent") String singoContent,
			@RequestParam("url") String url,
			@RequestParam("url2") String url2,
			@RequestParam(value = "url3", required = false) String url3,
			@RequestParam("file") MultipartFile[] files,
			Model model,
			@SessionAttribute("loginMember")Member loginMember,
			RedirectAttributes ra,
			HttpSession session) {
		int type=0;
		switch(reportType) {
		case "falseInfo": type=1; break;
		case "ImageXX": type=2; break;
		case "ContentXX": type=3; break;
		case "babo": type=4; break;
		case "other": type=5; break;

		}
		int boardNo;
		if( url3==null || url3.equals("") ) {
			boardNo = Integer.parseInt(url2);
		} else {
			boardNo = Integer.parseInt(url3);
		}
		//로그인한 멤버넘버
		int memberNo= loginMember.getMemberNo();
		//글 작성자 NO찾기
		int WriteMemberNo = service.getWriteMemberNo(boardNo);

		System.out.println("로그인한사람" + memberNo);
		System.out.println("글 작성자" + WriteMemberNo);

				if(memberNo==WriteMemberNo) {
					
					return "singo/singoPopupN";
				}

		//첨부파일 파일 저장 
		String webPath="/resources/files/singo/";
		String filePath=session.getServletContext().getRealPath(webPath);
		boolean fileUploadSuccess = true;
		
//		실제 저장 폴더가 없을 경우 새로 생성
		File dir = new File(filePath);
		if (!dir.exists()) dir.mkdirs();

			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("memberNo", memberNo);
			paramMap.put("boardNo", boardNo);
			paramMap.put("type", type);
			paramMap.put("singoTitle", singoTitle);
			paramMap.put("singoContent", singoContent);
			try {
			    int result = service.insertReport(paramMap);
			    if(result > 0) {
			        if(files != null && files.length > 0) {
			            for(MultipartFile file : files) {
			                if(!file.isEmpty()) {
			                    int fileResult = service.singoFile(file, boardNo, webPath, filePath);
			                    if(fileResult <= 0) {
			                        fileUploadSuccess = false;
			                        break;
			                    }
			                }
			            }
			        }
			        if(fileUploadSuccess) {
			            return "singo/singoPopupO";
			        } else {
			            return "singo/singoPopupFail";
			        }
			    } else {
			        return "singo/singoPopupFail";
			    }
			} catch(Exception e) {
			    return "singo/singoPopupX";
			}

	}

	@GetMapping("/singoDetail")
	public String singoDetail(@RequestParam("reportNo") int reportNo,
			Model model) {
		
		int boardNo= service.getboardNo(reportNo);
		
		int WriteMemberNo = service.getWriteMemberNo(boardNo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardNo", boardNo);
		map.put("reportNo", reportNo);
		Member member = service.findMember(boardNo);
		List<Object> files = service.selectFiles(boardNo);
	
		Singo singo = service.selectBoard(map);
		model.addAttribute("files",files);
		model.addAttribute("singo",singo);
		model.addAttribute("member",member);
		System.out.println(boardNo);
		System.out.println(WriteMemberNo);
		return "singo/singoDetail";
	}
	
	
	@PostMapping("/handleReport")
	public String handleReport(
			@RequestParam(value="reportNos", required=false) List<Integer> reportNos,
			@RequestParam(value="action", required=true) String action,
			RedirectAttributes ra) {
		if(reportNos ==null || reportNos.isEmpty()) {
			ra.addFlashAttribute("message","선택된 신고가 없습니다.");
			return "redirect:/singo";
		}
		if("ignore".equals(action)) {
	        // 신고 무시
	        for(int reportNo : reportNos) {
	            service.ignoreReport(reportNo); 
	        }
	        ra.addFlashAttribute("message", "선택된 신고를 무시했습니다.");
	    } else if("delete".equals(action)) {
	        // 글 삭제
	        for(int reportNo : reportNos) {
	            service.deleteReport(reportNo); 
	        }
	        ra.addFlashAttribute("message", "선택된 신고 글을 삭제했습니다.");
	    } else {
	        ra.addFlashAttribute("message", "알 수 없는 작업입니다.");
	    }
	    return "redirect:/singo";
	}
	
	
	//처리 전만 체크
	@ResponseBody
	@PostMapping("/singo/boardStatusCheck")
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
	




}
