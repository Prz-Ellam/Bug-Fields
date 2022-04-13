/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

/**
 *
 * @author eliam
 */
public class PostDTO {
    
    private int postId;
    private String title;
    private String description;
    private int userId;
    
    public PostDTO() {
        
    }
    
    public PostDTO(int postId, String title, String description, int userId) {
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
    
    public PostDTO(String title, String description, int userId) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
    
    public PostDTO(int postId, int userId) {
        this.postId = postId;
        this.userId = userId;
    }
    
    public int getPostID() {
        return postId;
    }
    
    public void setPostID(int postID) {
        this.postId = postID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public int getUserID() {
        return userId;
    }

    public void setUserID(int userID) {
        this.userId = userID;
    }
    
}
