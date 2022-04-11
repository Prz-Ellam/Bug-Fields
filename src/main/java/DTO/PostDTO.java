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
    
    private String title;
    private String description;
    private int userID;
    
    public PostDTO(String title, String description, int userID) {
        this.title = title;
        this.description = description;
        this.userID = userID;
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
        return userID;
    }

    public void setUserID(int id) {
        this.userID = userID;
    }
    
}
