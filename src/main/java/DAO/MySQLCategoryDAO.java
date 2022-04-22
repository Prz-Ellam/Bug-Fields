package DAO;

import Connections.DBConnection;
import DAO.Contracts.CategoryDAO;
import DTO.CategoryDTO;
import DAO.Contracts.GenericDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author eliam
 */
public class MySQLCategoryDAO implements CategoryDAO {
    
    private final String READ = "CALL sp_GetCategories()";
    private final String POST_CATEGORIES = "CALL sp_GetPostCategories(?)";

    //@Override
    public List<CategoryDTO> read() {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(READ);
            rs = statement.executeQuery();
            
            ArrayList<CategoryDTO> categories = new ArrayList<CategoryDTO>();
            while (rs.next()) {
                CategoryDTO category = new CategoryDTO();
                category.setCategoryId(rs.getInt("category_id"));
                category.setName(rs.getString("name"));
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
        
        return null;
    }
      
    //@Override
    public boolean create(CategoryDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    //@Override
    public boolean update(CategoryDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    //@Override
    public boolean delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<CategoryDTO> getPostCategories(int postId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(POST_CATEGORIES);
            statement.setInt(1, postId);
            rs = statement.executeQuery();
            List<CategoryDTO> categories = new ArrayList<CategoryDTO>();
            while(rs.next()) {
                CategoryDTO category = new CategoryDTO();
                category.setCategoryId(rs.getInt("category_id"));
                category.setName(rs.getString("name"));
                categories.add(category);
            }
            return categories;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return null;
    }

}
