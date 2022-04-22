package DAO.Contracts;

import DTO.CategoryDTO;
import java.util.List;

public interface CategoryDAO {
    
    List<CategoryDTO> getPostCategories(int postId);
    
}
