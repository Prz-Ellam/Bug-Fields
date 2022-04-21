package DAO.Contracts;

import DTO.PostDTO;
import ViewModels.PostViewModel;
import java.util.List;

public interface PostDAO extends GenericDAO<PostDTO> {

    // Obtener por fecha
    List<PostViewModel> getByDate(String start, String end);
    
    // Obtener por categoria
    List<PostViewModel> getByCategory(int categoryId);
    
    // Obtener por filtro
    List<PostViewModel> getByFilter(String filter);
    
}
