package edu.kh.haezo.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import edu.kh.haezo.member.model.dto.Member;



// Filter : 클라이언트의 요청/응답을 걸러내거나 첨가하는 클래스

// 클라이언트 → Filter → Dispather Servlet

//@WebFilter : 해당 클래스를 필터로 등록하고 지정된 주소로 요청이 올 때마다 동작
@WebFilter(filterName="loginFilter", urlPatterns = {
		"/mypage/*", "/board2/*", "/requestBoard2/*",
		"/board/*/insert",               // 작성 화면
	    "/board/*/insertContent",        // 작성 처리
	    "/board/*/*/update",             // 수정 화면
	    "/board/*/*/updateContent",      // 수정 처리
	    "/board/*/*/delete",             // 삭제
	    "/board/uploadImage",            // 에디터 이미지 업로드
	    "/board/like"                    // 좋아요 비동기
})

public class LoginFilter implements Filter {

	public void init(FilterConfig fConfig) throws ServletException {
//		서버가 켜질 때, 필터 코드가 변경되었을 때 필터 생성
		System.out.println("필터 생성");
	}
	
	public void destroy() {
//		필터 코드가 변경되었을 때 이전 필터를 파괴하는 메소드
		System.out.println("이전 필터 파괴");
	}
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
//		필터링 코드를 작성하는 메소드
		
//		1. ServletRequest, ServletResponse 다운캐스팅
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp =  (HttpServletResponse)response;
		
//		2. HttpServletRequest를 이용해서 HttpSession 얻어오기
		HttpSession session = req.getSession();
		
//		3. 로그인을 하지 않은 경우 (== session에서 key가 "loginMember"를 얻어와 null인 경우)
//		메인페이지로 재요청
		Member loginMember = (Member) session.getAttribute("loginMember");
		if(loginMember == null) {
			resp.sendRedirect("/");
		} else {
//			4. 로그인 상태인 경우 다음 필터 또는 DispatherServlet으로 전달
			chain.doFilter(request, response);
		}
		
	}



}
