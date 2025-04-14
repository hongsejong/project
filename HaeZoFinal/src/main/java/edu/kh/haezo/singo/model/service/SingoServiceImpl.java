package edu.kh.haezo.singo.model.service;

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
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.dto.UserBan;
import edu.kh.haezo.singo.model.dao.SingoDAO;
import edu.kh.haezo.singo.model.dto.Singo;

@Service
public class SingoServiceImpl implements SingoService{
	
	@Autowired
	private SingoDAO dao;
	
	

	//글 작성자 memberNo 찾기
	@Override
	public int getWriteMemberNo(int boardNo) {
		return dao.getWriteMemberNo(boardNo);
	}



	//신고하기
	@Override
	public int insertReport(Map<String, Object> paramMap) {
		return dao.insertReport(paramMap);
	}



	@Override
	@Transactional(rollbackFor = Exception.class)
	public int singoFile(MultipartFile file, int boardNo, String webPath, String filePath) {
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
		files.setFileOrder(1);
		
		
		return dao.singoFile(files);
	}



	
	//글 작성자 찾기
	@Override
	public Member findMember(int boardNo) {
		return dao.findMember(boardNo);
	}



	//신고 목록조회
	@Override
	public Map<String, Object> selectSingoListAll(int cp, int listCount) {
		int totalCount = dao.getSingoCount();

        PaginationInquiry pagination = new PaginationInquiry(cp, totalCount, listCount);

        List<Board> boardList = dao.singoBoardList(pagination);

        Map<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("pagination", pagination);
		return map;
	}


	
	//신고번호로 보드넘버 찾기
	@Override
	public int getboardNo(int reportNo) {
		return dao.getboardNo(reportNo);
	}


	//신고 상세조회
	@Override
	public Singo selectBoard(Map<String, Object> map) {
		return dao.selectBoard(map);
	}


	//신고글의 파일조회
	@Override
	public List<Object> selectFiles(int boardNo) {
		
		return dao.selectFiles(boardNo);
	}



	@Override
	public void ignoreReport(int reportNo) {
		dao.ignoreReport(reportNo);
		
	}



	@Override
	public void deleteReport(int reportNo) {
		dao.deleteReport(reportNo);
		
	   int boardNo = dao.findBoardNoByReportNo(reportNo);
        dao.updateBoardDelFl(boardNo);
        
        int memberNo = dao.findMemberNoByBoardNo(boardNo);
        dao.userReportCount(memberNo);
        
        UserBan userBan = dao.selectBan(memberNo);
       
        if(userBan==null) {
        	dao.insertUserBan(memberNo);
        }else {
        	dao.banCountUp(memberNo);
        }
        
	}


	//yn체크 게시물 조회
	@Override
	public Map<String, Object> boardStatusCheck(Map<String, Object> tmap) {
		int totalCount = dao.boardStatusCheck();
		
		int cp = (int) tmap.get("cp");
		int listCount  = (int) tmap.get("listCount");

        PaginationInquiry pagination = new PaginationInquiry(cp, totalCount, listCount);

        List<Board> boardList = dao.singoBoardCheck(pagination);

        Map<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("pagination", pagination);

        return map;
	}



	@Override
	public List<String> selectSingoFileList() {
		return dao.selectSingoFileList();
	}



	//리포트 3이상인애들 조회
	@Override
	public List<UserBan> selectReportCount() {
		return dao.selectReportCount();
	}



	@Override
	public int userBan(UserBan ub) {
		return dao.userBan(ub);
	}



	@Override
	public void memberBan(UserBan ub) {
		dao.memberBan(ub);
		
	}



	@Override
	public void memberOut(UserBan ub) {
		dao.memberOut(ub);
		
	}



	@Override
	public void reportReset(UserBan ub) {
		dao.reportReset(ub);
	}



	@Override
	public void memberRevive() {
		dao.memberRevive();
		
	}













}
