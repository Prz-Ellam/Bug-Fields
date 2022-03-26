/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DAO.UserDAO;
import DTO.UserDTO;
import Utils.ImageUtils;
import java.io.File;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.Part;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

/**
 *
 * @author eliam
 */
@WebServlet(name = "RegistrationController", urlPatterns = {"/RegistrationController"})
@MultipartConfig(maxFileSize = 1000*1000 * 5,maxRequestSize = 1000 * 1000 * 25, fileSizeThreshold = 1000 * 1000)
public class RegistrationController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        UserDTO user = new UserDTO();
        user.setPhoto(ImageUtils.uploadImage(request.getPart("photo"), 
                request.getServletContext().getRealPath("")));
        user.setName(request.getParameter("firstName"));
        user.setLastName(request.getParameter("lastName"));
        try {
            user.setDateOfBirth(new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("dateOfBirth")));
        } catch (ParseException ex) {
            Logger.getLogger(RegistrationController.class.getName()).log(Level.SEVERE, null, ex);
        }
        user.setEmail(request.getParameter("email"));
        user.setUsername(request.getParameter("username"));
        user.setPassword(request.getParameter("password"));
        String confirmPassword = request.getParameter("confirmPassword");
        
        UserDTO a = new UserDTO();
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        
        Set<ConstraintViolation<UserDTO>> violations = validator.validate(user);
        
        
        UserDAO dao = new UserDAO();
        int result = dao.create(user);
        

        for (ConstraintViolation violation : violations) {
            System.out.println(violation.getMessage());
        }
        
        
        
        //String file = request.getParameter("profilePicture");
        //UserDAO dao = new UserDAO();
        
        
        
        
        response.sendRedirect("index.html");
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
