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
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
                user.setDateOfBirth(result.getString(4));
                user.setEmail(result.getString(5));
                user.setPhoto(result.getString(6));
                user.setUsername(result.getString(7));
                user.setPassword(result.getString(8));
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
                user.setDateOfBirth(result.getString(4));
                user.setEmail(result.getString(5));
                user.setPhoto(result.getString(6));
                user.setUsername(result.getString(7));
                user.setPassword(result.getString(8));
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
    
    public int usernameExists(String username, int id) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();
            
            Statement statement = connection.createStatement();
            String query = "SELECT COUNT(*) FROM users WHERE username = ? AND user_id <> ?";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setString(1, username);
            ps.setInt(2, id);
            ResultSet rs  = ps.executeQuery();
            
            // chequeo que el result set no sea vacío, moviendo el cursor a la
            // primer fila. (El cursor inicia antes de la primer fila)
            int n = 0;
            if (rs.next()) {
                //Si hay resultados obtengo el valor.
                n = rs.getInt(1);
            }
            
            connection.close();
            
            return n;
            
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
