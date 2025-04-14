package edu.kh.haezo.board.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board {
	
	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardCreateDate;
	private String boardUpdateDate;
	private int readCount;
	private int boardCode;
	private int parentBoardNo;
	
	
	// 서브쿼리
	private int commentCount;
	private int likeCount;
	
	// 회원
	private int memberNo;
	private String memberNickname;
	private String profileImage;
	
	private String thumbnail;
	
	// 요청게시판
    private String requestCondition;
    private String requestStartDate;
    private String requestDueDate;
    private int requestPrice;
    private String requestStatus;
    private String requestLocation;
    private String requestEtc;
    private int categoryId;
    
    private List<Files> fileList; 
    // 답변여부
    private String boardStatus;
//    private List<Comment> commentList; 

	
    private String categoryName;
    private String parentCategoryName;
    private int totalBoardCount;
    
    private double reviewRating;
    private int parentCategoryId;
}
