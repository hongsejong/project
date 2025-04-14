package edu.kh.haezo.member.controller;

import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.service.KakaoService;
import edu.kh.haezo.member.model.service.MemberService;

@Controller
public class KakaoController {

    @Autowired
    private KakaoService kakaoService;
    
    @Autowired
    private MemberService memberService;
    
    // 카카오 로그인 시작 (카카오 인증 URL로 리다이렉트)
    @GetMapping("/auth/kakao/login")
    public String kakaoLogin() {
        // 만약 controller에서 직접 설정값을 사용하고 싶다면 아래처럼 작성합니다.
        String kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize"
                              + "?client_id=" + kakaoService.getRestApiKey()
                              + "&redirect_uri=" + kakaoService.getRedirectUri()
                              + "&response_type=code"
                              + "&scope=account_email,profile_nickname,profile_image,phone_number"
                              + "&auth_type=login";
        
        System.out.println("[카카오 로그인 요청]");
        System.out.println("client_id = " + kakaoService.getRestApiKey());
        System.out.println("redirect_uri = " + kakaoService.getRedirectUri());
        System.out.println("최종 요청 URL = " + kakaoAuthUrl);
        
        return "redirect:" + kakaoAuthUrl;
    }
    
    // 카카오 콜백 – 카카오에서 인가코드를 받아 처리
    @GetMapping("/auth/kakao/callback")
    public String kakaoCallback(@RequestParam("code") String code, HttpSession session) {
        // Access Token 요청 (클래스에 주입된 값을 사용하므로 파라미터는 code만 받습니다.)
        String accessToken = kakaoService.getAccessToken(code);
        
        // Access Token을 이용하여 사용자 정보 조회
        Map userInfo = kakaoService.getUserInfo(accessToken);
        if(userInfo == null || userInfo.get("kakao_account") == null || userInfo.get("properties") == null) {
            return "redirect:/error";  // 필수 정보 누락 시 에러 처리
        }
        
        // 카카오 계정 정보 추출
        Map kakaoAccount = (Map) userInfo.get("kakao_account");
        Map properties = (Map) userInfo.get("properties");
        
        String email = (String) kakaoAccount.get("email");
        String nickname = (String) properties.get("nickname");
        String profileImage = (String) properties.get("profile_image");
        String phoneNumber = (String) kakaoAccount.get("phone_number");
        
        // 회원 연동: 해당 이메일로 회원이 존재하는지 확인 후, 없으면 신규 회원가입 처리
        Member loginMember = memberService.loginWithKakao(email, nickname, profileImage, phoneNumber);
        
        // 세션에 카카오 Access Token과 로그인 회원 정보를 저장 (로그아웃 시 사용)
        session.setAttribute("kakaoAccessToken", accessToken);
        session.setAttribute("loginMember", loginMember);
        
        return "redirect:/";
    }
}
