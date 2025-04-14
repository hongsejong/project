package edu.kh.haezo.board.controller;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.haezo.board.model.dto.Board;
import edu.kh.haezo.board.model.service.BoardService;
import edu.kh.haezo.member.model.dto.Member;

@Controller
@RequestMapping("/board")
@SessionAttributes("loginMember")
public class BoardController {
	
	@Autowired
	private BoardService service;
	
	// 게시글 목록 전체 조회
	@GetMapping("/{boardCode}")
	public String boardListAll(
			@PathVariable("boardCode") int boardCode,
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			Model model,
			@RequestParam Map<String, Object> paramMap 
			) {
		String path = "";
		
		
		if(boardCode == 4) {
			Map<String, Object> thread = service.selectThredList(boardCode);
			model.addAttribute("thread", thread);
			path += "board/threadBoard";
		} else {
			System.out.println("key"+paramMap.get("key"));
			if(paramMap.get("key") == null) {
				
				Map<String, Object> map = service.selectBoardListAll(boardCode, cp);
				model.addAttribute("map", map);
				path += "board/board";
			} else {
				paramMap.put("boardCode", boardCode);	
				Map<String, Object> map = service.selectBoardListAll(paramMap, cp);
				
				model.addAttribute("map", map);
				path += "board/board";
			}
		}
		
		return path;
	}
	
	// 게시글 상세 조회
	@GetMapping("/{boardCode:[0-9]+}/{boardNo:[0-9]+}")
	public String boardDetail(
			@PathVariable("boardCode") int boardCode,
			@PathVariable("boardNo") int boardNo,
			Model model,
			RedirectAttributes ra,
			@SessionAttribute(value="loginMember", required=false) Member loginMember,
			HttpServletRequest req,
			HttpServletResponse resp
			) throws ParseException{
		Board board = new Board();
		board.setBoardCode(boardCode);
		board.setBoardNo(boardNo);
		
		board = service.selectBoardDetail(board);
		
		String path = "";
		if(board != null) {
			if(loginMember != null) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberNo", loginMember.getMemberNo());
				map.put("boardCode", boardCode);
				map.put("boardNo", boardNo);
				
				int result = service.boardLikeCheck(map);
				if(result > 0) model.addAttribute("likeCheck", "yes");
			}
			
			if(loginMember == null || loginMember.getMemberNo() != board.getMemberNo()) {
				
				Cookie c = null;
				
				Cookie[] cookies = req.getCookies();
				
				if(cookies != null) { // 쿠키가 존재하는 경우
					for(Cookie cookie : cookies) {
						if(cookie.getName().equals("readBoardNo")) {
							c = cookie;
							break;
						}
					}
				}
				int result = 0;
				if(c == null) {
					// 쿠키가 없다면 새로 생성
					c = new Cookie("readBoardNo", "|"+boardNo+"|");
					
					// 조회수 증가 서비스 호출
					result = service.updateReadCount(boardNo);
				} else {
					//
					if(c.getValue().indexOf("|"+boardNo+"|") == -1) { 
						// 쿠키에 현재 게시글 번호가 없다면
						// 기존 값에 게시글 번호 추가해서 다시 세팅
						c.setValue(c.getValue()+"|"+boardNo+"|");
						result = service.updateReadCount(boardNo);
					}
				}// 종료
				// 조회수 증가 성공시 쿠키 경로 및 수명 지정
				if(result > 0) {
					board.setReadCount(board.getReadCount() + 1);
					c.setPath("/");
					Calendar cal = Calendar.getInstance();
					cal.add(Calendar.DATE, 1);
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date current = new Date();
					Date temp = new Date(cal.getTimeInMillis());
					Date tmr = sdf.parse(sdf.format(temp));
					long diff = (tmr.getTime() - current.getTime()) / 1000;
					c.setMaxAge((int)diff);
					resp.addCookie(c);
				}
			}
			
			model.addAttribute("board", board);
			path = "board/boardDetail";
			
		} else {
			ra.addFlashAttribute("message", "해당 게시글이 존재하지 않습니다.");
			path = "redirect:/board/"+boardCode;
		}
		return path;
	}
	
	// 게시글 작성
	@GetMapping("/{boardCode:[0-9]+}/insert")
	public String boardWrite(
			@PathVariable("boardCode") int boardCode) {
		return "board/boardWrite";
	}
	
	// 게시글 이미지 임시 저장
	@PostMapping("/uploadImage")
	@ResponseBody
	public Map<String, Object> uploadImage(
				@RequestParam("image") MultipartFile image,
				HttpServletRequest request,
				HttpSession session
			) throws IllegalStateException, IOException {
        String originalFileName = image.getOriginalFilename();
        String ext = originalFileName.substring(originalFileName.lastIndexOf('.'));

        // 서버에 저장될 새로운 파일명 생성(UUID 방식)
        String savedFileName = UUID.randomUUID().toString() + ext;

        // 기존에 사용하던 실제 저장 경로 사용
        String webPath = "/resources/images/thumbnails/";
        String filePath = session.getServletContext().getRealPath(webPath);

        // 서버에 파일 저장
        File targetFile = new File(filePath, savedFileName);
        image.transferTo(targetFile);

        // JSON 형태로 반환할 실제 이미지 접근 URL
        String imageUrl = request.getContextPath() + webPath + savedFileName;

        // 반환 결과 생성
        Map<String, Object> map = new HashMap<>();
        map.put("url", imageUrl);
        map.put("originalFileName", originalFileName);

        return map;
    }
	
	// 게시글 등록
	@PostMapping("/{boardCode:[0-9]+}/insertContent")
	@ResponseBody
	public int boardInsert(
			@PathVariable("boardCode") int boardCode,
			@RequestParam("boardTitle") String boardTitle,
			@RequestParam("boardContent") String boardContent,
			@SessionAttribute("loginMember") Member loginMember,
			HttpSession session
			) {
		Board board = new Board();
		board.setMemberNo(loginMember.getMemberNo());
		board.setBoardCode(boardCode);
		board.setBoardTitle(boardTitle);
		board.setBoardContent(boardContent);
		
		int boardNo = service.boardInsert(board);
		
		if(boardNo > 0) {
			service.saveBoardImages(boardNo, board.getBoardContent(), session);
		}
		return boardNo;
	}
	
	// 좋아요 처리
	@PostMapping("/like")
	@ResponseBody
	public int like(@RequestBody Map<String, Integer> paramMap) {
		return service.like(paramMap);
	}
	
	// 게시글 삭제
	@GetMapping("/{boardCode:[0-9]+}/{boardNo}/delete")
	public String deleteBoard(
			@PathVariable("boardCode") int boardCode,
			@PathVariable("boardNo") int boardNo,
			RedirectAttributes ra,
			@RequestHeader("referer") String referer
			) {
		
		int result = service.deleteBoard(boardNo);
		String message = "";
		String path = "redirect:";
		if(result > 0) {
			message = "게시글이 삭제 되었습니다.";
			path += "/board/"+boardCode;
		} else {
			message = "게시글이 삭제 실패";
			path += referer;
		}
		ra.addFlashAttribute("message", message);
		return path;
	}
	
	// 게시글 수정 화면 전환
	@GetMapping("/{boardCode:[0-9]+}/{boardNo:[0-9]+}/update")
	public String updateBoardView(
					@PathVariable("boardCode") int boardCode,
					@PathVariable("boardNo") int boardNo,
					Model model
					) {
		Board board = new Board();
		board.setBoardCode(boardCode);
		board.setBoardNo(boardNo);
		
		board = service.selectBoardDetail(board);
		
		model.addAttribute("board", board);
		
		return "board/boardUpdate";
	}
	
	// 게시글 수정
	@PostMapping("/{boardCode:[0-9]+}/{boardNo:[0-9]+}/updateContent")
	@ResponseBody
	public int updateBoardContent(
	        @PathVariable("boardCode") int boardCode,
	        @PathVariable("boardNo") int boardNo,
	        @RequestParam("boardTitle") String boardTitle,
	        @RequestParam("boardContentHtml") String boardContent,
	        @SessionAttribute("loginMember") Member loginMember,
	        HttpSession session
	        ) {

		int result = 0;
	    try {
	    	Board board = new Board();
	    	board.setBoardCode(boardCode);
	    	board.setBoardNo(boardNo);
	    	board.setBoardTitle(boardTitle);
	        board.setBoardContent(boardContent);
	        board.setMemberNo(loginMember.getMemberNo());
	        
	        // 게시글 제목,내용 수정
	        result = service.updateBoard(board);

	        if(result > 0) {
	            service.deleteFilesByBoardNo(boardNo, boardContent, session);
	            service.saveBoardImages(boardNo, boardContent, session);

	            result = boardNo;
	        } else {
	            result = -1;
	        }
	    } catch(Exception e) {
	        e.printStackTrace();
	        result = -1;
	    }
	    return result;
	}
	
	// 헤더 검색
    @GetMapping(value="/headerSearch", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public List<Map<String, Object>> headerSearch(String query){
       return service.headerSearch(query);
    }
	
	
	
}
