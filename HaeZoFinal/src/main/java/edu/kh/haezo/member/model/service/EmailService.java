package edu.kh.haezo.member.model.service;

import java.util.Map;

public interface EmailService {

	int signUp(String email, String title);

	String createAuthKey();
	
	int checkAuthKey(Map<String, Object> paramMap);

	boolean verifyEmailAuthCode(String email, String emailAuthCode);
	
    int insertAuthKeyNew(Map<String, String> map);
}
