/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DAO;

import Connections.DBConnection;
import Controllers.RegistrationController;
import DTO.UserDTO;
import Interfaces.GenericDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author eliam
 */
public class UserDAO implements GenericDAO<UserDTO> {
    
    public UserDTO getUser(int id) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_GetUser(?)");
            statement.setInt(1, id);
        
            ResultSet result = statement.executeQuery();
            
            while(result.next()){
                UserDTO user = new UserDTO();
                user.setId(result.getInt(1));
                user.setName(result.getString(2));
                user.setLastName(result.getString(3));
                /*try {
                    //user.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse(result.getString(4)));
                } catch (ParseException ex) {
                    Logger.getLogger(RegistrationController.class.getName()).log(Level.SEVERE, null, ex);
                }*/
                user.setEmail(result.getString(5));
                user.setPhoto(result.getString(6));
                user.setUsername(result.getString(7));
                user.setPassword(result.getString(8));
                //user.setCreationDate(creationDate);
                user.setActive(result.getBoolean(10));
                user.setAge(result.getInt(11));
                return user;
            }
            
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
        
        return null;
        
    }

    public UserDTO login(String username, String password) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_LoginUser(?,?)");
            statement.setString(1, username);
            statement.setString(2, password);
        
            ResultSet result = statement.executeQuery();
            
            while(result.next()){
                UserDTO user = new UserDTO();
                user.setId(result.getInt(1));
                user.setName(result.getString(2));
                user.setLastName(result.getString(3));
                //String a = result.getString(4);
                //user.setDateOfBirth(result.getString(4));
                user.setEmail(result.getString(5));
                user.setPhoto(result.getString(6));
                user.setUsername(result.getString(7));
                user.setPassword(result.getString(8));
                //user.setCreationDate(creationDate);
                user.setActive(result.getBoolean(10));
                return user;
            }
            
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
        
        return null;
        
    }
    
    @Override
    public int create(UserDTO user) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_InsertUser(?,?,?,?,?,?,?)");
            statement.setString(1, user.getName());
            statement.setString(2, user.getLastName());
            statement.setObject(3, user.getDateOfBirth());
            statement.setString(4, user.getEmail());
            statement.setString(5, user.getPhoto());
            statement.setString(6, user.getUsername());
            statement.setString(7, user.getPassword());
        
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
    
    public boolean usernameExists(String username) {
        return false;
    }
    
    public ArrayList<UserDTO> read() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int update(UserDTO user) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public int delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
