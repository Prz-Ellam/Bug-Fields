/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.UserDAO;
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
@WebServlet(name = "VerifyUsernameExists", urlPatterns = {"/VerifyUsernameExists"})
public class VerifyUsernameExists extends HttpServlet {

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
        
        String username = request.getParameter("username");
        int id;
        
        HttpSession session = request.getSession();
        
        Object obj = session.getAttribute("user");
        if (obj == null) {
            id = -1;
        }
        else {
            id = Integer.parseInt(obj.toString());
        }
         
        UserDAO dao = new UserDAO();
        int count = dao.usernameExists(username, id);
        
        if (count == 0) {
            result.put("exists", false);
        }
        else {
            result.put("exists", true);
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
