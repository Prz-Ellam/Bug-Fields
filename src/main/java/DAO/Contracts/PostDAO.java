package DAO.Contracts;

import DTO.PostDTO;
import ViewModels.PostViewModel;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public interface PostDAO extends GenericDAO<PostDTO> {
    
    public boolean create(PostDTO post);
    
    public boolean create(PostDTO post, List<String> categories) throws SQLException;
     
    public boolean update(PostDTO post, List<String> categories);
    
    public ArrayList<PostViewModel> read(int limit, int offset, int userId);
    
    public int getAdvancedSearchCount(Integer categoryId, String startDate, String endDate, String filter);
    
    public int getActivePostsCount();
    
    public boolean delete(int postId);
     
    public boolean delete(int postId, int userId);
    
    public PostDTO getById(int postId, int userId);
    
    public PostViewModel getById(int postId);
    
    public List<PostViewModel> getByAdvancedSearch(Integer categoryId, String startDate, String endDate, 
        String filter, int limit, int offset, int userId);
    
    public List<PostViewModel> getUserPosts(int userId, int limit, int offset);
    
    public int getUserPostsCount(int userId);

    // Obtener por fecha
    //List<PostViewModel> getByDate(String start, String end);
    
    // Obtener por categoria
    //List<PostViewModel> getByCategory(int categoryId);
    
    // Obtener por filtro
    //List<PostViewModel> getByFilter(String filter);
    
}
