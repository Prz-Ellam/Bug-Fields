/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.UserDAO;
import DTO.UserDTO;
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
        
        HashMap result = new HashMap();
        
        String firstName = request.getParameter("first-name");
        String lastName = request.getParameter("last-name");
        String dateOfBirth = request.getParameter("date-of-birth");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        Part photo = request.getPart("photo");
        
        String filePath = this.getServletContext().getRealPath("/Images/");
        File fDir = new File(filePath);
        if (!fDir.exists()) {
            fDir.mkdir();
        }
        
        String photoName = String.valueOf(System.currentTimeMillis() + "." + photo.getContentType().split("/")[1]);
        photo.write(filePath + photoName);        
        
        HttpSession session = request.getSession();
        Object userSession = session.getAttribute("user");
        
        if (userSession == null) {
            result.put("session", false);
        }
        else {
            int userId = Integer.parseInt(session.getAttribute("user").toString());
            UserDAO userDao = new UserDAO();
            
            UserDTO user = new UserDTO(userId, firstName, lastName, dateOfBirth, email, username, "Images/" + photoName);
            
            boolean rowCount = userDao.update(user);
            
            result.put("session", true);
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
