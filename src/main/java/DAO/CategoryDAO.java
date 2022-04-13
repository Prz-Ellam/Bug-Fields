package DAO;

import Connections.DBConnection;
import DTO.CategoryDTO;
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
public class CategoryDAO implements GenericDAO<CategoryDTO> {

    @Override
    public ArrayList<CategoryDTO> read() {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();
            
            CallableStatement statement = connection.prepareCall("CALL sp_GetCategories()");
            
            ResultSet result = statement.executeQuery();
            
            ArrayList<CategoryDTO> categories = new ArrayList<CategoryDTO>();
            while (result.next()) {
                CategoryDTO category = new CategoryDTO();
                category.setCategoryId(result.getInt(1));
                category.setName(result.getString(2));
                categories.add(category);
            }
            
            return categories;
            
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
        
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
      
    @Override
    public boolean create(CategoryDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean update(CategoryDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public boolean delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
