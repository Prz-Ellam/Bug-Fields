package DAO;

import Connections.DBConnection;
import Connections.MainConnection;
import Connections.SqlParameters;
import Controllers.RegistrationController;
import DTO.UserDTO;
import DAO.Contracts.GenericDAO;
import DAO.Contracts.UserDAO;
import com.google.gson.Gson;
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
import java.sql.Types;
import java.util.HashMap;

/**
 *
 * @author eliam
 */
public class MySQLUserDAO implements UserDAO {
    
    private final String CREATE = "CALL sp_InsertUser(?,?,?,?,?,?,?)";
    private final String UPDATE = "CALL sp_UpdateUser(?,?,?,?,?,?,?)";
    private final String GET_ONE = "CALL sp_GetUser(?)";
        
    public UserDTO getUser(int userId) {
        Connection connection = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            CallableStatement statement = connection.prepareCall(GET_ONE);
            statement.setInt(1, userId);
            rs = statement.executeQuery();
            UserDTO user = new UserDTO();
            if(rs.next()) {
                user.setUserId(rs.getInt(1));
                user.setName(rs.getString(2));
                user.setLastName(rs.getString(3));
                user.setDateOfBirth(rs.getString(4));
                user.setEmail(rs.getString(5));
                user.setPhoto(rs.getString(6));
                user.setUsername(rs.getString(7));
                user.setAge(rs.getInt(11));
            }
            else{
                return null;
            }
            rs.close();
            statement.close();
            return user;
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (rs != null) {
                try {
                    rs.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
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
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_LoginUser(?,?)");
            statement.setString(1, username);
            statement.setString(2, password);
            rs = statement.executeQuery();
            
            while(rs.next()){
                UserDTO user = new UserDTO();
                user.setUserId(rs.getInt(1));
                user.setName(rs.getString(2));
                user.setLastName(rs.getString(3));
                user.setDateOfBirth(rs.getString(4));
                user.setEmail(rs.getString(5));
                user.setPhoto(rs.getString(6));
                user.setUsername(rs.getString(7));
                user.setPassword(rs.getString(8));
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
    public boolean create(UserDTO user) {
        Connection connection = null;
        CallableStatement statement = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(CREATE);
            statement.setString(1, user.getName());
            statement.setString(2, user.getLastName());
            statement.setObject(3, user.getDateOfBirth());
            statement.setString(4, user.getEmail());
            statement.setString(5, user.getPhoto());
            statement.setString(6, user.getUsername());
            statement.setString(7, user.getPassword());
            int rowCount = statement.executeUpdate();
            return (rowCount > 0) ? true : false;          
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            if (statement != null) {
                try {
                    statement.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        return false;
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

    //@Override
    public boolean update(UserDTO user) {
        
        Connection connection = null;
        
        try{
            connection = DBConnection.getConnection();
            
            CallableStatement statement = connection.prepareCall(UPDATE);
            statement.setInt(1, user.getUserId());
            statement.setString(2, user.getName());
            statement.setString(3, user.getLastName());
            statement.setString(4, user.getDateOfBirth());
            statement.setString(5, user.getEmail());
            statement.setString(6, user.getPhoto());
            statement.setString(7, user.getUsername());
            
            int rowCount = statement.executeUpdate();
            
            if (rowCount > 0) {
                return true;
            }
            else {
                return false;
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
        
        return false;
    }

    //@Override
    public boolean delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
