package edu.kh.haezo.common.aop;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component // Bean 등록
@Aspect // Pointcut(타겟 지정) + Advice(수행할 코드)
				// 공통 관심사가 작성된 클래스임을 지정
@Slf4j // log 객체 얻어오기
public class AfterAspect {

	@After("CommonPointcut.serviceImplPointcut()")
	public void afterLog() {
		
		log.info("-------------------------------------------------------------------------------\n\n");
		
	}
	
}
