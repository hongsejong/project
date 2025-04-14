package edu.kh.haezo.member.model.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserBan {
    // 정지 시작일
    private Date banStart;
    
    // 정지 종료일
    private Date banEnd;
    
    // 신고당한 횟수
    private int reportCount;
    
    // 정지당한 횟수
    private int banCount;
    
    // 회원 번호
    private int memberNo;
}
