/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.Contracts.UserDAO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DAO.MySQLUserDAO;
import DTO.UserDTO;
import Utils.ImageUtils;
import com.google.gson.Gson;
import java.io.File;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpSession;
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
@MultipartConfig(maxFileSize = 1000*1000 * 5, maxRequestSize = 1000 * 1000 * 25, fileSizeThreshold = 1000 * 1000)
public class RegistrationController extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) throws ServletException, IOException  {
        
        HashMap result = new HashMap();
        
        String name = request.getParameter("first-name");
        String lastName = request.getParameter("last-name");
        String dateOfBirth = request.getParameter("date-of-birth");
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirm-password");
        Part photo = request.getPart("photo");
        String photoName = ImageUtils.uploadImage(photo, this.getServletContext().getRealPath(""));
        
        UserDTO user = new UserDTO(name, lastName, dateOfBirth, email, username, password, photoName);
        
        UserDAO userDao = new MySQLUserDAO();
        boolean queryResult = userDao.create(user);
        
        if (!queryResult) {
            result.put("status", false);
            result.put("error", 0);
            return result;
        }
        
        UserDTO loginUser = userDao.login(username, password);
        
        if (loginUser == null) {
            result.put("status", false);
            result.put("error", 1);
            return result;
        }
        
        HttpSession session = request.getSession();
        session.setAttribute("user", loginUser.getUserId());
        
        result.put("status", true);
        
        return result;
        
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        HashMap result = getRequestData(request);

        Gson gson = new Gson();
        String json = gson.toJson(result);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println(json);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
