package edu.kh.haezo.singo.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Singo {
	private int reportNo;
	private int memberNo;
	private int boardNo;
	private String reportContent;
	private String reportTitle;
	private int reportType;
	private String reportResult;
	private int boardCode;
	
//	닉네임필드
	private String reporterNickname;
	private String reportedNickname;

}
