package edu.kh.haezo.member.model.service;

import java.util.Map;

public interface FindIdChangePwService {
    String findMemberEmailByTel(String tel);
    int sendEmailAuth(String email, String title);
    int checkAuthKey(Map<String, Object> paramMap);
    int changePassword(String email, String newPw);
}
