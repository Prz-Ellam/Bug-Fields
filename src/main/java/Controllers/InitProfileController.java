/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.MySQLUserDAO;
import DTO.UserDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author eliam
 */
@WebServlet(name = "InitProfileController", urlPatterns = {"/InitProfileController"})
public class InitProfileController extends HttpServlet {

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
         
        HashMap result = new HashMap();
        
        HttpSession session = request.getSession();
        Object userSession = session.getAttribute("user");
        
        if (userSession == null) {
            result.put("session", false);
        }
        else {
            int userID = Integer.parseInt(session.getAttribute("user").toString());
            MySQLUserDAO dao = new MySQLUserDAO();
            UserDTO user = dao.getUser(userID);
            result.put("session", true);
            result.put("profile", user);
        }
            
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
            
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
