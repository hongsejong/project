package edu.kh.haezo.member.model.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoServiceImpl implements KakaoService {

    // application.properties에서 주입
    @Value("${kakao.restApiKey}")
    private String restApiKey;

    @Value("${kakao.redirectUri}")
    private String redirectUri;
    
    // clientSecret은 필요하면 활성화되어 있다면 주입 (없으면 빈문자열)
    @Value("${kakao.clientSecret:}")
    private String clientSecret;
    
    @Override
    public String getAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", restApiKey);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        if(clientSecret != null && !clientSecret.isEmpty()) {
            params.add("client_secret", clientSecret);
        }
        System.out.println("카카오 요청 redirect_uri = " + redirectUri);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, params, Map.class);
        Map<String, Object> responseBody = response.getBody();
        if(responseBody == null || !responseBody.containsKey("access_token")) {
            throw new RuntimeException("Kakao API response does not contain access_token: " + responseBody);
        }
        return (String) responseBody.get("access_token");
    }

    @Override
    public Map getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity, Map.class);
        return response.getBody();
    }
    
    @Override
    public void logoutKakao(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        String logoutUrl = "https://kapi.kakao.com/v1/user/logout";
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);
        
        try {
            ResponseEntity<String> response = restTemplate.exchange(logoutUrl, HttpMethod.POST, entity, String.class);
            System.out.println("Kakao logout response: " + response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    
    
    // 아래 getter 메소드는 컨트롤러에서 설정값을 사용하고 싶을 때 사용할 수 있습니다.
    @Override
    public String getRestApiKey() {
        return restApiKey;
    }

    @Override
    public String getRedirectUri() {
        return redirectUri;
    }
}
