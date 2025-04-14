package edu.kh.haezo.common.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component // Bean 등록
@Aspect // Pointcut(타겟 지정) + Advice(수행할 코드)
				// 공통 관심사가 작성된 클래스임을 지정
@Slf4j // log 객체 얻어오기
public class AroundAspect {
	
	@Around("CommonPointcut.serviceImplPointcut()")
	public Object aroundServiceLog(ProceedingJoinPoint pj) throws Throwable {
// @Around advice는 JoinPoint Interface가 아닌
//		하위 타입인 ProceedingJoinPoint를 사용해야 함
		
		long startMs = System.currentTimeMillis(); // 서비스 시작 시의 ms 값
		Object obj = pj.proceed(); // 여기가 기준

		long endMs = System.currentTimeMillis(); // 서비스 종료 시의 ms 값
		
		String str = "Running Time : " + (endMs - startMs) + "ms";
		
		log.info(str);
		
		return obj;
	}

}
