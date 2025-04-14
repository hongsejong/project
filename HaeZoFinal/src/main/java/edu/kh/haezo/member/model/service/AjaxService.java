package edu.kh.haezo.member.model.service;

public interface AjaxService {

	
	/** 이메일 중복검사
	 * @param email
	 * @return count
	 */
	String checkEmail(String email);


	int checkNickname(String nickname);
}
