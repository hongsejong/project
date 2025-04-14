package edu.kh.haezo.board.model.dto;


	
	import lombok.Getter;
	import lombok.Setter;
	import lombok.ToString;

	@Getter
	@Setter
	@ToString
	public class Review2 {
	    // Board 테이블 (의뢰 게시글) 관련
	    private int boardNo;           // 게시글 번호
	    private String boardTitle;     // 의뢰 제목
	    private String boardContent;   // 의뢰 내용
	    private String boardCreateDate; // 의뢰 날짜 (게시글 작성일)
	    
	    // Request 테이블 관련
	    private int requestPrice;      // 의뢰 비용

	    // Review 테이블 관련
	    private String reviewContent;  // 리뷰 내용
	    private double reviewRating;   // 별점
	    // 리뷰 테이블에 날짜 컬럼이 없다면, board의 작성일을 대신 사용하거나 새로 추가
	    private String reviewDate;   

	    // 조력자 정보 (Review 테이블에 저장되어 있음)
	    private String supporterProfile; // 조력자 프로필 사진
	    private String supporterNick;    // 조력자 닉네임

	    // Category 테이블 (의뢰자 제공 서비스) 관련
	    private String categoryName;   // 요청서의 카테고리명, 예를 들어 '취업/직무/입시' 등
	
	    
	    // 클라이언트(의뢰인) 정보 – 기존 조력자 정보 대신 사용
	    private String clientProfile;
	    private String clientNick;
	    
	    private int helperId;
	    private String helperNick;
	
	}
