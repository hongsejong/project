package edu.kh.haezo.myPage.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.member.model.dto.Member;

public interface MyPageService {

	/**회원 프로필 정보 조회
	 * @param memberNo
	 * @return 회원 프로필 정보(닉네임, 리뷰 평균 별점, 자기 소개)
	 */
	Member selectProfileInfo(int memberNo);

	/**회원이 작성한 게시글 목록 조회
	 * @param memberNo
	 * @param boardCode
	 * @return 회원이 작성한 게시글 목록
	 */
	List<Board> selectmemBoardList(int memberNo, int boardCode);

	/**자기소개 내용 수정(ajax)
	 * @param member
	 * @return result
	 */
	int updateSelfIntro(Member member);

	/**자기소개 수정 후 화면 전환(ajax)
	 * @param memberNo
	 * @return memberSelfIntro
	 */
	String viewSelfIntro(int memberNo);

	int secession(int memberNo, String memberPw, String withdrawReason);

	/**마이페이지 요청한 의뢰게시판 게시글 목록 조회(ajax)
	 * @param memberNo
	 * @return 요청한 의뢰게시판 게시글 목록
	 */
	List<Board> RequestBoardListIsNotDone(Map<String, Object> paramMap);

	/**마이페이지 처리한 의뢰게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 처리한 의뢰게시판 게시글 목록
	 */
	List<Board> RequestBoardListIsDone(Map<String, Object> paramMap);

	/**마이페이지 작성한 자유게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 작성한 자유게시판 게시글 목록
	 */
	List<Board> FreeBoardList(Map<String, Object> paramMap);

	/**마이페이지 좋아요 누른 자유게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 좋아요 누른 자유게시판 게시글 목록
	 */
	List<Board> FreeBoardListLike(Map<String, Object> paramMap);

	/**회원 프로필 이미지 변경
	 * @param profileImg
	 * @param loginMember
	 * @param webPath
	 * @param filePath
	 * @return result
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int updateProfileImg(MultipartFile profileImg, Member loginMember, String webPath, String filePath) throws IllegalStateException, IOException;

	/*회원정보 수정
	 * @param updateMember
	 * @return result
	 */
	int updateInfo(Member updateMember);

	/**비밀번호 변경
	 * @param currentPw
	 * @param newPw
	 * @param memberNo
	 * @return result
	 */
	int chagePw(String currentPw, String newPw, int memberNo);

}
