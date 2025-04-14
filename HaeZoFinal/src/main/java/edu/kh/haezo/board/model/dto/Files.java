package edu.kh.haezo.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Files {
	private int fileNo;
	private String filePath;
	private String fileRename;
	private String fileOriginal;
	private int fileOrder;
	private int boardNo;
}
