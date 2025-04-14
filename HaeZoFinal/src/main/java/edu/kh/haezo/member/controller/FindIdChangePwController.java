package edu.kh.haezo.member.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import edu.kh.haezo.member.model.service.FindIdChangePwService;

@Controller
@RequestMapping("/member/findIdChangePw")
public class FindIdChangePwController {

    @Autowired
    private FindIdChangePwService service;
    
    // 전화번호로 회원 이메일(아이디) 조회
    @GetMapping("/findId")
    @ResponseBody
    public String findIdByTel(@RequestParam("tel") String tel) {
        String memberEmail = service.findMemberEmailByTel(tel);
        return memberEmail != null ? memberEmail : "";
    }
    
    // 이메일 인증번호 발송 요청 (회원가입용과 동일한 방식 재사용)
    @GetMapping("/sendEmail")
    @ResponseBody
    public int sendEmailAuth(@RequestParam("email") String email) {
        String title = "아이디/비밀번호 변경";
        return service.sendEmailAuth(email, title);
    }
    
    // 인증번호 확인
    @GetMapping("/checkAuthKey")
    @ResponseBody
    public int checkAuthKey(@RequestParam Map<String, Object> paramMap) {
        return service.checkAuthKey(paramMap);
    }
    
    // 새 비밀번호 변경 (이메일과 새 비밀번호를 받아 DB 업데이트)
    @PostMapping("/changePw")
    @ResponseBody
    public int changePassword(@RequestParam("email") String email,
                              @RequestParam("newPw") String newPw) {
        return service.changePassword(email, newPw);
    }
    
    // 페이지 표시
    @GetMapping
    public String showFindIdChangePwPage() {
        return "member/findIdChangePw"; // /WEB-INF/views/member/findIdChangePw.jsp 파일
    }
}
