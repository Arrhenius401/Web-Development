package com.example.homework_spring_boot.service;

import com.example.homework_spring_boot.component.JwtTokenUtil;
import com.example.homework_spring_boot.entity.LocalToken;
import com.example.homework_spring_boot.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckService {

    private static final String ADMIN_STRING = "ROLE_ADMIN";

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    //验证令牌有效性
    public boolean checkToken(LocalToken localToken){
        User tokenUser = localToken.getUser();
        String token = localToken.getToken();

        boolean isValid = false;

        try {
            isValid = jwtTokenUtil.validateToken(token, tokenUser.getUserID());
            //输出日志
            jwtTokenUtil.printToken(token);
        }catch (Exception e){
            System.out.println("解析异常: " + e.getMessage());
        }
        System.out.println("解析前端本地令牌结果: " + isValid);

        return isValid;
    }

    //从令牌中验证管理员身份有效性
    public boolean checkAdmin(LocalToken localToken){
        //判断令牌有效性
        boolean isTokenValid = checkToken(localToken);
        boolean isAdmin = false;

        if(isTokenValid){
            String token = localToken.getToken();
            String role = jwtTokenUtil.getUserRoleFromToken(token);
            isAdmin =  role.equals(ADMIN_STRING);
        }else {
            isAdmin = false;
        }

        //生成日志
        System.out.println("检验管理员权限结果: " + isAdmin);

        return isAdmin;
    }
}
