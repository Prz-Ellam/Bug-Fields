package DAO.Contracts;

import DTO.UserDTO;

public interface UserDAO {
    
    boolean create(UserDTO user);
    
}
