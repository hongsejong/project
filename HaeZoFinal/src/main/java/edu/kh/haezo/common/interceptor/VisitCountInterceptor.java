package edu.kh.haezo.common.interceptor;

import java.time.LocalDate;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class VisitCountInterceptor implements HandlerInterceptor{
	
	private static final String COOKIE_NAME="visited_date";
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		
		
		//오늘 날짜 확인
		LocalDate today = LocalDate.now(); //이건 객체고
		String todayStr = today.toString(); //이건 스트링임
		

		
		//쿠키에서 방문기록 체크함(오늘방문했는지)
		boolean visitedToday = false;
		Cookie[] cookies = request.getCookies();
		if(cookies !=null) {
			for(Cookie cookie : cookies) {
				if(COOKIE_NAME.equals(cookie.getName())) {
					if (todayStr.equals(cookie.getValue())) {
						visitedToday=true;
					}
					break;
				}
			}
		}
		
		if(!visitedToday) {
			ServletContext application = request.getServletContext();
			Integer visitCount = (Integer) application.getAttribute("visitCount");
			
			if(visitCount ==null) {
				visitCount=1;
			}else {
				visitCount++;
			}
			   application.setAttribute("visitCount", visitCount);
	           // 쿠키에 오늘 날짜 기록 (24시간 동안 유지)
	            Cookie newCookie = new Cookie(COOKIE_NAME, todayStr);
	            newCookie.setMaxAge(60 * 60 * 24);
	            newCookie.setPath("/");
	            response.addCookie(newCookie);
	            
	            System.out.println("새로운 방문자로 카운트 증가, 현재 방문자 수: " + visitCount);
	        } 

		
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}
	
	
	
	
	
	
	
	
	
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
	}

}
