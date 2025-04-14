package edu.kh.haezo.chatting.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.chatting.model.dto.Message;
import edu.kh.haezo.member.model.dto.Member;

public interface ChattingService {

	/** 채팅방 목록 조회
	 * @param loginMember
	 * @return chattingRoomList
	 */
	List<ChattingRoom> selectChattingRoomList(Member loginMember);

	/** 채팅 상대방 검색
	 * @param map
	 * @return targetList
	 */
	List<Member> selectTarget(Map<String, Object> map);

	/** 채팅방 입장(없으면 생성)
	 * @param map
	 * @return chattingNo
	 */
	int selectChattingNo(Map<String, Integer> map);

	/** 채팅방 생성
	 * @param map 
	 * @return chattingNo
	 */
	int createChattingRoom(Map<String, Integer> map);

	/** 채팅 읽음 표시
	 * @param paramMap
	 * @return result
	 */
	int updateReadFlag(Map<String, Object> paramMap);

	/** 채팅방 메세지 목록 조회(메세지 목록 존재하는 경우 알림 읽음 처리까지 진행)
	 * @param paramMap
	 * @return messageList
	 */
	List<Message> selectMessageList(Map<String, Object> paramMap);

	/** 채팅 메세지 삽입
	 * @param msg
	 * @return result
	 */
	int insertMessage(Message msg);
	
}
