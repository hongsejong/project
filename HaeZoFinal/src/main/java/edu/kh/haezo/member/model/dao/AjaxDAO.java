package edu.kh.haezo.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AjaxDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	/** 이메일 중복검사
	 * @param email
	 * @return count
	 */
	public String checkEmail(String email) {
		return sqlSession.selectOne("ajaxMapper.checkEmail",email);
		
	}
	
	/** 닉네임 중복 검사
	 * @param nickname
	 * @return count
	 */
	public int checkNickname(String nickname) {
		return sqlSession.selectOne("ajaxMapper.checkNickname",nickname);
	}
}
