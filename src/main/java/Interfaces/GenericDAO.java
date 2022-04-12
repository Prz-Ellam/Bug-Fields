/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Interfaces;

import java.util.ArrayList;

/**
 *
 * @author eliam
 */
public interface GenericDAO<T> {
    
    public boolean create(T dto);
    
    public ArrayList<T> read();
    
    public boolean update(T dto);
    
    public boolean delete(int id);
    
}
