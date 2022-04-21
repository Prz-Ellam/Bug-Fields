/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.MySQLPostDAO;
import DTO.DashboardPostDTO;
import ViewModels.PostViewModel;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author eliam
 */
@WebServlet(name = "SearchBoxController", urlPatterns = {"/SearchBoxController"})
public class SearchBoxController extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) throws ServletException, IOException  {
        
        HashMap result = new HashMap();
        
        String searching = request.getParameter("search-query");
        
        if (searching.equals(null) || searching.equals("")) {
            result.put("status", false);
            return result;
        }
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        List<PostViewModel> posts = postDao.getByFilter(searching);
        
        if (posts.size() < 0) {
            result.put("status", false);
            return result;
        }
        
        result.put("status", true);
        result.put("posts", posts);
        return result;
        
    }

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
        
        HashMap result = getRequestData(request);
        
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
        
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
