package ViewModels;

import DTO.CategoryDTO;
import java.util.List;

public class PostViewModel {
    
    private int postId;
    private String title;
    private String description;
    private String username;
    private String creationDate;
    private List<CategoryDTO> categories;
    private boolean userOwn;
    
    public PostViewModel() {
        
    }
    
    public PostViewModel(int postId, String title, String description, String username, String creationDate) {
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.username = username;
        this.creationDate = creationDate;
    }
    
        public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
    
    public List<CategoryDTO> getCategories() {
        return categories;
    }
    
    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
    }
    public boolean getUserOwn() {
        return userOwn;
    }
    
    public void setUserOwn(boolean userOwn) {
        this.userOwn = userOwn;
    }
    
    
}
