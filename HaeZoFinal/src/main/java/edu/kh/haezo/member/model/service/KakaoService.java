package edu.kh.haezo.member.model.service;

import java.util.Map;

public interface KakaoService {
    String getAccessToken(String code);
    Map getUserInfo(String accessToken);
    void logoutKakao(String accessToken);
    
    // (선택) getter 메소드 – 카카오 API 관련 설정값을 컨트롤러에서 사용할 경우
    String getRestApiKey();
    String getRedirectUri();
}
