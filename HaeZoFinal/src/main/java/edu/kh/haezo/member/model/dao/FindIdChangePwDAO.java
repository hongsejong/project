package edu.kh.haezo.member.model.dao;

import java.util.Map;

public interface FindIdChangePwDAO {
    String selectMemberEmailByTel(String tel);
    int updateAuthKey(Map<String, String> map);
    int insertAuthKey(Map<String, String> map);
    int checkAuthKey(Map<String, Object> paramMap);
    int updatePassword(Map<String, Object> paramMap);
}
