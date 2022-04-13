package DAO;

import Connections.DBConnection;
import Connections.MainConnection;
import Connections.SqlParameters;
import DTO.DashboardPostDTO;
import DTO.PostDTO;
import DTO.UserDTO;
import Interfaces.GenericDAO;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Types;

/**
 *
 * @author eliam
 */
public class PostDAO implements GenericDAO<PostDTO> {
    
    MainConnection connection = MainConnection.getInstance();

    @Override
    public boolean create(PostDTO post) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_CreatePost(?, ?, ?)");
            statement.setString(1, post.getTitle());
            statement.setString(2, post.getDescription());
            statement.setObject(3, post.getUserID());
        
            int rowCount = statement.executeUpdate();
            
            if (rowCount > 0) {
                return true;
            }
            else {
                return false;
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
        
        return false;
          
    }
    
    @Override
    public ArrayList read() {
        return null;
    }
    

    public ArrayList read(int offset) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_GetPosts(?)");
            statement.setInt(1, offset);
            
            ResultSet result = statement.executeQuery();
            
            ArrayList<DashboardPostDTO> posts = new ArrayList<DashboardPostDTO>();
            while(result.next()){
                
                DashboardPostDTO dashboardPost = new DashboardPostDTO();
                dashboardPost.setPostId(result.getInt(1));
                dashboardPost.setTitle(result.getString(2));
                dashboardPost.setDescription(result.getString(3));
                dashboardPost.setUsername(result.getString(4));
                dashboardPost.setCreationDate(result.getString(5));
               
                posts.add(dashboardPost);
            }
            
            return posts;
            
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
    
    public int getActivePostsCount() {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            PreparedStatement statement = connection.prepareCall("SELECT CEILING( (SELECT COUNT(*) FROM posts WHERE active <> FALSE) / 10) AS Total;");
            
            ResultSet result = statement.executeQuery();
            
            while(result.next()){
                
                return result.getInt(1);
            }
            
            return 0;
            
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
        
        return 0;
        
    }
    
    public ArrayList readByDate(char type) {
        return null;
    }

    @Override
    public boolean update(PostDTO post) {
        
        Connection connection = null;
        
        try {
            connection = DBConnection.getConnection();
            
            CallableStatement statement = connection.prepareCall("CALL sp_UpdatePost(?,?,?,?)");
            statement.setInt(1, post.getPostID());
            statement.setString(2, post.getTitle());
            statement.setString(3, post.getDescription());
            statement.setInt(4, post.getUserID());
            
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
    
    @Override
    public boolean delete(int id) {
        
        return false;
        
    }
    
    public boolean delete(int postId, int userId) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();
            CallableStatement statement = connection.prepareCall("CALL sp_DeletePost(?,?)");
            statement.setInt(1, postId);
            statement.setInt(2, userId);
            
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
    
    public PostDTO getUserPostByID(int postId, int userId) {

        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();

            CallableStatement statement = connection.prepareCall("CALL sp_GetUserPostByID(?,?)");
            statement.setInt(1, postId);
            statement.setInt(2, userId);
            
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
    
    public ArrayList<DashboardPostDTO> readLikePosts(String filter) {
        
        Connection connection = null;
        
        try {
            
            connection = DBConnection.getConnection();
            CallableStatement statement = connection.prepareCall("CALL sp_ReadLikePosts(?)");
            statement.setString(1, filter);
            
            ResultSet result = statement.executeQuery();
            
            ArrayList<DashboardPostDTO> posts = new ArrayList<DashboardPostDTO>();
            while (result.next()) {
                DashboardPostDTO post = new DashboardPostDTO();
                post.setPostId(result.getInt(1));
                post.setTitle(result.getString(2));
                post.setDescription(result.getString(3));
                post.setUsername(result.getString(4));
                post.setCreationDate(result.getString(5)); 
                posts.add(post);       
            }
            
            return posts;
            
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
