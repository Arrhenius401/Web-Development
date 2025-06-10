package com.example.homework_spring_boot.mapper;

import com.example.homework_spring_boot.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {

    //不必写实现类，注解已实现改函数
    @Select("SELECT COUNT(1) FROM user")
    int getCount();

    //使用邮箱获得用户ID
    @Select("SELECT userID FROM homework_web.user where email = #{email};")
    Integer getIDByEmail(String email);

    //使用ID获得用户密码
    @Select("SELECT password FROM homework_web.user where userID = #{id};")
    String getPassword(int id);

    //测试方法：总览
    @Select("SELECT * FROM homework_web.user;")
    List<User> getUser();
}
