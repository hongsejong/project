package edu.kh.haezo.member.model.service;

import java.util.Map;

public interface NaverService {
	 String getAccessToken(String code, String clientId, String redirectUri);
    Map getUserInfo(String accessToken);
    void logoutNaver(String accessToken);
}
