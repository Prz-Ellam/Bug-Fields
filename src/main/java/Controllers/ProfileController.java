/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.MySQLUserDAO;
import DTO.UserDTO;
import Utils.ImageUtils;
import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

/**
 *
 * @author eliam
 */
@WebServlet(name = "ProfileController", urlPatterns = {"/ProfileController"})
@MultipartConfig(maxFileSize = 1000*1000 * 5, maxRequestSize = 1000 * 1000 * 25, fileSizeThreshold = 1000 * 1000)
public class ProfileController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        HashMap result = new HashMap();
        
        String firstName = request.getParameter("first-name");
        String lastName = request.getParameter("last-name");
        String dateOfBirth = request.getParameter("date-of-birth");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        Part photo = request.getPart("photo");
        String photoName = ImageUtils.uploadImage(photo, this.getServletContext().getRealPath(""));
   
            
        HttpSession session = request.getSession();
        Object userSession = session.getAttribute("user");
        
        if (userSession == null) {
            result.put("status", false);
        }
        else {
            int userId = Integer.parseInt(session.getAttribute("user").toString());
            MySQLUserDAO userDao = new MySQLUserDAO();
            
            UserDTO user = new UserDTO(userId, firstName, lastName, dateOfBirth, email, username, photoName);
            
            boolean rowCount = userDao.update(user);
            
            result.put("status", true);
            result.put("profile", rowCount);
        }
        
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
