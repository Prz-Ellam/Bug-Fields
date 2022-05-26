package DAO;

import Connections.DBConnection;
import Connections.MainConnection;
import DAO.Contracts.PostDAO;
import DTO.DashboardPostDTO;
import DTO.PostDTO;
import DTO.UserDTO;
import DAO.Contracts.GenericDAO;
import ViewModels.PostViewModel;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import static java.sql.Statement.RETURN_GENERATED_KEYS;
import java.util.ArrayList;
import java.sql.Types;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MySQLPostDAO implements PostDAO {
    
    private final String CREATE = "INSERT INTO posts(title, description, user_id) VALUES(?, ?, ?)";
    private final String READ = "CALL sp_ReadPosts(?, ?, ?)";
    private final String UPDATE = "CALL sp_UpdatePost(?, ?, ?, ?)";
    private final String DELETE = "CALL sp_DeletePost(?, ?)";
    private final String USER_POSTS = "CALL sp_GetUserPosts(?, ?, ?)";
    private final String USER_POSTS_COUNT = "CALL sp_GetUserPostsCount(?)";

    public boolean create(PostDTO post) {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            connection.setAutoCommit(false);
            CallableStatement statement = connection.prepareCall("CALL sp_CreatePost(?, ?, ?)");
            statement.setString(1, post.getTitle());
            statement.setString(2, post.getDescription());
            statement.setObject(3, post.getUserID());
            int rowCount = statement.executeUpdate();   
            return (rowCount > 0) ? true : false;
        }
        catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        finally {
            try {
                if (connection != null) connection.close();
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return false;
    }
    
    @Override
    public boolean create(PostDTO post, List<String> categories) throws SQLException {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            connection.setAutoCommit(false);
            PreparedStatement createPost = connection.prepareStatement(CREATE, RETURN_GENERATED_KEYS);
            createPost.setString(1, post.getTitle());
            createPost.setString(2, post.getDescription());
            createPost.setObject(3, post.getUserID());
            int result = createPost.executeUpdate();
            
            ResultSet rs = createPost.getGeneratedKeys();
            
            int id = -1;
            if (rs.next()) {
                id = rs.getInt(1);
            }
            else {
                connection.rollback();
                return false;
            }
            
            PreparedStatement addCategoryPost = connection.prepareStatement("INSERT INTO posts_categories(post_id, category_id) VALUES(?, ?)");
            for (String category : categories) {
                addCategoryPost.setInt(1, id);
                addCategoryPost.setInt(2, Integer.parseInt(category));
                result = addCategoryPost.executeUpdate();
            }
            
            connection.commit();
            return true;

        }
        catch (SQLException e) {
            connection.rollback();
            System.out.println(e.getMessage());
        }
        finally {
            try {
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        
        return false;
    }
    
    public boolean update(PostDTO post, List<String> categories) {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            connection.setAutoCommit(false);
            CallableStatement statement = connection.prepareCall("CALL sp_UpdatePost(?,?,?,?)");
            statement.setInt(1, post.getPostID());
            statement.setString(2, post.getTitle());
            statement.setString(3, post.getDescription());
            statement.setInt(4, post.getUserID());
            int result = statement.executeUpdate();
            
            PreparedStatement deleteCategories = connection.prepareStatement("DELETE FROM posts_categories WHERE post_id = ?");
            deleteCategories.setInt(1, post.getPostID());
            result = deleteCategories.executeUpdate();
            
            PreparedStatement addCategoryPost = connection.prepareStatement("INSERT INTO posts_categories(post_id, category_id) VALUES(?, ?)");
            for (String category : categories) {
            
                addCategoryPost.setInt(1, post.getPostID());
                addCategoryPost.setInt(2, Integer.parseInt(category));
                result = addCategoryPost.executeUpdate();
            
            }
            
            connection.commit();
            return true;
        }
        catch (SQLException ex) {
            try {
                connection.rollback();
                System.out.println(ex.getMessage());
            } catch (SQLException ex1) {
                Logger.getLogger(MySQLPostDAO.class.getName()).log(Level.SEVERE, null, ex1);
            }
        }
        finally {
            try {
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return false;
    }
    
    
    public ArrayList read() {
        return null;
    }
    

    public ArrayList<PostViewModel> read(int limit, int offset, int userId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(READ);
            statement.setInt(1, limit);
            statement.setInt(2, offset);
            statement.setInt(3, userId);
            rs = statement.executeQuery();
            ArrayList<PostViewModel> posts = new ArrayList<PostViewModel>();
            while(rs.next()){
                PostViewModel dashboardPost = new PostViewModel();
                dashboardPost.setPostId(rs.getInt(1));
                dashboardPost.setTitle(rs.getString(2));
                dashboardPost.setDescription(rs.getString(3));
                dashboardPost.setUsername(rs.getString(4));
                dashboardPost.setCreationDate(rs.getString(5));
                dashboardPost.setUserOwn(rs.getBoolean(6));
                posts.add(dashboardPost);
            }
            return posts;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null) rs.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
    
    public int getAdvancedSearchCount(Integer categoryId, String startDate, String endDate, String filter) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostsByAdvancedSearchCount(?, ?, ?, ?)");
            statement.setObject(1, categoryId);
            statement.setString(2, startDate);
            statement.setString(3, endDate);
            statement.setString(4, filter);
            rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
            else {
                return -1;
            }
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return -1;
        }
        finally {
            try {
                if (rs != null)           rs.close();
                if (statement != null)    statement.close();
                if (connection != null)   connection.close();
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }
    
    public int getActivePostsCount() {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet rs;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareStatement("SELECT COUNT(*) FROM posts WHERE active = TRUE");
            rs = statement.executeQuery();
            if(rs.next()){
                
                return rs.getInt(1);
            }
            else{
            
              return 0;
            }
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return 0;
    }
    
    public ArrayList readByDate(char type) {
        return null;
    }
    
    public boolean delete(int postId) {
        return false;       
    }
    
    public boolean delete(int postId, int userId) {
        Connection connection = null;
        CallableStatement statement = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(DELETE);
            statement.setInt(1, postId);
            statement.setInt(2, userId);
            int rowCount = statement.executeUpdate();
            return (rowCount > 0) ? true : false;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return false;
    }
    
    public PostDTO getById(int postId, int userId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetUserPostByID(?,?)");
            statement.setInt(1, postId);
            statement.setInt(2, userId);
            rs = statement.executeQuery();
            PostDTO post = null;
            if(rs.next()){
                post = new PostDTO();
                post.setPostID(rs.getInt(1));
                post.setTitle(rs.getString(2));
                post.setDescription(rs.getString(3));
                post.setUserID(rs.getInt(4));
                return post;
            }
            else {
                return null;
            }
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null) rs.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return null;  
    }
    
    public PostViewModel getById(int postId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostByID(?)");
            statement.setInt(1, postId);
            rs = statement.executeQuery();
            PostViewModel post = null;
            if(rs.next()){
                post = new PostViewModel();
                post.setPostId(rs.getInt(1));
                post.setTitle(rs.getString(2));
                post.setDescription(rs.getString(3));
                post.setUsername(rs.getString(4));
                post.setCreationDate(rs.getString(5));
                return post;
            }
            else {
                return null;
            }
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null) rs.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            }
            catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
    
    public List<PostViewModel> getByAdvancedSearch(Integer categoryId, String startDate, String endDate, 
        String filter, int limit, int offset, int userId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostsByAdvancedSearch(?, ?, ?, ?, ?, ?, ?)");
            statement.setObject(1, categoryId);
            statement.setString(2, startDate);
            statement.setString(3, endDate);
            statement.setString(4, filter);
            statement.setInt(5, limit);
            statement.setInt(6, offset);
            statement.setInt(7, userId);
            rs = statement.executeQuery();
            List<PostViewModel> posts = new ArrayList<PostViewModel>();
            while (rs.next()) {
                PostViewModel post = new PostViewModel();
                post.setPostId(rs.getInt("post_id"));
                post.setTitle(rs.getString("title"));
                post.setDescription(rs.getString("description"));
                post.setUsername(rs.getString("username"));
                post.setCreationDate(rs.getString("creation_date")); 
                post.setUserOwn(rs.getBoolean("Own"));
                posts.add(post);
            }
            return posts;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null)           rs.close();
                if (statement != null)    statement.close();
                if (connection != null)   connection.close();
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        
        return null;
    }

    @Override
    public boolean update(PostDTO dto) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public List<PostViewModel> getUserPosts(int userId, int limit, int offset) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(USER_POSTS);
            statement.setInt(1, userId);
            statement.setInt(2, limit);
            statement.setInt(3, offset);
            rs = statement.executeQuery();
            List<PostViewModel> posts = new ArrayList<PostViewModel>();
            while(rs.next()) {
                PostViewModel post = new PostViewModel();
                post.setPostId(rs.getInt("post_id"));
                post.setTitle(rs.getString("title"));
                post.setDescription(rs.getString("description"));
                post.setUsername(rs.getString("username"));
                post.setCreationDate(rs.getString("creation_date"));
                posts.add(post);   
            }
            return posts;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            try {
                if (rs != null)           rs.close();
                if (statement != null)    statement.close();
                if (connection != null)   connection.close();
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return null;
    }

    @Override
    public int getUserPostsCount(int userId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(USER_POSTS_COUNT);
            statement.setInt(1, userId);
            rs = statement.executeQuery();        
            return (rs.next()) ? rs.getInt(1) : -1;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return -1;
        }
        finally {
            try {
                if (rs != null)           rs.close();
                if (statement != null)    statement.close();
                if (connection != null)   connection.close();
            }
            catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }
}