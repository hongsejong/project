package edu.kh.haezo.board.model.dto;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RequestBoard {
	
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardCreateDate;
	private String boardUpdateDate;
	private String boardStatus;
	private int boardCode;
	
	
	// 회원
	private int memberNo;
	private String memberNickname;
	private String profileImage;
	private String thumbnail;
	
	// 요청게시판
	private String requestStartDate;
    private int requestPrice;
    private String requestDueDate;
    private Date requestDueDateSql;
    private String hiddenRegionSido;
    private String hiddenRegionSigungu;
    private String requestStatus;
    private String requestLocation;
    private int hiddenCategoryId;
    private String categoryName;
    private int parentCategoryId;
    private String parentCategoryName;
    private double reviewRating;
    private String hiddenThumbnailUrl;
    
//    private List<Files> fileList; 
    
    
    
	
	
}
