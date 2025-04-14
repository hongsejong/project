package edu.kh.haezo.payment.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.json.simple.parser.ParseException;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.payment.model.dto.Payment;

public interface PaymentService {

	/** 포인트 충전 결제
	 * @param payment
	 * @return result
	 */
	int insertPayment(Payment payment);
	
	// 잔액 조회
	int remainingAmount(Member loginMember);

	/** 포인트 출금 신청
	 * @param payment
	 * @param loginMember 
	 * @return afterTotalAmount
	 */
	int withdrawPoint(Payment payment, Member loginMember);

	/** paymentKey 조회
	 * @param memberNo
	 * @return paymentKey
	 */
	List<String> selectPaymentKeys(int memberNo);

	/** 결제 내역 조회
	 * @param memberNo
	 * @param offset
	 * @param limit
	 * @return 결제 내역
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ParseException
	 */
	List<Map<String, Object>> getPaymentList(int memberNo, int offset, int limit) throws IOException, InterruptedException, ParseException;

}
