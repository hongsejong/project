package edu.kh.haezo.common.aop;

import org.aspectj.lang.annotation.Pointcut;

// Pointcut을 모아둘 클래스
public class CommonPointcut {

	@Pointcut("execution(* edu.kh.haezo..*Impl*.*(..))")
	public void serviceImplPointcut() {
		
	}
	
}
