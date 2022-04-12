/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Connections;

import com.google.gson.stream.JsonWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;


/**
 *
 * @author eliam
 */
public class MainConnection extends DBConnection {
    
    private static MainConnection instance;
    
    private MainConnection() {
        
    }
    
    public static MainConnection getInstance() {
        if (instance == null) {
            instance = new MainConnection();
        }
        return instance;
    }
    
    public boolean executeNonQuery(String query, ArrayList<SqlParameters> parameters) {
        
        Connection connection = null;
        
        try {
            
            connection = this.getConnection();
            
            CallableStatement statement = connection.prepareCall(query);
            
            int index = 1;
            for (SqlParameters parameter : parameters) {
                statement.setObject(index++, parameter.getData(), parameter.getType());
            }
            
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
                catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
        
        return false;
    }
    
    // Regresa null si algo falla
    public ArrayList executeReader(String query, ArrayList<SqlParameters> parameters) {
        
        Connection connection = null;
        
        try {
            
            connection = this.getConnection();
            CallableStatement statement = connection.prepareCall(query);
            
            int index = 1;
            for (SqlParameters parameter : parameters) {
                statement.setObject(index++, parameter.getData(), parameter.getType());
            }
            
            ResultSet rs = statement.executeQuery();
            
            ResultSetMetaData meta = rs.getMetaData();
            int cc = meta.getColumnCount();
            
            ArrayList list = new ArrayList();
            while (rs.next()) {
                
                HashMap map = new HashMap();
                
                for (int i = 1; i <= cc; ++i) {

                    String name = meta.getColumnName(i);
                    //Object obj = meta.getColumnClassName(i);
                    Object obj = rs.getObject(i);
                    map.put(name, obj);
                    
                }
                
                list.add(map);
            
            }
            
            return list;
            
        }
        catch (SQLException ex) {
             System.out.println(ex.getMessage());
        }
        finally {
            if (connection != null) {
                try {
                    connection.close();
                }
                catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
        
        return null;
    }
    
}
