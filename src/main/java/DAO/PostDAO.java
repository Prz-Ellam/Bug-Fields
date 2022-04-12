/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Connections.DBConnection;
import DTO.PostDTO;
import DTO.UserDTO;
import Interfaces.GenericDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author eliam
 */
public class PostDAO implements GenericDAO<PostDTO> {

    @Override
    public int create(PostDTO post) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_AddPost(?,?,?)");
            statement.setString(1, post.getTitle());
            statement.setString(2, post.getDescription());
            statement.setObject(3, post.getUserID());
        
            return statement.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (connection != null) {
                try {
                    connection.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        
        return 0;
          
    }

    @Override
    public ArrayList read() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public ArrayList readByDate(char type) {
        return null;
    }

    @Override
    public int update(PostDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    @Override
    public int delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public PostDTO getPostByID(int id) {
        
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_GetPostByID(?)");
            statement.setInt(1, id);
            
            ResultSet result = statement.executeQuery();
            
            while(result.next()){
                
                PostDTO post = new PostDTO();
                post.setPostID(result.getInt(1));
                post.setTitle(result.getString(2));
                post.setDescription(result.getString(3));
                post.setUserID(result.getInt(4));
                
                return post;
                
            }
            
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            if (connection != null) {
                try {
                    connection.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        
        return null;
        
    }
    
}
