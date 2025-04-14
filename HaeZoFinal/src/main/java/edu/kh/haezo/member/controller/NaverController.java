package edu.kh.haezo.member.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.service.NaverService;
import edu.kh.haezo.member.model.service.MemberService;

@Controller
public class NaverController {

    @Value("${naver.clientId}")
    private String clientId;
    
    @Value("${naver.redirectUri}")
    private String redirectUri;
    
    @Autowired
    private NaverService naverService;
    
    @Autowired
    private MemberService service;
    
    // 1. 네이버 로그인 시작 - 네이버 인증 URL로 리다이렉트 (강제 재로그인을 위해 force_login 파라미터 추가 가능)
    @GetMapping("/auth/naver/login")
    public String naverLogin() {
        String naverAuthUrl = "https://nid.naver.com/oauth2.0/authorize"
                              + "?response_type=code"
                              + "&client_id=" + clientId
                              + "&redirect_uri=" + redirectUri
                              + "&state=" + generateState()  // CSRF 공격 방지를 위한 난수 생성 메소드 (구현 필요)
                              // 필요시 강제 재로그인 파라미터 추가: &force_login=true
                              ;
        return "redirect:" + naverAuthUrl;
    }
    
    // 2. 네이버 콜백 - 네이버에서 인가코드(code)를 받아 처리
    @GetMapping("/auth/naver/callback")
    public String naverCallback(@RequestParam("code") String code, 
                                @RequestParam("state") String state,
                                HttpSession session) {
        // state 검증 로직 추가 (생성한 난수와 일치하는지 확인) -- 생략 가능
        
        // Access Token 요청
        String accessToken = naverService.getAccessToken(code, clientId, redirectUri);
        
        // Access Token을 이용하여 사용자 정보 조회
        Map<String, Object> userInfo = naverService.getUserInfo(accessToken);
        if (userInfo == null) {
            return "redirect:/error";
        }
        // 네이버 API의 응답 구조에 따라 필요한 정보를 추출 (예시)
        Map<String, Object> response = (Map<String, Object>) userInfo.get("response");
        String email = (String) response.get("email");
        String nickname = (String) response.get("nickname");
        String profileImage = (String) response.get("profile_image");
        String mobile = (String) response.get("mobile");
        
        // 회원 연동 처리 (네이버 로그인을 통한 회원 처리)
        Member loginMember = service.loginWithNaver(email, nickname, profileImage, mobile);
        session.setAttribute("loginMember", loginMember);
        // 네이버 Access Token도 세션에 저장 (추후 로그아웃 시 사용)
        session.setAttribute("naverAccessToken", accessToken);
        
        return "redirect:/";
    }
    
    // CSRF 방지를 위한 state 값 생성 (예시 구현)
    private String generateState() {
        return Long.toHexString(Double.doubleToLongBits(Math.random()));
    }
}
