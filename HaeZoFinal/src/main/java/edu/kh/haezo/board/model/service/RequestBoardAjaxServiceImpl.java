package edu.kh.haezo.board.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.haezo.board.model.dao.RequestBoardAjaxDAO;
import edu.kh.haezo.board.model.dto.RequestSupporter;

@Service
public class RequestBoardAjaxServiceImpl implements RequestBoardAjaxService {
	
	
	@Autowired
	private RequestBoardAjaxDAO dao;
	

//	요청글에 조력자 비동기등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int supportRequestBoard(RequestSupporter supporter) {
		return dao.supportRequestBoard(supporter);
	}
	
//	요청글 조력자 신청 철회
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int withdrawRequestSupporter(Map<String, Object> map) {
		return dao.withdrawRequestSupporter(map);
	}
	
//	조력자 선택 및 의뢰비 지급
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int chooseSupporterAndPay(Map<String, Object> map) {
		
	    int result = dao.chooseOneSupporter(map);
	    if (result != 1) throw new RuntimeException("조력자 선택 실패");

	    result = dao.sendMoney(map);
	    if (result != 1) throw new RuntimeException("의뢰비 송금 실패");

	    result = dao.updateRequestStatusInProgress(map);
	    if (result != 1) throw new RuntimeException("요청 상태 변경 실패");
	    
	    return result;
	}
	
	
//	의뢰 완료
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateRequestStatusComplete(Map<String, Object> map) {
		
			int result = dao.receiveMoney(map);
		    if (result != 1) throw new RuntimeException("의뢰비 수령 실패");

		    result = dao.updateRequestStatusComplete(map);
		    if (result != 1) throw new RuntimeException("요청 상태 변경 실패");
		    
		    return result;
	}
	
//	리뷰 작성
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int writeReview(Map<String, Object> map) {
		int result = dao.writeReview(map);
	    if (result != 1) throw new RuntimeException("리뷰 작성 실패");
		return result;
	}
	
}
