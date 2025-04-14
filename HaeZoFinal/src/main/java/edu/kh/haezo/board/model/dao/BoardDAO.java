package edu.kh.haezo.board.model.dao;

import java.io.File;
import java.nio.file.spi.FileSystemProvider;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.RowBounds;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.dto.Files;
import edu.kh.haezo.board.model.dto.Pagination;

@Repository
public class BoardDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	/** 삭제되지 않은 게시글 수 조회
	 * @param boardCode
	 * @return listCount
	 */
	public int getListCount(int boardCode) {
		return sqlSession.selectOne("boardMapper.getListCount",boardCode);
	}

	/** 현재 페이지에 대한 게시글 목록 조회
	 * @param boardCode
	 * @param pagination
	 * @return boardList
	 */
	public List<Board> selectBoardList(int boardCode, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectBoardList", boardCode, rowBounds);
	}

	/** 게시판 타입 목록
	 * @return
	 */
	public List<Map<String, Object>> selectBoardTypeList() {
		return sqlSession.selectList("boardMapper.selectBoardTypeList");
	}
	
	/** 게시글 상세 조회
	 * @param board
	 * @return boardDetail
	 */
	public Board selectBoardDetail(Board board) {
		return sqlSession.selectOne("boardMapper.selectBoardDetail",board);
	}

	/** 쓰레드 게시글 조회
	 * @param boardCode
	 * @return
	 */
	public List<Board> selectThredList(int boardCode) {
		return sqlSession.selectList("boardMapper.selectThredList", boardCode);
	}

	/** 좋아요 여부 확인
	 * @param map
	 * @return result
	 */
	public int boardLikeCheck(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.boardLikeCheck",map);
	}

	/** 좋아요 상태 X -> 등록
	 * @param paramMap
	 * @return result
	 */
	public int insertBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.insert("boardMapper.insertBoardLike",paramMap);
	}

	/** 좋아요 상태 O -> 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.delete("boardMapper.deleteBoardLike",paramMap);
	}

	/** 좋아요 수 조회
	 * @param paramMap
	 * @return result
	 */
	public int boardLikeCount(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("boardMapper.boardLikeCount",paramMap);
	}

	/** 게시글 제목, 컨텐츠 등록
	 * @param board
	 * @return boardNo
	 */
	public int boardInsert(Board board) {
		
		int result = sqlSession.insert("boardMapper.boardInsert",board); 
		
		if(result > 0) result = board.getBoardNo();
		
		return  result;
	}
	
	/** 게시글 삭제
	 * @param boardNo
	 * @return result
	 */
	public int deleteBoard(int boardNo) {
		return sqlSession.update("boardMapper.deleteBoard",boardNo);
	}

	/** 게시글 이미지 등록
	 * @param boardNo
	 * @param boardContent
	 * @param session
	 */
	public void saveBoardImages(int boardNo, String boardContent, HttpSession session) {
	    Document doc = Jsoup.parse(boardContent);
	    Elements images = doc.select("img");
	    
	    // DB에 저장된 기존 파일명 목록 조회
	    List<String> existingFileNames = sqlSession.selectList("boardMapper.selectFileRenamesByBoardNo", boardNo);
	    Set<String> existingSet = new HashSet<>(existingFileNames);
	    
	    // 기존 최대 FILE_ORDER 값 조회
	    Integer maxOrderObj = sqlSession.selectOne("boardMapper.selectMaxFileOrderByBoardNo", boardNo);
	    int order = (maxOrderObj != null ? maxOrderObj : -1);


	    // 에디터에서 추출한 이미지 리스트 중 중복되지 않은 것만 insert
	    for (Element img : images) {
	        String originalFileName = img.attr("alt");
	        String srcUrl = img.attr("src");
	        String serverSavedName = srcUrl.substring(srcUrl.lastIndexOf("/") + 1);

	        if (existingSet.contains(serverSavedName)) continue; // 중복 방지

	        Files file = new Files();
	        file.setFileOriginal(originalFileName);
	        file.setFileRename(serverSavedName);
	        file.setFilePath("/resources/images/thumbnails/");
	        file.setFileOrder(order++);
	        file.setBoardNo(boardNo);

	        sqlSession.insert("boardMapper.saveBoardImages", file);
	    }
	}

	/** 게시글 수정(제목,본문내용)
	 * @param board
	 * @return result
	 */
	public int updateBoard(Board board) {
		return sqlSession.update("boardMapper.updateBoard", board);
	}

	/** 게시글 수정(등록된 이미지 전체 삭제)
	 * @param boardNo
	 */
	public void deleteFilesByBoardNo(int boardNo, String boardContent, HttpSession session) {
	    // 기존 이미지 목록 조회 (게시글에 첨부된 모든 파일들)
	    List<Files> existingImages = sqlSession.selectList("boardMapper.selectFilesByBoardNo", boardNo);
	    System.out.println("기존 이미지 목록 조회"+existingImages);
	    
	    // 수정된 본문 이미지 목록 추출 (게시글 내용에서 사용된 이미지)
	    Document doc = Jsoup.parse(boardContent);
	    Elements images = doc.select("img");

	    // 수정된 본문에 존재하는 이미지 목록 (Set 사용)
	    Set<String> newImageSet = new HashSet<>();
	    for (Element img : images) {
	        String srcUrl = img.attr("src");
	        String serverSavedName = srcUrl.substring(srcUrl.lastIndexOf("/") + 1); // 저장된 파일 이름만 추출
	        newImageSet.add(serverSavedName);
	    }

	    // 파일 경로를 세션에서 얻어서 사용
	    String filePath = session.getServletContext().getRealPath("/resources/images/thumbnails/");

	    // 기존 이미지 목록과 수정된 이미지 목록을 비교하여, 수정된 내용에서 없는 이미지만 삭제
	    for (Files file : existingImages) {
	        // 수정된 내용에서 해당 이미지가 없으면 삭제
	        if (!newImageSet.contains(file.getFileRename())) {
	            // 파일 시스템에서 삭제
	            File targetFile = new File(filePath, file.getFileRename());
	            if (targetFile.exists()) {
	                targetFile.delete(); // 실제 파일 삭제
	            }

	            // DB에서 해당 파일 정보 삭제
	            System.out.println("파일 번호"+file.getFileNo());
	            sqlSession.delete("boardMapper.deleteFileByNo", file.getFileNo());
	        }
	    }
	}

	/** 조회수 증가
	 * @param boardNo
	 * @return result
	 */
	public int updateReadCount(int boardNo) {
		return sqlSession.update("boardMapper.updateReadCount", boardNo);
	}


	/** 게시글 수 조회(검색)
	 * @param paramMap
	 * @return listCount
	 */
	public int getListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("boardMapper.getSearchListCount", paramMap);
	}
	
	/** 게시글 목록 조회(검색)
	 * @param paramMap
	 * @param pagination
	 * @return boardList
	 */
	public List<Board> selectBoardListAll(Map<String, Object> paramMap, Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		List<Board> board = sqlSession.selectList("boardMapper.searchBoardList", paramMap, rowBounds);
		return board;
	}

	/**
	 * 헤더 검색
	 * @param query
	 * @return list
	 */
	public List<Map<String, Object>> headerSearch(String query) {
		return sqlSession.selectList("boardMapper.headerSearch", query);
	}

	/** DB에 없는 게시판 이미지 파일을 서버에서 주기적으로 삭제
	 * @return
	 */
	public List<String> selectBoardImageFileList() {
		return sqlSession.selectList("boardMapper.selectBoardImageFileList");
	}
	
}
