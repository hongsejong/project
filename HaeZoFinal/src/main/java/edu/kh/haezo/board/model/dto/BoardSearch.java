package edu.kh.haezo.board.model.dto;

import lombok.ToString;

import lombok.Setter;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;

@Getter
@Setter
@ToString
public class BoardSearch {
	
    private int hiddenCategoryId;
    private String hiddenRegionSido;
    private String hiddenRegionSigungu;
    private String hiddenSearchCategory;
    private int hiddenMinPrice;
    private int hiddenMaxPrice;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String requestDueDate; 
    private String query;
}
