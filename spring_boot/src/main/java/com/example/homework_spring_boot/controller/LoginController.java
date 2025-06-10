package com.example.homework_spring_boot.controller;

import com.example.homework_spring_boot.entity.LoginRequest;
import com.example.homework_spring_boot.entity.User;
import com.example.homework_spring_boot.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LoginController {

    //接入数据库中user图表
    @Autowired
    UserMapper userMapper;


    //联网测试方法
    @RequestMapping("/api/hello")
    public String hello(){
        return  "hello Sping boot 333";
    }

    //数据库测试方法
    @RequestMapping("/api/getUser")
    public List<User> getUser(){
        return userMapper.getUser();
    }

    @RequestMapping({"/api/login","/"})
    public String login(@RequestBody LoginRequest request){
        String email = request.getEmail();
        String password = request.getPassword();
        System.out.println("收到登录请求: " + email + "+" + password); // 添加日志

        //调用mapper
        Integer db_id = userMapper.getIDByEmail(email);
        if(db_id==null){
            //用户不存在，提示注册
            return "wrong username";
        }else {
            String db_password = userMapper.getPassword(db_id);
            if(password.equals(db_password)){
                //用户名和密码匹配
                return "ok";
            }else{
                return "wrong password";
            }
        }
    }

}
