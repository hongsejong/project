package edu.kh.haezo.customer.controller.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.haezo.board.model.dto.Board;
@Repository
public class CustomerDAO {
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Board> noticeselect() {
		return sqlSession.selectList("customerMapper.noticeselect");
	}

	public List<Board> newsSelect() {
		return sqlSession.selectList("customerMapper.newsSelect");
	}

	public List<Board> singoSelect() {
		return sqlSession.selectList("customerMapper.singoSelect");
	}

	public List<Board> inqSelect() {
		return sqlSession.selectList("customerMapper.inqSelect");
	}

	public int todayBoardCount() {
		return sqlSession.selectOne("customerMapper.todayBoardCount");
	}

	public int todayInquiryCount() {
		return sqlSession.selectOne("customerMapper.todayInquiryCount");
	}

	public int yesCount() {
		return sqlSession.selectOne("customerMapper.yesCount");
	}

	public int iyesCount() {
		return sqlSession.selectOne("customerMapper.iyesCount");
	}

	public  List<Map<String, Object>> getChartData() {
		 return sqlSession.selectList("customerMapper.getChardata");
	}
	public  List<Map<String, Object>> getAllChartData() {
		 return sqlSession.selectList("customerMapper.getAllChartData");
	}
	
}
