package edu.kh.haezo.member.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {
	
	private int memberNo;             // 회원 번호
    private String memberEmail;       // 이메일
    private String memberPw;          // 비밀번호
    private String memberNickname;    // 닉네임
    private String memberTel;         // 전화번호
    private String memberAddress;        // 주소 (NULL 가능)
    private String profileImg;        // 프로필 이미지 (NULL 가능)
    private String enrollDate;          // 가입 날짜 (기본값: SYSDATE)
    private String memberSelfIntro;   // 자기소개 (NULL 가능)
    private String memberBan;           // 정지 여부 (기본값: 'N')
    private String memberDerReason;   // 탈퇴 사유 (NULL 가능)
    private String memberDeleteFlag;        // 탈퇴 여부 (기본값: 'N')
    
    // 마이페이지 회원프로필 정보 조회용
    private double reviewRating;	  // 리뷰 별점
    

}