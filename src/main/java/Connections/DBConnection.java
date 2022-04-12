/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Connections;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 *
 * @author eliam
 */
public class DBConnection {
    
    private static DBConnection instance = null;
    private Context context = null;
    private Context ambient = null;
    static private DataSource infoConnection = null;
    
    protected DBConnection() {
        try {
            context = new InitialContext();
            ambient = (Context)context.lookup("java:comp/env");
            infoConnection = (DataSource)ambient.lookup("jdbc/bug_fields");
        } 
        catch (NamingException e) {
            System.out.println(e.getMessage());
        }
    }
    
    public static Connection getConnection() throws SQLException {
        if (instance == null){
            instance = new DBConnection();    
        }
        return infoConnection.getConnection();
    }
    
}
