package edu.kh.haezo.board.model.service;

import java.util.Map;

import edu.kh.haezo.board.model.dto.RequestSupporter;

public interface RequestBoardAjaxService {

	/** 요청글 조력자 비동기 등록
	 * @param supporter
	 * @return result
	 */
	int supportRequestBoard(RequestSupporter supporter);

	/** 요청글 조력자 신청 철회
	 * @param map
	 * @return result
	 */
	int withdrawRequestSupporter(Map<String, Object> map);

	/** 조력자 선택 및 의뢰비 지급
	 * @param map
	 * @return result
	 */
	int chooseSupporterAndPay(Map<String, Object> map);
	
	/** 의뢰 완료
	 * @param map
	 * @return result
	 */
	int updateRequestStatusComplete(Map<String, Object> map);

	/** 리뷰 등록
	 * @param map
	 * @return result
	 */
	int writeReview(Map<String, Object> map);
}
