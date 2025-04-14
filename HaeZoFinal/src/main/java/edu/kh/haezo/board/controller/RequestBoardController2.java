package edu.kh.haezo.board.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

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
import edu.kh.haezo.board.model.dto.RequestBoard;
import edu.kh.haezo.board.model.dto.RequestSupporter;
import edu.kh.haezo.board.model.service.RequestBoardService;
import edu.kh.haezo.member.model.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/requestBoard2")
@SessionAttributes({"loginMember","map","requestBoard"})
@RequiredArgsConstructor
public class RequestBoardController2 {

	@Autowired
	private RequestBoardService service;


	// 게시글 작성 화면 전환
	@GetMapping("/{categoryId:[0-9]+}/insert")
	public String boardInsert(@PathVariable("categoryId") int categoryId, Model model) {
		//		@pathVariable : 주소 값 가져오기 + request scope에 세팅
		//		
		model.addAttribute("categoryId", categoryId);
		return "board/requestBoardWriter";
	}

	// 요청글 작성
	@PostMapping("/{categoryId:[0-9]+}/insert")
	public String insertRequestBoard(RequestBoard requestBoard,
															RedirectAttributes ra, @PathVariable("categoryId") int categoryId, 
															@SessionAttribute("loginMember") Member loginMember) {


		requestBoard.setRequestLocation(requestBoard.getHiddenRegionSido() + " " + requestBoard.getHiddenRegionSigungu());
		requestBoard.setMemberNo(loginMember.getMemberNo());
		Date sqlDate = Date.valueOf(requestBoard.getRequestDueDate());  // java.sql.Date로 변환
		requestBoard.setRequestDueDateSql(sqlDate);


		//		System.out.println("Received Content: " + content);

		int boardNo = service.insertRequestBoard(requestBoard);

		String path = "redirect:/requestBoard";

		if (boardNo > 0) {
			ra.addFlashAttribute("message" , "요청글 삽입에 성공했습니다.");
			path+="/"+requestBoard.getHiddenCategoryId()+"/"+boardNo;
		} else {
			ra.addFlashAttribute("message" , "요청글 삽입 실패");
			path+="/"+categoryId+"?cp=1";
		}

		return path;
	}


	//	이미지 임시 업로드
	@PostMapping("/uploadImage")
	@ResponseBody
	public Map<String, Object> uploadImage(@RequestParam("image") MultipartFile uploadFile,
			HttpServletRequest request) throws IllegalStateException, IOException {

		// 저장 경로 설정
		String uploadDir = request.getServletContext().getRealPath("/resources/images/requestBoardUpload");
		File dir = new File(uploadDir);
		if (!dir.exists()) dir.mkdirs();

		// 파일명 생성 (UUID + 확장자)
		String originalName = uploadFile.getOriginalFilename();
		String ext = originalName.substring(originalName.lastIndexOf("."));
		String newFileName = UUID.randomUUID().toString() + ext;

		// 저장 경로 + 저장
		File saveFile = new File(uploadDir, newFileName);
		uploadFile.transferTo(saveFile);

		// 클라이언트에 보낼 경로 (이미지 URL)
		String imageUrl = request.getContextPath() + "/resources/images/requestBoardUpload/" + newFileName;
		// JSON으로 반환
		Map<String, Object> result = new HashMap<>();
		result.put("imageUrl", imageUrl); // JS에서 callback(data.imageUrl)로 받음
		return result;
	}

	//	요청글 수정 화면으로 전환
	//	게시글 수정 화면 전환
	@GetMapping("/{categoryId:[0-9]+}/{boardNo}/update")
	public String updateBoard(@PathVariable("categoryId") int categoryId, @PathVariable("boardNo") int boardNo, Model model) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("categoryId", categoryId);
		map.put("boardNo", boardNo);

		//		게시글 상세 조회 서비스 호출
		RequestBoard requestBoard = service.requestBoardDetail(map);

		model.addAttribute("requestBoard", requestBoard);

		return "board/requestBoardUpdate";
	}


	//	요청글 수정
	@PostMapping("/{categoryId:[0-9]+}/{boardNo}/update")
	public String updateRequestBoard(@PathVariable("categoryId") int categoryId, @PathVariable("boardNo") int boardNo,
			RequestBoard requestBoard,
			RedirectAttributes ra) {

		requestBoard.setRequestLocation(requestBoard.getHiddenRegionSido() + " " + requestBoard.getHiddenRegionSigungu());
		Date sqlDate = Date.valueOf(requestBoard.getRequestDueDate());  // java.sql.Date로 변환
		requestBoard.setRequestDueDateSql(sqlDate);
		int result = service.updateRequestBoard(requestBoard);
		if (result > 0) {
			ra.addFlashAttribute("message",  "요청글 수정에 성공했습니다.");
			return "redirect:/requestBoard/"+requestBoard.getHiddenCategoryId()+"/"+boardNo;
		} else {
			ra.addFlashAttribute("message",  "요청글 수정 실패");
			return "redirect:/requestBoard/"+categoryId+"/"+boardNo;
		}

	}


	//	요청글 삭제
	@GetMapping("/{categoryId:[0-9]+}/{boardNo}/delete")
	public String deleteRequestBoard(@PathVariable("categoryId") int categoryId, @PathVariable("boardNo") int boardNo, 
			@RequestParam(value="cp", required=false, defaultValue ="1") String cp,
			RedirectAttributes ra, @RequestHeader("referer") String referer // 이전 요청 주소
			) {
		int result = service.deleteRequestBoard(boardNo);
		if (result > 0) {

			ra.addFlashAttribute("message",  "요청글 삭제에 성공했습니다.");
			return "redirect:/requestBoard/"+categoryId+"?cp="+cp;
		} else {
			ra.addFlashAttribute("message",  "요청글 삭제 실패");
			return referer;
		}
	}


}
