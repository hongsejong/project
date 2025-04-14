package edu.kh.haezo.myPage.model.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.common.utility.Util;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.myPage.model.dao.MyPageDAO;

@Service
public class MyPageServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageDAO dao;
	
	@Autowired // bean으로 등록된 객체 중 타입이 일치하는 객체 DI 
	private BCryptPasswordEncoder bcrypt;

	// 회원 프로필 정보 조회
	@Override
	public Member selectProfileInfo(int memberNo) {
		return dao.selectProfileInfo(memberNo);
	}

	// 회원이 작성한 게시글 목록 조회
	@Override
	public List<Board> selectmemBoardList(int memberNo, int boardCode) {
		return dao.selectmemBoardList(memberNo, boardCode);
	}

	// 자기소개 내용 수정
	@Override
	public int updateSelfIntro(Member member) {
		// XSS 방지 처리
		member.setMemberSelfIntro(Util.XSSHandling(member.getMemberSelfIntro()));
		return dao.updateSelfIntro(member);
	}

	// 자기소개 내용 수정 후 화면 전환
	@Override
	public String viewSelfIntro(int memberNo) {
		return dao.viewSelfIntro(memberNo);
	}

	@Override
	public int secession(int memberNo, String memberPw, String withdrawReason) {
	    // 1. 로그인한 회원의 암호화된 비밀번호 조회
	    String encPw = dao.selectEncPw(memberNo);
	    
	    // 2. 비밀번호 일치 확인
	    if(bcrypt.matches(memberPw, encPw)) {
	        // 3. 회원 탈퇴 처리 (UPDATE: MEMBER_DEL_FL = 'Y', MEMBER_DER_REASON에 탈퇴 사유 저장)
	        return dao.secession(memberNo, withdrawReason);
	    }
	    return 0;
	}

	// 마이페이지 요청한 의뢰게시판 게시글 목록 조회(ajax)
	@Override
	public List<Board> RequestBoardListIsNotDone(Map<String, Object> paramMap) {
		return dao.RequestBoardListIsNotDone(paramMap);
	}

	// 마이페이지 처리한 의뢰게시판 게시글 목록 조회(ajax)
	@Override
	public List<Board> RequestBoardListIsDone(Map<String, Object> paramMap) {
		return dao.RequestBoardListIsDone(paramMap);
	}

	// 마이페이지 작성한 자유게시판 게시글 목록 조회(ajax)
	@Override
	public List<Board> FreeBoardList(Map<String, Object> paramMap) {
		return dao.FreeBoardList(paramMap);
	}

	// 마이페이지 좋아요 누른 자유게시판 게시글 목록 조회(ajax)
	@Override
	public List<Board> FreeBoardListLike(Map<String, Object> paramMap) {
		return dao.FreeBoardListLike(paramMap);
	}

	// 회원 프로필 이미지 변경
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateProfileImg(MultipartFile profileImg, Member loginMember, String webPath, String filePath) throws IllegalStateException, IOException {
		
		String prevImg = loginMember.getProfileImg();
		
		String rename = null;
		if(profileImg.getSize() > 0) {
			rename = Util.fileRename(profileImg.getOriginalFilename());
			loginMember.setProfileImg(webPath + rename);
		} else {
			loginMember.setProfileImg(null);
		}
		
		int result = dao.updateProfileImg(loginMember);
		if(result > 0) {
			if(rename != null) profileImg.transferTo(new File(filePath + rename));
		} else {
			loginMember.setProfileImg(prevImg);
		}
		return result;
	}

	// 회원정보 수정
	@Override
	public int updateInfo(Member updateMember) {
		return dao.updateInfo(updateMember);
	}

	// 비밀번호 변경
	@Override
	public int chagePw(String currentPw, String newPw, int memberNo) {
		Member changeMemberPw = new Member();
		changeMemberPw.setMemberNo(memberNo);
		// 새로운 비밀번호 암호화
		changeMemberPw.setMemberPw(bcrypt.encode(newPw));
		
		// 1. 현재 비밀번호, DB에 저장된 비밀번호 비교 
		// 1-1) 회원번호가 일치하는 MEMBER_PW 조회
		String memberPw = dao.selectEncPw(memberNo);
		
		// 1-2) bcrypt.matches(평문,암호문) 같으면 true -> 이 때 비밀번호 변경
		if(bcrypt.matches(currentPw, memberPw)) {
			// 2. 비밀번호 변경 후 결과 반환
			return dao.changePw(changeMemberPw);
		} 
		// 3. 비밀번호가 일치하지 않는 경우 0 반환
		return 0;
	}
	
}
