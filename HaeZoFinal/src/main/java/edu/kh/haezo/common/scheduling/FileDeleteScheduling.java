package edu.kh.haezo.common.scheduling;

import java.io.File;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import edu.kh.haezo.board.model.service.BoardService;
import edu.kh.haezo.inquiry.model.service.InquiryService;
import edu.kh.haezo.member.model.dto.Member;
import edu.kh.haezo.member.model.dto.UserBan;
import edu.kh.haezo.singo.model.dto.Singo;
import edu.kh.haezo.singo.model.service.SingoService;

//문의게시판 파일 자동삭제 매일 오후 3시 실행
@Component
public class FileDeleteScheduling{

	@Autowired
	private ServletContext servletContext;

	@Autowired
	private InquiryService service;
	@Autowired
	private SingoService service2;
	
	@Autowired
	private BoardService boardService;
	
	@Scheduled(cron="0 0 15 * * *")
	public void inquiryDelet() {
		System.out.println("---게시판 DB,서버 불일치 파일 제거---");
		String filePath= servletContext.getRealPath("/resources/files/inquiry");

		File path = new File(filePath);
		File[] fileArr = path.listFiles();

		List<File> serverFileList = Arrays.asList(fileArr);

		List<String> dbFileList = service.selectFileList();

		if(!serverFileList.isEmpty()) {
			for(File server : serverFileList) {


				if(dbFileList.indexOf(server.getName())==-1) {
					// db파일 목록			//서버 파일 이름
					System.out.println(server.getName() + " 삭제 ");
					server.delete();// File.deltet() : 파일 삭제
				}
			} //for문 종료

			System.out.println("---- 문의게시판 파일 삭제 스케쥴러 종료 ---");
		}
	}
	
	
	
	//신고게시판 일치하지않는 파일 삭제 오후 4시마다 실행
	@Scheduled(cron="0 0 16 * * *")
	public void singoDelete() {
		System.out.println("---게시판 DB,서버 불일치 파일 제거---");
		String filePath= servletContext.getRealPath("/resources/files/singo");

		File path = new File(filePath);
		File[] fileArr = path.listFiles();

		List<File> serverFileList = Arrays.asList(fileArr);

		List<String> dbFileList = service2.selectSingoFileList();

		if(!serverFileList.isEmpty()) {
			for(File server : serverFileList) {


				if(dbFileList.indexOf(server.getName())==-1) {
					// db파일 목록			//서버 파일 이름
					System.out.println(server.getName() + " 삭제 ");
					server.delete();// File.deltet() : 파일 삭제
				}
			} //for문 종료

			System.out.println("---- 신고게시판 파일 삭제 스케쥴러 종료 ---");
		}
	}
	
	@Scheduled(cron="0 0 17 * * *")
	public void autoBan() {
		System.out.println("유저 자동 정지 시작");
		int result=0;
		//USER_BAN 테이블에서 REPORT_COUNT가 3이상인 애들 조회
		List<UserBan> userBanList = service2.selectReportCount();
		
		
		System.out.println(userBanList );
		
		for(UserBan ub : userBanList) {
			ub.setBanCount(ub.getBanCount());
			ub.setMemberNo(ub.getMemberNo());
			// banCount==0인애 > 처음 정지당하는애
			if(ub.getBanCount()==0) {
				//0이면 3일정지
				result=service2.userBan(ub);
				if(result!=0) { //성공했으면
					service2.memberBan(ub); // 멤버 밴 여부 y 변경함
				}

			}else {// 애낸 처음 아님 두번째 정지당하는애들
				//0아니면 report_count 0으로 변경 후 member_del_fl( y로 바꿀거)
				service2.reportReset(ub);
				service2.memberOut(ub);
			}
		}
			
		
		
	}
	
	@Scheduled(cron="0 0 0 * * *")
	public void memberRevive() {
		System.out.println("정지 해제 진행");
		service2.memberRevive();
		
	}
	
	
	
	// DB에 없는 게시판 이미지 파일을 서버에서 주기적으로 삭제
	@Scheduled(cron = "0 0 2 * * *") // 매일 새벽 2시
	public void deleteUnusedBoardImages() {
	    System.out.println("게시판 이미지 정리 스케줄러 시작");

	    String filePath = servletContext.getRealPath("/resources/images/thumbnails");
	    File folder = new File(filePath);
	    File[] fileArr = folder.listFiles();

	    if (fileArr == null || fileArr.length == 0) {
	        System.out.println("이미지 폴더가 비어있거나 없음");
	        return;
	    }

	    List<File> serverFileList = Arrays.asList(fileArr);
	    List<String> dbFileList = boardService.selectBoardImageFileList();

	    for (File serverFile : serverFileList) {
	        if (!dbFileList.contains(serverFile.getName())) {
	            System.out.println("삭제 대상: " + serverFile.getName());
	            serverFile.delete();
	        }
	    }

	    System.out.println("게시판 이미지 정리 완료");
	}





	
	
	
}


//package edu.kh.haezo.common.scheduling;
//
//import java.io.File;
//import java.util.Arrays;
//import java.util.List;
//
//import javax.servlet.ServletContext;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import edu.kh.project.board.model.dto.BoardImage;
//import edu.kh.project.board.model.service.BoardService;
//
////스프링이 일정 시간마다 해당 객체를 이용해서 코드를 수행
////== 스프링이 해당 클래스를 객체로 만들어서 관리해야 함
////==> Bean 등록!
//
//@Component // @Controller, @Service, @Repository의 부모 어노테이션
//						// Bean 등록을 하겠다고 명시하는 어노테이션
//public class ImageDeleteScheduling {
//	
//	@Autowired
//	private ServletContext servletContext;
//	
//	@Autowired
//	private BoardService service;
//	
//
////	@Scheduled(fixedDelay = 10000) // ms 단위
//////	일(5초) → 10초 대기 → 일(5초) → 10초 대기
//	
////	@Scheduled(fixedRate = 10000)
////	일(5초)
////	대기(10초)
//	
////	cron="초 분 시 일 월 요일 [년도]"
////	@Scheduled(cron="0,15,30,45 * * * * *") // 매 분 0, 15, 30, 45초마다
////	@Scheduled(cron="0,30 * * * * *") // 매 분 0, 30초마다
//	@Scheduled(cron="0 0 * * * *") // 매 정시마다
////	@Scheduled(cron="0 0 0 * * *") // 매일 0시마다
////	@Scheduled(cron="0 0 0 1 * *") // 매월 1일마다
//	public void test() {
////		System.out.println("스케줄러가 일정 시간마다 자동으로 출력");
//		System.out.println("----------------------- 게시판 DB, 서버 불일치하는 파일 제거 ----------------------- ");
////	서버에 저장된 파일 목록을 조회해서 DB에 저장된 파일 목록과 비교 후 
////	매칭되지 않는 서버 파일 제거
//
////		1) 서버에 저장된 파일 목록 조회
////	→ application 객체를 이용해서 
//		String filePath = servletContext.getRealPath("/resources/images/board");
////		c:\workspace\6_Framework\boardProject\src\main\webapp\resources\images\board\파일명
//		
////		2) filePath에 저장된 모든 파일 목록 읽어오기
//		File path = new java.io.File(filePath);
//		File[] imageArr = path.listFiles();
//		
////	배열 → List로 변환
//		List<File> serverImageList = Arrays.asList(imageArr);
//		
////		3) DB 파일 목록 조회
//		List<String> boardImageList = service.getBoardImageList();
//		
////		4) 서버에 파일 목록이 있을 경우
//		if (boardImageList.size() != 0) {
//			
////			5) 서버 파일 목록을 순차적으로 접근
//			for (File f : serverImageList) {
////				String[] imagePathArr = f.toString().split("\\\\");
////				String imageName = imagePathArr[imagePathArr.length-1]; 
////				System.out.println(imageName);
//				
////				6) 서버에 존재하는 파일이 DB(boardImageList)에 없다면 삭제
//				String imageName = f.getName();
////				if (!boardImageList.contains(imageName)) {
//				
////				List.indexOf(객체) : 객체가 List에 있으면 존재하는 해당 인덱스 반환, 없으면 -1
//				if (boardImageList.indexOf(imageName) == -1) {
////				DB 파일 목록							서버 파일 이름
//					System.out.println(imageName + " 삭제");
////					파일 삭제
//					f.delete();
//				}
//				
//			} // for문 종료
//			
//			System.out.println("----------------------- 이미지 파일 삭제 스케줄러 종료 -----------------------");
//		
//		}
//		
//	}
//	
//	
//	/*
//	 * @Scheduled
//	 * 
//	 * * Spring에서 제공하는 스케줄러 - 스케줄러 : 시간에 따른 특정 작업(Job)의 순서를 지정하는 방법.
//	 * 
//	 * 설정 방법 
//	 * 1) servlet-context.xml -> Namespaces 탭 -> task 체크 후 저장
//	 * 2) servlet-context.xml -> Source 탭 -> <task:annotation-driven/> 추가
//	 * 
//	 *
//	 * @Scheduled 속성
//	 *  - fixedDelay : 이전 작업이 끝난 시점으로 부터 고정된 시간(ms)을 설정.
//	 *    @Scheduled(fixedDelay = 10000) // 이전 작업이 끝난 후 10초 뒤에 실행
//	 *    
//	 *  - fixedRate : 이전 작업이 수행되기 시작한 시점으로 부터 고정된 시간(ms)을 설정.
//	 *    @Scheduled(fixedRate  = 10000) // 이전 작업이 시작된 후 10초 뒤에 실행
//	 *    
//	 *    
//	 * * cron 속성 : UNIX계열 잡 스케쥴러 표현식으로 작성 - cron="초 분 시 일 월 요일 [년도]" - 요일 : 1(SUN) ~ 7(SAT) 
//	 * ex) 2019년 9월 16일 월요일 10시 30분 20초 cron="20 30 10 16 9 2 " // 연도 생략 가능
//	 * 
//	 * - 특수문자 * : 모든 수. 
//	 * - : 두 수 사이의 값. ex) 10-15 -> 10이상 15이하 
//	 * , : 특정 값 지정. ex) 3,4,7 -> 3,4,7 지정 
//	 * / : 값의 증가. ex) 0/5 -> 0부터 시작하여 5마다 
//	 * ? : 특별한 값이 없음. (월, 요일만 해당) 
//	 * L : 마지막. (월, 요일만 해당)
//	 * @Scheduled(cron="0 * * * * *") // 매 분마다 실행
//	 * 
//	 * 
//	 * 
//	 * 
//	 * * 주의사항 - @Scheduled 어노테이션은 매개변수가 없는 메소드에만 적용 가능.
//	 * 
//	 */
//
//	
//}


