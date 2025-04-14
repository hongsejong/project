package edu.kh.haezo.sse.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.sse.model.dto.Notification;

@Repository
public class SseDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 알림 삽입
	 * @param notification
	 * @return result
	 */
	public int insertNotification(Notification notification) {
		return sqlSession.insert("sseMapper.insertNotification", notification);
	}

	/** 알림 받을 회원 번호 + 안 읽은 알림 개수 조회
	 * @param notificationNo
	 * @return map
	 */
	public Map<String, Object> selectReceiveMember(int notificationNo) {
		return sqlSession.selectOne("sseMapper.selectReceiveMember", notificationNo);
	}

	/** 로그인한 회원의 알림 목록 조회
	 * @param memberNo
	 * @return result(알림 목록)
	 */
	public List<Notification> selectNotificationList(int memberNo) {
		return sqlSession.selectList("sseMapper.selectNotificationList", memberNo);
	}

	/** 현재 로그인한 회원이 받은 알림 중 읽지 않은 알림 개수 조회
	 * @param memberNo
	 * @return count
	 */
	public int notReadCheck(int memberNo) {
		return sqlSession.selectOne("sseMapper.notReadCheck", memberNo);
	}

	/** 알림 지우기
	 * @param notificationNo
	 */
	public void deleteNotification(int notificationNo) {
		sqlSession.delete("sseMapper.deleteNotification", notificationNo);
	}

	/** 알림 읽음 처리
	 * @param notificationNo
	 */
	public void readCheck(int notificationNo) {
		sqlSession.update("sseMapper.readCheck", notificationNo);
	}
	
}
