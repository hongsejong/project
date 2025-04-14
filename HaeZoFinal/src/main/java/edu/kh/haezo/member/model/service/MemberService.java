package edu.kh.haezo.member.model.service;

import edu.kh.haezo.member.model.dto.Member;

public interface MemberService {

	/** 로그인 서비스
	 * @param inputMember(email,pw)
	 * @return email,pw가 일치하는 회원 정보 또는 null
	 */
	Member login(Member inputMember);

	int signUp(Member inputMember);


	String banend(int memberNo);

	Member loginWithKakao(String email, String nickname, String profileImage, String phoneNumber);

	Member loginWithNaver(String email, String nickname, String profileImage, String mobile);
}
