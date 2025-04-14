package edu.kh.haezo.payment.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Payment {
	private int paymentNo;
	private String paymentType;
	private int amount;
	private String paymentDate;
	private String paymentDesc;
	private int memberNo;
	private String orderId;   // 토스페이먼츠 결제 API 필요
	private String paymentKey; // 토스페이먼츠 결제 API 필요
	
	private int requestPrice;
}
