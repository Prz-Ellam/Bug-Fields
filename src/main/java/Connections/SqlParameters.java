/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Connections;

/**
 *
 * @author eliam
 */
public class SqlParameters {
    
    private Object data;
    private int type;
    
    public SqlParameters(Object data, int type) {
        this.data = data;
        this.type = type;
    }
    
    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
    
}
