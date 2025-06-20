package com.example.homework_spring_boot.controller;

import com.example.homework_spring_boot.entity.Post;
import com.example.homework_spring_boot.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private PostService postService;

    //home界面获取帖子
    @RequestMapping("/api/post/home")
    public List<Post> getHomePost(){
        List<Post> posts = postService.getHomePost();

        //生成日志
        System.out.println("传输Post数量: " + posts.size());

        return posts;
    }


}
