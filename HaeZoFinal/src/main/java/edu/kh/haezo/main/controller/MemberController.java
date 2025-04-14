package edu.kh.haezo.main.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.service.KakaoService;
import edu.kh.haezo.member.model.service.MemberService;
import edu.kh.haezo.member.model.service.NaverService;

@Controller
@RequestMapping("/member")
@SessionAttributes({"loginMember", "kakaoAccessToken"})
public class MemberController {

    @Autowired 
    private MemberService service;
    
    @Autowired
    private KakaoService kakaoService;
    
    @Autowired
    private NaverService naverService;

    @GetMapping("/login")
    public String login() {
        return "member/login";
    }
    
    @GetMapping("/signUp")
    public String signUp() {
        return "member/signUp";
    }
    
    @PostMapping("/signUp")
    public String signUp(Member inputMember, String[] memberAddress,
                         RedirectAttributes ra) {
        if(inputMember.getMemberAddress().equals(",,")) {
            inputMember.setMemberAddress(null);
        } else {
            String addr = String.join("^^^", memberAddress);
            inputMember.setMemberAddress(addr);
        }
        int result = service.signUp(inputMember);
        String path = "redirect:";
        String message = null;
        
        if(result > 0) {
            path += "/";
            message = inputMember.getMemberNickname() + "님의 가입을 환영합니다";
        } else {
            path += "signUp";
            message = "회원 가입 실패";
        }
        ra.addFlashAttribute("message", message);
        return "redirect:/";
    }

    @PostMapping("/login")
    public String login(Member inputMember, Model model,
                        @RequestHeader(value="referer") String referer,
                        @RequestParam(value="saveId", required=false) String saveId,
                        HttpServletResponse resp,
                        RedirectAttributes ra,
                        HttpSession session) {

        Member loginMember = service.login(inputMember);

        if (loginMember == null) {
            session.setAttribute("loginFail", true); // 로그인 실패 표시
            return "redirect:/";
        }

        String memberBan = loginMember.getMemberBan();
        int memberNo = loginMember.getMemberNo();
        String banEnd = service.banend(memberNo);
        String banEndMessage = (banEnd != null && banEnd.length() >= 10) ? banEnd.substring(0,10) : "알 수 없음";

        if ("Y".equals(memberBan)) {
            ra.addFlashAttribute("message", "정지중인 회원입니다. 정지 해제 날짜: " + banEndMessage);
            return "redirect:/";
        }

        session.setAttribute("loginMember", loginMember); // 로그인 정보 세션에 저장

        // 아이디 저장 쿠키
        Cookie cookie = new Cookie("saveId", loginMember.getMemberEmail());
        cookie.setMaxAge(saveId != null ? 60 * 60 * 24 * 30 : 0);
        cookie.setPath("/");
        resp.addCookie(cookie);

        return "redirect:/";
    }

    
    @GetMapping("/logout")
    public String logout(SessionStatus status, HttpSession session, HttpServletResponse response) {
        // 카카오 로그아웃
        String kakaoAccessToken = (String) session.getAttribute("kakaoAccessToken");
        if (kakaoAccessToken != null) {
            kakaoService.logoutKakao(kakaoAccessToken);
            session.removeAttribute("kakaoAccessToken");
        }

        // 네이버 로그아웃
        String naverAccessToken = (String) session.getAttribute("naverAccessToken");
        if (naverAccessToken != null) {
            naverService.logoutNaver(naverAccessToken);
            session.removeAttribute("naverAccessToken");
        }

        // 세션 초기화
        status.setComplete();
        session.invalidate();

        return "redirect:/";
    }

}
