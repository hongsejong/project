package edu.kh.haezo.payment.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.payment.model.dto.Payment;

@Repository
public class PaymentDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 포인트 충전 결제
	 * @param payment
	 * @return result
	 */
	public int insertPayment(Payment payment) {
		return sqlSession.insert("paymentMapper.insertPayment", payment);
	}

	/** 포인트 출금신청 정보 삽입
	 * @param payment
	 * @return result
	 */
	public int insertBalance(Payment payment) {
		return sqlSession.insert("paymentMapper.insertBalance", payment);
	}
  
	/** 잔액 조회
	 * @param loginMember
	 * @return amount
	 */
	public int remainingAmount(Member loginMember) {
		return sqlSession.selectOne("paymentMapper.remainingAmount", loginMember);
	}

	/** paymentKey 조회
	 * @param memberNo
	 * @return paymentKey
	 */
	public List<String> selectPaymentKeys(int memberNo) {
		return sqlSession.selectList("paymentMapper.selectPaymentKeys", memberNo);
	}
	
}
