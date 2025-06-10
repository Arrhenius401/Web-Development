package com.example.homework_spring_boot.entity;


import java.time.LocalDate;

public class User extends LoginRequest{
    private int userID;
    private String username;
    private LocalDate initDate;

    public User() {
    }

    public User(String email, String password, String phoneNumber, String username) {
        super(email, password, phoneNumber);
        this.username = username;
        this.initDate = LocalDate.now();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserID() {return userID;}

    public void setUserID(int userID) {this.userID = userID;}

    public LocalDate getInitDate() {return initDate;}

    public void setInitDate(LocalDate initDate) {this.initDate = initDate;}
}
