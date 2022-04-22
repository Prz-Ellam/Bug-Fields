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

/**
 *
 * @author eliam
 */
public class MySQLPostDAO implements PostDAO {
    
    MainConnection connection = MainConnection.getInstance();
    
    private final String CREATE = "INSERT INTO posts(title, description, user_id) VALUES(?, ?, ?)";
    private final String READ = "CALL sp_ReadPosts(?, ?)";
    private final String UPDATE = "CALL sp_UpdatePost(?, ?, ?, ?)";
    private final String DELETE = "CALL sp_DeletePost(?, ?)";

    
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
    
    
    public ArrayList read() {
        return null;
    }
    

    public ArrayList<PostViewModel> read(int offset) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall(READ);
            statement.setInt(1, 10); // LIMIT
            statement.setInt(2, offset);
            rs = statement.executeQuery();
            ArrayList<PostViewModel> posts = new ArrayList<PostViewModel>();
            while(rs.next()){
                PostViewModel dashboardPost = new PostViewModel();
                dashboardPost.setPostId(rs.getInt(1));
                dashboardPost.setTitle(rs.getString(2));
                dashboardPost.setDescription(rs.getString(3));
                dashboardPost.setUsername(rs.getString(4));
                dashboardPost.setCreationDate(rs.getString(5));
                posts.add(dashboardPost);
            }
            return posts;
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
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
    
    
    public boolean delete(int postId) {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
        }
        catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        finally {
            
        }
        return false;
        
    }
    
    public boolean delete(int postId, int userId) {
        Connection connection = null;
        try {
            connection = DBConnection.getConnection();
            CallableStatement statement = connection.prepareCall(DELETE);
            statement.setInt(1, postId);
            statement.setInt(2, userId);
            int rowCount = statement.executeUpdate();
            return (rowCount > 0) ? true : false;
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
            if (rs != null) {
                try {
                    rs.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
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
        
        return null;
        
    }
    
    @Override
    public List<PostViewModel> getByDate(String start, String end) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostsByDateRange(?, ?)");
            statement.setString(1, start);
            statement.setString(2, end);
            rs = statement.executeQuery();
            
            List<PostViewModel> posts = new ArrayList<PostViewModel>();
            while (rs.next()) {
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
            if (rs != null) {
                try {
                    rs.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
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
        return null;
    }

    @Override
    public List<PostViewModel> getByCategory(int categoryId) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostsByCategory(?)");
            statement.setInt(1, categoryId);
            rs = statement.executeQuery();
            
            List<PostViewModel> posts = new ArrayList<PostViewModel>();
            while (rs.next()) {
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
            if (rs != null) {
                try {
                    rs.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
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
        return null;
    }

    @Override
    public List<PostViewModel> getByFilter(String filter) {
        Connection connection = null;
        CallableStatement statement = null;
        ResultSet rs = null;
        try {
            connection = DBConnection.getConnection();
            statement = connection.prepareCall("CALL sp_GetPostsByFilter(?)");
            statement.setString(1, filter);
            rs = statement.executeQuery();
            
            List<PostViewModel> posts = new ArrayList<PostViewModel>();
            while (rs.next()) {
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
            if (rs != null) {
                try {
                    rs.close();
                }
                catch (SQLException e) {
                    System.out.println(e.getMessage());
                }
            }
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
        return null;
    }
    
}
