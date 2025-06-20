package com.example.homework_spring_boot.controller;

import com.example.homework_spring_boot.entity.Post;
import com.example.homework_spring_boot.entity.User;
import com.example.homework_spring_boot.service.PostService;
import com.example.homework_spring_boot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminPanelController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    //adminPanel界面获取所有帖子
    @RequestMapping("/api/post/all")
    public List<Post> getAllPost(){
        List<Post> posts = postService.getAllPost();

        //生成日志
        System.out.println("传输Post数量: " + posts.size());

        return posts;
    }

    //adminPanel界面获取所有用户
    @RequestMapping("/api/user/all")
    public List<User> getAllUser(){
        List<User> users = userService.getAllUser();

        //生成日志
        System.out.println("传输User数量: " + users.size());

        return users;
    }

    //adminPanel界面更新用户状态
    @RequestMapping("/api/user/updateStatus")
    public boolean updateUserStatus(@RequestBody User user){
        //输出日志
        System.out.println("收到关于更新用户状态请求");

        boolean isValid = userService.updateUserStatus(user.getUserID(), user.getStatus());

        //输出日志
        System.out.println("更新用户状态请求结果: " + isValid);

        return isValid;
    }

    //adminPanel界面更新用户状态
    @RequestMapping("/api/post/updateStatus")
    public boolean updatePostStatus(@RequestBody Post post){
        //输出日志
        System.out.println("收到关于更新帖子状态请求");

        boolean isValid = postService.updatePostStatus(post.getPostID(), post.getStatus());

        //输出日志
        System.out.println("更新帖子状态请求结果: " + isValid);

        return isValid;
    }

}
