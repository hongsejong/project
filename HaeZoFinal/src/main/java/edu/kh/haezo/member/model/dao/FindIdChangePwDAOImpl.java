package edu.kh.haezo.member.model.dao;

import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FindIdChangePwDAOImpl implements FindIdChangePwDAO {

    @Autowired
    private SqlSessionTemplate sqlSession;
    
    @Override
    public String selectMemberEmailByTel(String tel) {
        return sqlSession.selectOne("findIdChangePwMapper.selectMemberEmailByTel", tel);
    }
    
    @Override
    public int updateAuthKey(Map<String, String> map) {
        return sqlSession.update("emailMapper.updateAuthKey", map);
    }
    
    @Override
    public int insertAuthKey(Map<String, String> map) {
        return sqlSession.insert("emailMapper.insertAuthKey", map);
    }
    
    @Override
    public int checkAuthKey(Map<String, Object> paramMap) {
        return sqlSession.selectOne("emailMapper.checkAuthKey", paramMap);
    }
    
    @Override
    public int updatePassword(Map<String, Object> paramMap) {
        return sqlSession.update("findIdChangePwMapper.updatePassword", paramMap);
    }
}
