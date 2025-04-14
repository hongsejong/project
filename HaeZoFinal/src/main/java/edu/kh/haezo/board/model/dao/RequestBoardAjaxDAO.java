package edu.kh.haezo.board.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.RequestSupporter;

@Repository
public class RequestBoardAjaxDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

//	의뢰요청 게시글에 조력자 비동기 등록
	public int supportRequestBoard(RequestSupporter supporter) {
		return sqlSession.insert("requestBoardAjaxMapper.supportRequestBoard", supporter);
	}

//	의뢰요청 게시글 조력자 신청 철회
	public int withdrawRequestSupporter(Map<String, Object> map) {
		return sqlSession.delete("requestBoardAjaxMapper.withdrawRequestSupporter", map);
	}

//	의뢰요청 게시글 조력자 선택
	public int chooseOneSupporter(Map<String, Object> map) {
		return sqlSession.update("requestBoardAjaxMapper.chooseOneSupporter", map);
	}

//	의뢰인이 조력자에게 의뢰비 지급
	public int sendMoney(Map<String, Object> map) {
		return sqlSession.insert("requestBoardAjaxMapper.sendMoney", map);
	}

//	의뢰요청 게시글 의뢰 수락 상태 업데이트
	public int updateRequestStatusInProgress(Map<String, Object> map) {
		return sqlSession.update("requestBoardAjaxMapper.updateRequestStatus", map);
	}
	
//	조력자가 의뢰비를 받음
	public int receiveMoney(Map<String, Object> map) {
		return sqlSession.insert("requestBoardAjaxMapper.receiveMoney", map);
	}

//	의뢰 완료
	public int updateRequestStatusComplete(Map<String, Object> map) {
		return sqlSession.update("requestBoardAjaxMapper.updateRequestStatusComplete", map);
	}

//	리뷰 작성
	public int writeReview(Map<String, Object> map) {
		return sqlSession.insert("requestBoardAjaxMapper.writeReview", map);
	}


}
