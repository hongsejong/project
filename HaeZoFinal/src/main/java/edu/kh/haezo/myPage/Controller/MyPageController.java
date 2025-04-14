package edu.kh.haezo.myPage.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.service.EmailService;
import edu.kh.haezo.myPage.model.service.MyPageService;

@Controller
@RequestMapping("/myPage")
public class MyPageController {
	
	@Autowired
	private MyPageService service;
	
	@Autowired
	private EmailService emailservice;
	
	// 마이페이지 팝업창 띄우기
	@GetMapping("/viewPopUp")
	public String showPopUp(@RequestParam String memNo, @RequestParam String bCode, Model model) {
		// 마이페이지에 필요한 정보 목록 조회해서 반환
		int memberNo = Integer.parseInt(memNo);
		int boardCode = Integer.parseInt(bCode);
		
		Map<String, Object> myPageMap = new HashMap<String, Object>();
		
		Member member = service.selectProfileInfo(memberNo);
		myPageMap.put("member", member); // 회원 프로필 정보
		
		List<Board> memBoardList = service.selectmemBoardList(memberNo, boardCode);
		myPageMap.put("memBoardList", memBoardList); // 자유 게시판 게시글 목록
		
		model.addAttribute("myPageMap", myPageMap);
		return "myPage/myPage";
	}
	
	// 자기소개 내용 수정(ajax)
	@PostMapping(value="/updateSelfIntro", produces="application/json; charset=UTF-8")
	@ResponseBody
	public int updateSelfIntro(@RequestBody Member member) {
		return service.updateSelfIntro(member);
	}
	
	// 자기소개 내용 수정 후 화면 전환(ajax)
	@PostMapping(value="/viewSelfIntro", produces="application/json; charset=UTF-8")
	@ResponseBody
	public String viewSelfIntro(@RequestBody Member member) {
		int memberNo = member.getMemberNo();
		return service.viewSelfIntro(memberNo);
	}
	
	// 회원 탈퇴 화면 전환
	@GetMapping("/secession")
	public String secession(@SessionAttribute(name="loginMember", required=false) Member loginMember){
		
		if(loginMember == null) {
			return "redirec:/";
		}
		
		return "myPage/myPage-secession";
	}
	
	// 회원 탈퇴
	@PostMapping("/secession")
	public String secession(
	        @SessionAttribute("loginMember") Member loginMember,
	        RedirectAttributes ra,
	        String memberPw,
	        String withdrawReason, // 라디오 버튼 값 (예: service, privacy 등)
	        String otherReason,    // 기타 사유 입력값 (선택한 경우)
	        String emailAuthCode,  // 폼에서 입력받은 이메일 인증번호
	        SessionStatus status,
	        HttpServletRequest request,  // 세션 무효화를 위해 추가
	        HttpServletResponse resp) {

	    // session에 저장된 로그인 회원의 이메일 사용
	    String email = loginMember.getMemberEmail();

	    // 1. 이메일 인증번호 검증 (EmailService 내부에서 email-mapper의 checkAuthKey 사용)
	    boolean isEmailVerified = emailservice.verifyEmailAuthCode(email, emailAuthCode);
	    if (!isEmailVerified) {
	        ra.addFlashAttribute("message", "이메일 인증번호가 일치하지 않습니다.");
	        return "redirect:secession";
	    }

	    // 2. 탈퇴 사유 처리: 'other' 선택 시 기타 사유 텍스트 사용
	    String finalWithdrawReason = "other".equals(withdrawReason)
	                                 && otherReason != null
	                                 && !otherReason.isEmpty()
	                                 ? otherReason
	                                 : withdrawReason;

	    int memberNo = loginMember.getMemberNo();
	    int result = service.secession(memberNo, memberPw, finalWithdrawReason);

	    if (result > 0) {
	        // 회원 탈퇴 성공 시
	        status.setComplete();
	        // 세션 무효화 (로그아웃 처리)
	        request.getSession().invalidate();

	        // 쿠키 삭제 처리 (필요 시)
	        Cookie cookie = new Cookie("saveId", "");
	        cookie.setMaxAge(0);
	        cookie.setPath("/");
	        resp.addCookie(cookie);

	        ra.addFlashAttribute("message", "탈퇴 되었습니다.");
	        // 팝업 창을 닫고 부모 창(메인페이지)을 로그인 페이지로 이동시키는 JSP 뷰로 이동
	        return "myPage/secessionSuccess";
	    } else {
	        ra.addFlashAttribute("message", "현재 비밀번호가 일치하지 않습니다.");
	        return "redirect:secession";
	    }
	}
	
	// 마이 페이지 요청한 의뢰 게시글 목록 조회(ajax)
	@PostMapping(value="/RequestBoardListIsNotDone", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Board> RequestBoardListIsNotDone(@RequestBody Map<String, Object> paramMap){
		return service.RequestBoardListIsNotDone(paramMap);
	}
	
	// 마이 페이지 처리한 의뢰 게시글 목록 조회(ajax)
	@PostMapping(value="/RequestBoardListIsDone", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Board> RequestBoardListIsDone(@RequestBody Map<String, Object> paramMap){
		return service.RequestBoardListIsDone(paramMap);
	}
	
	// 마이 페이지 작성한 자유게시판 게시글 목록 조회(ajax)
	@PostMapping(value="/FreeBoardList", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Board> FreeBoardList(@RequestBody Map<String, Object> paramMap){
		return service.FreeBoardList(paramMap);
	}
	
	// 마이 페이지 좋아요 누른 자유게시판 게시글 목록 조회(ajax)
	@PostMapping(value="/FreeBoardListLike", produces="application/json; charset=UTF-8")
	@ResponseBody
	public List<Board> FreeBoardListLike(@RequestBody Map<String, Object> paramMap){
		return service.FreeBoardListLike(paramMap);
	}
	
	// 마이페이지 프로필 이미지 변경
	@PostMapping("/profileImg")
	public String updateProfileImg(
			@RequestParam("profileImg") MultipartFile profileImg,
			@SessionAttribute(name="loginMember", required=false) Member loginMember,
			@SessionAttribute("freeBoardCode") int boardCode,
			RedirectAttributes ra,
			HttpSession session
			) throws IllegalStateException, IOException {
		
		if(loginMember == null) {
			return "redirect:/";
		}
		
		String webPath = "/resources/images/myPage";
		
		String filePath = session.getServletContext().getRealPath(webPath);
		
		int result = service.updateProfileImg(profileImg,loginMember,webPath,filePath);
		
		String message = null;
		if(result > 0) message = "프로필 이미지가 변경되었습니다.";
		else           message = "프로필 이미지 변경 실패..";

		ra.addFlashAttribute("message", message);
		return "redirect:/myPage/viewPopUp?memNo="+loginMember.getMemberNo()+"&bCode="+boardCode;
	}
	
	// 회원정보 수정 화면 전환
	@GetMapping("/goUpdateInfo")
	public String goUpdateInfo(@SessionAttribute(name="loginMember", required=false) Member loginMember, Model model) {
		if(loginMember == null) {
			return "redirect:/";
		}
		
		Member member = service.selectProfileInfo(loginMember.getMemberNo());
		model.addAttribute("member", member);
		return "myPage/myPage-updateInfo";
	}
	
	// 회원정보 수정
	@PostMapping("/afterUpdateInfo")
	public String updateInfo(Member updateMember, String[] memberAddress
			, @SessionAttribute(name="loginMember", required=false) Member loginMember
			, @SessionAttribute("freeBoardCode") int boardCode
			, RedirectAttributes ra) {
		
		if(loginMember == null) {
			return "redirect:/";
		}
		
		// 주소 하나로 합친 후 세팅
		if(updateMember.getMemberAddress().equals(",,")) {
			updateMember.setMemberAddress(null);
		} else { // 주소를 입력한 경우
			String addr = String.join("^^^", memberAddress);
			updateMember.setMemberAddress(addr);
		}
		// 로그인한 회원의 번호를 updateMember에 추가
		updateMember.setMemberNo(loginMember.getMemberNo());
		
		// DB에 회원정보 수정 서비스 호출
		int result = service.updateInfo(updateMember);
		
		String message = null;
		if(result != 0) {
			message = "회원정보가 수정되었습니다.";
			loginMember.setMemberNickname(updateMember.getMemberNickname());
			loginMember.setMemberTel(updateMember.getMemberTel());
			loginMember.setMemberAddress(updateMember.getMemberAddress());
		} else {
			message = "회원정보 수정 실패";
		}
		ra.addFlashAttribute("message", message);
		return "redirect:/myPage/viewPopUp?memNo="+loginMember.getMemberNo()+"&bCode="+boardCode;
	}
	
	// 비밀번호 변경 화면 전환
	@GetMapping("/goChangePw")
	public String goChangePw(@SessionAttribute(name="loginMember", required=false) Member loginMember) {
		
		if(loginMember == null) {
			return "redirect:/";
		}
		
		return "myPage/myPage-changePw";
	}
	
	// 비밀번호 변경
	@PostMapping(value="/changePw", produces="application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> changePw(@RequestBody Map<String, Object> paramMap, 
			@SessionAttribute(name="loginMember", required=false) Member loginMember) {
	    
		String currentPw = (String)paramMap.get("currentPw");
	    String newPw = (String)paramMap.get("newPw");
		// 로그인한 회원의 회원번호
		int memberNo = loginMember.getMemberNo();
		// 비밀번호 변경 서비스 호출
		int result = service.chagePw(currentPw, newPw, memberNo);
		Map<String, Object> response = new HashMap<>();
		if(result > 0) {
			// 비밀번호 변경 성공
			response.put("status", "success");
			response.put("message", "비밀번호가 변경되었습니다.");
		} else {
			// 비밀번호 변경 실패
			response.put("status", "fail");
			response.put("message", "현재 비밀번호가 일치하지 않습니다.");
		}
		return response;
	}
	
}
