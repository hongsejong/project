package edu.kh.haezo.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.member.model.dto.Member;

@Repository
public class MemberDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	public Member login(Member inputMember) {
		
		return sqlSession.selectOne("memberMapper.login",inputMember);
	}
	public int signUp(Member inputMember) {
		return sqlSession.insert("memberMapper.signUp",inputMember);
	}

	public String banend(int memberNo) {
		return sqlSession.selectOne("memberMapper.banend",memberNo);
	}
	
	public Member selectMemberByEmail(String email) {
		return sqlSession.selectOne("memberMapper.selectMemberByEmail", email);
	}

	public int insertMember(Member member) {
		return sqlSession.insert("memberMapper.insertMember", member);
	}
}
