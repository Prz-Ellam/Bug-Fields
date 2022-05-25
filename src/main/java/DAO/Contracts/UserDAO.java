package DAO.Contracts;

import DTO.UserDTO;

public interface UserDAO {
    
    UserDTO getUser(int userId);
    
    public UserDTO login(String username, String password);
    
    boolean create(UserDTO user);
    
    public int usernameExists(String username, int userId);
    
    public boolean emailExists(String email, int userId);
    
    public boolean update(UserDTO user);
    
    public boolean updatePwd(int userId, String oldPwd, String newPwd);
    
}
