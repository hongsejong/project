package edu.kh.haezo.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Review {
	
	private int boardNo;
	private String reviewContent;
	private double reviewRating;
	
	// 최신 리뷰 조회용
	private String supporterProfile;
	private String supporterNick;
	private String revieDate;
	private int memberNo;

}
