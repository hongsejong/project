package edu.kh.haezo.member.model.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.haezo.member.model.dao.EmailDAO;

@Service
public class EmailServiceImpl implements EmailService{
	
	@Autowired
	private EmailDAO dao;
	
	@Autowired
    private JavaMailSender mailSender;
	
	private String fromEmail = "hsj3779@gmail.com";
    private String fromUsername = "수업용프로젝트";
    
    
    @Override
    public String createAuthKey() {
        String key = "";
        
        for(int i=0 ; i< 6 ; i++) {
            
            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
            
            if(sel1 == 0) {
                
                int num = (int)(Math.random() * 10); // 0~9
                key += num;
                
            }else {
                
                char ch = (char)(Math.random() * 26 + 65); // A~Z
                
                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
                
                if(sel2 == 0) {
                    ch = (char)(ch + ('a' - 'A')); // 소문자로 변경
                }
                
                key += ch;
            }
            
        }
        return key;
    }
    
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public int insertAuthKeyNew(Map<String, String> map) {
        return dao.insertAuthKey(map);
    }
    
    @Override
    public int signUp(String email, String title) {
        
        //6자리 난수 인증번호 생성
        String authKey = createAuthKey();
        try {


            //인증메일 보내기
            MimeMessage mail = mailSender.createMimeMessage();
            
            // 제목
            String subject = "[Board Project]"+title+" 인증코드";
            
            // 문자 인코딩
            String charset = "UTF-8";
            
            // 메일 내용
            String mailContent 
                = "<p>Board Project "+title+" 인증코드입니다.</p>"
                + "<h3 style='color:blue'>" + authKey + "</h3>";
            
            
            
            // 송신자(보내는 사람) 지정
            mail.setFrom(new InternetAddress(fromEmail, fromUsername));
            mail.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            
            // 수신자(받는사람) 지정
            
            // 이메일 제목 세팅
            mail.setSubject(subject, charset);
            
            // 내용 세팅
            mail.setText(mailContent, charset, "html"); //"html" 추가 시 HTML 태그가 해석됨
            
            mailSender.send(mail);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
        
        Map<String, String> map = new HashMap<String, String>();
        map.put("authKey", authKey);
        map.put("email", email);
        
        System.out.println(map);
        
        int result = dao.updateAuthKey(map);
        
        if(result == 0) {
        	 result = insertAuthKeyNew(map);
        }
        


        return result;
    }


	@Override
	public int checkAuthKey(Map<String, Object> paramMap) {
		return dao.checkAuthKey(paramMap);
	}

	 @Override
	    public boolean verifyEmailAuthCode(String email, String inputKey) {
	        Map<String, Object> paramMap = new HashMap<>();
	        paramMap.put("email", email);
	        paramMap.put("inputKey", inputKey);
	        int count = dao.checkAuthKey(paramMap);
	        return count > 0;
	    }
	  
    
}
