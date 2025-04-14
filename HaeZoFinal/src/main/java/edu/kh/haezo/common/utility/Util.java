package edu.kh.haezo.common.utility;

import java.text.SimpleDateFormat;

public class Util {
	
//	XSS(Cross Site Scripting) : 관리자가 아닌 이용자가 악성 스크립트를 삽입해서 공격
//	- 웹 애플리케이션에서 발생하는 취약점
	
//	XSS 방지 처리
//	개행 문자들을 HTML에서 줄바꿈으로 인식할 수 있도록 "<br>" 태그로 변경
	public static String newLineHandling(String content) {
		return content.replaceAll("(\r\n|\n\r|\n|\r)", "<br>");
		
//		textarea의 엔터 : /r/n
//		/r : 캐리지 리턴(첫 번째로 돌아가기)
//		/n : new line(새로운 줄)
	}
	
	
//	XSS 공격 방지 처리 메소드
	public static String XSSHandling(String content) {
//		<, >, &, " 문자를 HTML 코드가 아닌 문자 그대로 보이도록 변경
		
		content = content.replaceAll("&", "&amp;");
		content = content.replaceAll("<", "&lt;");
		content = content.replaceAll(">", "&gt;");
		content = content.replaceAll("\"", "&quot;");
		
		
		return content;
	}
	
	// 파일명 변경 메소드
	   public static String fileRename(String originFileName) {
	      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
	      String date = sdf.format(new java.util.Date(System.currentTimeMillis()));

	      int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

	      String str = "_" + String.format("%05d", ranNum);

	      String ext = originFileName.substring(originFileName.lastIndexOf("."));

	      return date + str + ext;
	   }

}
