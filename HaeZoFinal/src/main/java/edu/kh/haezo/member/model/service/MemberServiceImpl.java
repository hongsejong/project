package edu.kh.haezo.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.haezo.member.model.dao.MemberDAO;
import edu.kh.haezo.member.model.dto.Member;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberDAO dao;
    
    @Autowired
    private BCryptPasswordEncoder bcrypt;
    
    @Override
    public Member login(Member inputMember) {
        // 기존 로그인 로직
        Member loginMember = dao.login(inputMember);
        if (loginMember != null && bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
            loginMember.setMemberPw(null);
        } else {
            loginMember = null;
        }
        return loginMember;
    }
    
    @Transactional(rollbackFor = {Exception.class})
    @Override
    public int signUp(Member inputMember) {
        String encPw = bcrypt.encode(inputMember.getMemberPw());
        inputMember.setMemberPw(encPw);
        return dao.signUp(inputMember);
    }

    @Override
    public String banend(int memberNo) {
        return dao.banend(memberNo);
    }

    @Override
    public Member loginWithKakao(String email, String nickname, String profileImage, String phoneNumber) {
        // 기존 회원 여부 확인
        Member member = dao.selectMemberByEmail(email);
        if(member == null) {
            // 신규 회원가입 처리
            member = new Member();
            member.setMemberEmail(email);
            member.setMemberNickname(nickname);
            member.setProfileImg(profileImage);
            member.setMemberTel(phoneNumber); // 전화번호도 세팅

            // 기타 필드는 필요에 따라 기본값 설정 가능 (예: 자기소개는 빈 문자열)
            member.setMemberSelfIntro("");
            
            // 신규 회원 INSERT
            dao.insertMember(member);
            
            // DB에 INSERT 후, 새로 가입된 회원의 전체 정보를 다시 조회
            member = dao.selectMemberByEmail(email);
        }
        return member;
    }
    

    
    @Override
    public Member loginWithNaver(String email, String nickname, String profileImage, String mobile) {
        Member member = dao.selectMemberByEmail(email);
        if(member == null) {
            member = new Member();
            member.setMemberEmail(email);
            member.setMemberNickname(nickname);
            member.setProfileImg(profileImage);
            member.setMemberTel(mobile);
            member.setMemberSelfIntro("");
            dao.insertMember(member);
            // INSERT 후 다시 조회
            member = dao.selectMemberByEmail(email);
        }
        return member;
    }
}
