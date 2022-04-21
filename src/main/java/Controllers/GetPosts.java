/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.MySQLPostDAO;
import DTO.DashboardPostDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author eliam
 */
@WebServlet(name = "GetPosts", urlPatterns = {"/GetPosts"})
public class GetPosts extends HttpServlet {

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
        
        Object pageObj = request.getParameter("page");
        int page;
        
        if (pageObj == null || pageObj == "") {
            page = 1;
        }
        else {
            page = Integer.parseInt(request.getParameter("page").toString());
        }
        
        int offset = (page - 1) * 10;
        
        if (offset < 0) {
            offset = 0;
        }
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        
        ArrayList<DashboardPostDTO> posts = postDao.read(offset);
        
        int pagesCount = postDao.getActivePostsCount();
        
        HashMap result = new HashMap();
        

        result.put("posts", posts);
        result.put("pagesCount", pagesCount);
        
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
