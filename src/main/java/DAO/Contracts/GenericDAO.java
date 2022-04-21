/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package DAO.Contracts;

import java.util.List;

/**
 *
 * @author eliam
 */
public interface GenericDAO<T> {
    
    public boolean create(T dto);
    
    public List<T> read();
    
    public boolean update(T dto);
    
    public boolean delete(int id);
    
}
