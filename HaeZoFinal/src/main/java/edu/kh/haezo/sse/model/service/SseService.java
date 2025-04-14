package edu.kh.haezo.sse.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.haezo.sse.model.dto.Notification;

public interface SseService {

	/** 알림 삽입 후 알림 받을 회원 번호 + 읽지 않은 알림 개수 반환
	 * @param notification
	 * @return map
	 */
	Map<String, Object> insertNotification(Notification notification);

	/** 로그인한 회원의 알림 목록 조회
	 * @param memberNo
	 * @return result(알림 목록)
	 */
	List<Notification> selectNotificationList(int memberNo);

	/** 현재 로그인한 회원이 받은 알림 중 읽지 않은 알림 개수 조회
	 * @param memberNo
	 * @return count
	 */
	int notReadCheck(int memberNo);

	/** 알림 지우기
	 * @param notificationNo
	 */
	void deleteNotification(int notificationNo);

	/** 알림 읽음 처리
	 * @param notificationNo
	 */
	void readCheck(int notificationNo);
	
}
