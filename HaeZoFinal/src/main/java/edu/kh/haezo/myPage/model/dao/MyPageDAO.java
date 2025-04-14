package edu.kh.haezo.myPage.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.member.model.dto.Member;

@Repository
public class MyPageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/**회원 프로필 정보 조회
	 * @param memberNo
	 * @return 회원 프로필 정보(닉네임, 리뷰 평균 별점, 자기 소개)
	 */
	public Member selectProfileInfo(int memberNo) {
		return sqlSession.selectOne("myPageMapper.selectProfileInfo", memberNo);
	}

	/**회원이 작성한 게시글 목록 조회
	 * @param memberNo
	 * @param boardCode
	 * @return 회원이 작성한 게시글 목록
	 */
	public List<Board> selectmemBoardList(int memberNo, int boardCode) {
		Board board = new Board();
		board.setBoardCode(boardCode);
		board.setMemberNo(memberNo);
		return sqlSession.selectList("myPageMapper.selectmemBoardList", board);
	}

	/**자기소개 내용 수정(ajax)
	 * @param member
	 * @return result
	 */
	public int updateSelfIntro(Member member) {
		return sqlSession.update("myPageMapper.updateSelfIntro", member);
	}

	/**자기소개 내용 수정 후 화면 전환(ajax)
	 * @param memberNo
	 * @return memberSelfIntro
	 */
	public String viewSelfIntro(int memberNo) {
		return sqlSession.selectOne("myPageMapper.viewSelfIntro", memberNo);
	}

	public String selectEncPw(int memberNo) {
		return sqlSession.selectOne("myPageMapper.selectEncPw",memberNo);
	}

	public int secession(int memberNo, String withdrawReason) {
	    Map<String, Object> paramMap = new HashMap<>();
	    paramMap.put("memberNo", memberNo);
	    paramMap.put("withdrawReason", withdrawReason);
	    return sqlSession.update("myPageMapper.secession", paramMap);
	}

	/**마이페이지 요청한 의뢰게시판 게시글 목록 조회(ajax)
	 * @param memberNo
	 * @return 요청한 의뢰게시판 게시글 목록
	 */
	public List<Board> RequestBoardListIsNotDone(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.RequestBoardListIsNotDone",paramMap);
	}

	/**마이페이지 처리한 의뢰게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 처리한 의뢰게시판 게시글 목록
	 */
	public List<Board> RequestBoardListIsDone(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.RequestBoardListIsDone",paramMap);
	}

	/**마이페이지 작성한 자유게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 작성한 자유게시판 게시글 목록
	 */
	public List<Board> FreeBoardList(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.FreeBoardList",paramMap);
	}

	/**마이페이지 좋아요 누른 자유게시판 게시글 목록 조회(ajax)
	 * @param paramMap
	 * @return 좋아요 누른 자유게시판 게시글 목록
	 */
	public List<Board> FreeBoardListLike(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.FreeBoardListLike",paramMap);
	}

	/**회원 프로필 이미지 변경
	 * @param loginMember
	 * @return result
	 */
	public int updateProfileImg(Member loginMember) {
		return sqlSession.update("myPageMapper.updateProfileImg", loginMember);
	}

	/**회원정보 수정
	 * @param updateMember
	 * @return result
	 */
	public int updateInfo(Member updateMember) {
		return sqlSession.update("myPageMapper.updateInfo",updateMember);
	}

	/**비밀번호 변경
	 * @param changeMemberPw
	 * @return result
	 */
	public int changePw(Member changeMemberPw) {
		return sqlSession.update("myPageMapper.changePw",changeMemberPw);
	}
	
}
