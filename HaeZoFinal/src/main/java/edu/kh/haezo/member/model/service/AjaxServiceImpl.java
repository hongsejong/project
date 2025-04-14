package edu.kh.haezo.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.haezo.member.model.dao.AjaxDAO;

@Service
public class AjaxServiceImpl implements AjaxService{
	
	@Autowired
	private AjaxDAO dao;

	@Override
	public String checkEmail(String email) {
		return dao.checkEmail(email);
	}

	@Override
	public int checkNickname(String nickname) {
		return dao.checkNickname(nickname);
	}

	
}
