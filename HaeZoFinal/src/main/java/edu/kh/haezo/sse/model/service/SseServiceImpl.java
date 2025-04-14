package edu.kh.haezo.sse.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.common.utility.Util;
import edu.kh.haezo.sse.model.dao.SseDAO;
import edu.kh.haezo.sse.model.dto.Notification;

@Service
public class SseServiceImpl implements SseService{

	@Autowired
	private SseDAO dao;

	// 알림 삽입 후 알림 받을 회원 번호 + 읽지 않은 알림 개수 반환
	@Override
	public Map<String, Object> insertNotification(Notification notification) {
		// 결과 저장용 map
		Map<String, Object> map = null;
		// 알림 삽입
		int result = dao.insertNotification(notification);
		// 알림 삽입 성공 시
		if(result > 0) {
			// 알림을 받아야 하는 회원 번호 + 안 읽은 알림 개수 조회
			map = dao.selectReceiveMember(notification.getNotificationNo());
			// 채팅 알림인 경우
			if(notification.getNotificationType().equals("insertChatting")) {
				String url = notification.getNotificationUrl();
				String[] arr = url.split("ch=");
				String chatNo = arr[arr.length - 1];
				map.put("chattingRoomNo", chatNo); // 채팅방 번호
				map.put("notificationNo", notification.getNotificationNo()); // 알림 번호
			}
		}
		return map;
	}

	// 로그인한 회원의 알림 목록 조회
	@Override
	public List<Notification> selectNotificationList(int memberNo) {
		return dao.selectNotificationList(memberNo);
	}

	// 현재 로그인한 회원이 받은 알림 중 읽지 않은 알림 개수 조회
	@Override
	public int notReadCheck(int memberNo) {
		return dao.notReadCheck(memberNo);
	}
	
	// 알림 지우기
	@Override
	public void deleteNotification(int notificationNo) {
		dao.deleteNotification(notificationNo);
	}

	// 알림 읽음 처리
	@Override
	public void readCheck(int notificationNo) {
		dao.readCheck(notificationNo);
	}
	
}
