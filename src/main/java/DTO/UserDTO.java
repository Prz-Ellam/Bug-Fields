/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DTO;

import java.util.Date;
import javax.validation.constraints.*;

/**
 *
 * @author eliam
 */
public class UserDTO {
    
    private int id;
    
    @NotNull(message = "El nombre no puede estar vacio")
    @NotEmpty(message = "El nombre no puede estar vacio")
    @NotBlank(message = "El nombre no puede estar vacio")
    private String name;
    
    @NotNull(message = "El apellido no puede estar vacio")
    @NotEmpty(message = "El apellido no puede estar vacio")
    @NotBlank(message = "El apellido no puede estar vacio")
    private String lastName;
    
    private String dateOfBirth;
    
    @NotNull(message = "El correo electronico no puede estar vacio")
    @NotEmpty(message = "El correo electronico no puede estar vacio")
    @NotBlank(message = "El correo electronico no puede estar vacio")
    @Email(message = "El correo electronico no es valido")
    private String email;
    
    @NotNull(message = "La foto de perfil no puede estar vacia")
    @NotEmpty(message = "La foto de perfil no puede estar vacia")
    @NotBlank(message = "La foto de perfil no puede estar vacia")
    private String photo;
    
    @NotNull(message = "El nombre de usuario no puede estar vacio")
    @NotEmpty(message = "El nombre de usuario no puede estar vacio")
    @NotBlank(message = "El nombre de usuario no puede estar vacio")
    private String username;
    
    @NotNull(message = "La contraseña no puede estar vacia")
    @NotEmpty(message = "La contraseña no puede estar vacia")
    @NotBlank(message = "La contraseña no puede estar vacia")
    private String password;
    
    private Date creationDate;
    private boolean active;
    
    private int age;
    
    public UserDTO() {
        
    }

    public UserDTO(int id, String name, String lastName, String dateOfBirth, String email, String photo, 
        String username, String password, Date creationDate, boolean active, int age) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.photo = photo;
        this.username = username;
        this.password = password;
        this.creationDate = creationDate;
        this.active = active;
        this.age = age;
    }
    
    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public UserDTO(String name, String lastName, String dateOfBirth, String email, String username, 
            String password, String photo) {
        this.name = name;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.username = username;
        this.password = password;
        this.photo = photo;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
    
    public boolean getActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
}
