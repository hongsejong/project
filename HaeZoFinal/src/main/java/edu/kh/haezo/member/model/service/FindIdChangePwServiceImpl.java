package edu.kh.haezo.member.model.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.haezo.member.model.dao.FindIdChangePwDAO;
import javax.mail.internet.MimeMessage;

@Service
public class FindIdChangePwServiceImpl implements FindIdChangePwService {

    @Autowired
    private FindIdChangePwDAO dao;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private JavaMailSender mailSender;
    
    // 보내는 사람 정보 (환경에 맞게 수정)
    private String fromEmail = "hsj3779@gmail.com";
    private String fromUsername = "프로젝트";
    
    @Override
    public String findMemberEmailByTel(String tel) {
        return dao.selectMemberEmailByTel(tel);
    }
    
    @Override
    public int sendEmailAuth(String email, String title) {
        return emailService.signUp(email, title);
    }
    
   
    
    @Override
    public int checkAuthKey(Map<String, Object> paramMap) {
        return dao.checkAuthKey(paramMap);
    }
    @Transactional(rollbackFor = Exception.class)
    @Override
    public int changePassword(String email, String newPw) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPw = encoder.encode(newPw);
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("email", email);
        paramMap.put("newPw", encodedPw);
        return dao.updatePassword(paramMap);
    }
}
