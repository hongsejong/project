package edu.kh.haezo.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestSupporter {
	// 메인 페이지 인기 조력자 조회용
	private int supporterNo;
	private String supporterNickname;
	private String supporterProfile;
	private double reviewRating;
	private String categoryName;
	private int categoryId;
	private int memberNo;
	private String parentCategoryName;
	private int boardCode;
	private String topChildCategory;
	private String requestConfirm;
}
