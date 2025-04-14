package edu.kh.haezo.inquiry.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Files;
import edu.kh.haezo.common.utility.Util;
import edu.kh.haezo.inquiry.model.dto.PaginationInquiry;
import edu.kh.haezo.inquiry.model.dao.InquiryDAO;

@Service
public class InquiryServiceImpl implements InquiryService{
	
	@Autowired
	private InquiryDAO dao;

	/**
	 *문의 게시글 조회
	 */
	/*
	@Override
	public Map<String, Object> selectInquiryListAll(int cp) {
		
		int listCount = dao.getListCount();
		
		Pagination pagination = new Pagination(cp, listCount);
		
		List<Board> boardList = dao.inquiryBoardList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pagination", pagination);
		
		return map;
	}
	*/
	
	
	//문의 게시글 조회
	@Override
	public Map<String, Object> selectInquiryListAll(int cp, int listCount) {
		int totalCount = dao.getListCount();

        PaginationInquiry pagination = new PaginationInquiry(cp, totalCount, listCount);

        List<Board> boardList = dao.inquiryBoardList(pagination);

        Map<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("pagination", pagination);

        return map;
	}


	//yn체크 게시물 조회
	@Override
	public Map<String, Object> boardStatusCheck(Map<String, Object> tmap) {
		int totalCount = dao.boardStatusCheck();
		
		int cp = (int) tmap.get("cp");
		int listCount  = (int) tmap.get("listCount");

        PaginationInquiry pagination = new PaginationInquiry(cp, totalCount, listCount);

        List<Board> boardList = dao.inquiryBoardCheck(pagination);

        Map<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("pagination", pagination);

        return map;
	}


	@Override
	public Board selectBoard(Map<String, Object> map) {
		return dao.selectBoard(map);
	}

	
	//회원 문의조회
	@Override
	public Map<String, Object> selectInquiryListAll(int cp, int listCount, int memberNo) {
		int totalCount = dao.getListCount(memberNo);
		System.out.println("totalCount: " + totalCount);

        PaginationInquiry pagination = new PaginationInquiry(cp, totalCount, listCount);

        Map<String, Object> params = new HashMap<>();
        params.put("pagination", pagination);
        params.put("memberNo", memberNo);
        List<Board> boardList = dao.inquiryBoardList(params);
        

        Map<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("pagination", pagination);

        return map;
	}


	//문의 등록
	@Override
	public int insertInquiry(Board board) {
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));
		return dao.insertInquiry(board);
	}


	//파일 등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int insertFile(MultipartFile file, int boardNo, String webPath, String filePath) {
		
		String fileOriginal=file.getOriginalFilename();
		String fileRename = Util.fileRename(fileOriginal);
		
		System.out.println("서비스에서 file =" + file);
		System.out.println("투스트링"+file.toString());
		System.out.println("오리지날"+fileOriginal);
		
		File adad = new File(filePath,fileRename);
		try {
			file.transferTo(adad);
		} catch (IOException e) {
			e.printStackTrace();
			return 0;
		} 
		
		Files files = new Files();
		files.setBoardNo(boardNo);
		files.setFileOriginal(fileOriginal);
		files.setFileRename(fileRename);
		files.setFilePath(webPath+fileRename);
		files.setFileOrder(0);
		
		
		return dao.insertFile(files);
	}



	// 파일 조회
	@Override
	public List<Object> selectFiles(int boardNo) {
		return dao.selectFiles(boardNo);
	}


	//글 삭제
	@Override
	public int inquiryDelete(int boardNo) {
		return dao.inquiryDelete(boardNo);
	}


	@Override
	public int insertComment(Map<String, Object> map) {
		return dao.insertComment(map);
	}


	@Override
	public String selectComment(int boardNo) {
		return dao.selectComment( boardNo);
	}

	//문의 yn바꾸기
	@Override
	public void anwerChange(int boardNo) {
		dao.anwerChange(boardNo);
		
	}


	//파일 목록 조회
	@Override
	public List<String> selectFileList() {
		return dao.selectFileList();
	}





	


	
	

	


}
