/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

import com.google.gson.Gson;

/**
 *
 * @author eliam
 */
public class DashboardPostDTO {

    private int postId;
    private String title;
    private String description;
    private String username;
    private String creationDate;
    
    public DashboardPostDTO() {
        
    }
    
    public DashboardPostDTO(int postId, String title, String description, String username, String creationDate) {
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.username = username;
        this.creationDate = creationDate;
    }
    
        public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
    
}
