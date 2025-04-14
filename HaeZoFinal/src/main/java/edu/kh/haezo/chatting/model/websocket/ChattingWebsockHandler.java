package edu.kh.haezo.chatting.model.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import edu.kh.haezo.chatting.model.service.ChattingService;
import edu.kh.haezo.chatting.model.dto.Message;
import edu.kh.haezo.member.model.dto.Member;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ChattingWebsockHandler extends TextWebSocketHandler{

	@Autowired
	private ChattingService service;
	
	// WebSocketSession : 클라이언트 - 서버 간 전이중통신을 담당하는 객체 (JDBC Connection과 유사)
	// 클라이언트의 최초 웹소켓 요청 시 생성
	private Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet());
	// synchronizedSet : 동기화된 Set을 반환 (HashSet은 기본적으로 비동기)
	// -> 멀티쓰레드 환경에서 하나의 컬렉션에 여러 쓰레드가 접근하여 의도치 않은 문제가 발생하지 않기 위해
	//    동기화를 진행하여 여러 쓰레드가 순서대로 한 컬렉션에 접근할 수 있게 변경
	
	// afterConnectionEstablished : 클라이언트와 연결이 완료되고, 통신할 준비가 되면 실행
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// 연결 요청이 접수되면 해당 클라이언트와 통신을 담당하는 WebSocketSession 객체가 전달되어 옴
		
		// 이를 필드에 선언해둔 sessions에 저장
		sessions.add(session);
		
		log.info("{}연결됨", session.getId());
	}
		
	// handleTextMessage : 클라이언트로부터 텍스트 메세지를 받았을 때 실행
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		// 전달 받은 내용은 JSON 형태의 String
		log.info("전달 받은 내용 : {}", message.getPayload());
		
		// ObjectMapper : Jackson에서 제공하는 객체
		// JSON String -> DTO Object
		// {"sendNo":"2","targetNo":"1","chattingNo":"1","messageContent":"내일도 지각하지 않고 수업들으러 와야지^^!"}
		ObjectMapper objectMapper = new ObjectMapper();
		
		Message msg = objectMapper.readValue(message.getPayload(), Message.class);
		
		log.info("Message : {}", msg);
		
		// DB에 메세지 삽입 서비스 호출
		int result = service.insertMessage(msg);
		
		if(result > 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd hh:mm");
			msg.setSendTime(sdf.format(new Date()));
			
			// 필드에 sessions에는 접속 중인 모든 회원의 세션 정보가 담겨 있음
			for(WebSocketSession s : sessions) {
				// WebSocketSession은 HttpSession의 속성을 가로채서 똑같이 가지고 있기 때문에
				// 로그인한 회원의 정보를 나타내는 loginMember도 가지고 있음
				
				// 로그인한 회원 정보 중 회원 번호 얻어오기
				int loginMemberNo = ((Member) s.getAttributes().get("loginMember")).getMemberNo();
				
				// 로그인 상태인 회원 중 targetNo 또는 senderNo가 일치하는 회원에게만 메세지 전달
				if(loginMemberNo == msg.getTargetNo() || loginMemberNo == msg.getSenderNo()) {
					s.sendMessage(new TextMessage(new Gson().toJson(msg)));
				}
			}
		}
	}

	// afterConnectionClosed : 클라이언트와 연결이 종료되면 실행
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
}
