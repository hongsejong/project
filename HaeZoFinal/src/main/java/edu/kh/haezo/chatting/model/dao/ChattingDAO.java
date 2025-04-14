package edu.kh.haezo.chatting.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.chatting.model.dto.ChattingRoom;
import edu.kh.haezo.chatting.model.dto.Message;
import edu.kh.haezo.member.model.dto.Member;

@Repository
public class ChattingDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	/** 채팅방 목록 조회
	 * @param loginMember
	 * @return chattingRoomList
	 */
	public List<ChattingRoom> selectChattingRoomList(Member loginMember) {
		return sqlSession.selectList("chattingMapper.selectChatRoomList", loginMember.getMemberNo());
	}

	/** 채팅 상대방 검색
	 * @param map
	 * @return targetList
	 */
	public List<Member> selectTarget(Map<String, Object> map) {
		return sqlSession.selectList("chattingMapper.selectTarget", map);
	}

	/** 채팅방 존재여부 확인
	 * @param map
	 * @return chattingNo
	 */
	public int checkChattingNo(Map<String, Integer> map) {
		return sqlSession.selectOne("chattingMapper.checkChattingNo", map);
	}

	/** 채팅방 생성
	 * @param map
	 * @return chattingNo
	 */
	public int createChattingRoom(Map<String, Integer> map) {
		int result = sqlSession.insert("chattingMapper.createChattingRoom", map);
		int chattingNo = 0;
		if(result > 0) chattingNo = map.get("chattingNo");
		return chattingNo;
	}

	/** 채팅방 읽음 표시
	 * @param paramMap
	 * @return result
	 */
	public int updateReadFlag(Map<String, Object> paramMap) {
		return sqlSession.update("chattingMapper.updateReadFlag", paramMap);
	}

	/** 채팅방 메세지 목록 조회
	 * @param parseInt
	 * @return messageList
	 */
	public List<Message> selectMessageList(int chattingNo) {
		return sqlSession.selectList("chattingMapper.selectMessageList", chattingNo);
	}

	/** 채팅 메세지 삽입
	 * @param msg
	 * @return result
	 */
	public int insertMessage(Message msg) {
		return sqlSession.insert("chattingMapper.insertMessage", msg);
	}
	
}
