package edu.kh.haezo.singo.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.dto.UserBan;
import edu.kh.haezo.singo.model.dto.Singo;

public interface SingoService {

	//작성자 번호찾기
	int getWriteMemberNo(int boardNo);

	//신고하기
	int insertReport(Map<String, Object> paramMap);

	//신고 파일 등록
	int singoFile(MultipartFile file, int boardNo, String webPath, String filePath);

	//글작성자 찾기
	Member findMember(int boardNo);

	//신고 목록 조회
	Map<String, Object> selectSingoListAll(int cp, int listCount);
	
	//신고한 보드넘버 찾기
	int getboardNo(int reportNo);

	//신고 상세조회
	Singo selectBoard(Map<String, Object> map);

	//신고글의 파일조회
	List<Object> selectFiles(int boardNo);

	void ignoreReport(int reportNo);

	void deleteReport(int reportNo);

	Map<String, Object> boardStatusCheck(Map<String, Object> tmap);
	
	//파일삭제위한 전체파일리스트조회
	List<String> selectSingoFileList();

	//리포트 3이상인애들 조회
	List<UserBan> selectReportCount();

	//최초정지
	int userBan(UserBan ub);

	//멤버 벤테이블 변경
	void memberBan(UserBan ub);

	//2회 정지시 회원탈퇴처리
	void memberOut(UserBan ub);

	//카운트 초기화
	void reportReset(UserBan ub);

	//자동 정지해제
	void memberRevive();










}
