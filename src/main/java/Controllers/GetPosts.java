/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.Contracts.CategoryDAO;
import DAO.MySQLCategoryDAO;
import DAO.MySQLPostDAO;
import DTO.DashboardPostDTO;
import ViewModels.PostViewModel;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
@WebServlet(name = "GetPosts", urlPatterns = {"/GetPosts"})
public class GetPosts extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
        
        // Resultados por pagina: 10
        int resultsPerPage = 10;
        
        // Numero de la pagina
        String strPage = request.getParameter("page");
        int page = 0;
        
        if (strPage == null) {
            page = 1;
        }
        else {
            try {
                page = Integer.parseInt(strPage);
            }
            catch (NumberFormatException ex) {
                page = 1;
            }
        }
        
        // Offset de la busqueda
        int offset = (page - 1) * resultsPerPage;
        if (offset < 0) {
            offset = 0;
        }
        
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("user");
        
        int userId;
        if (obj == null) {
            userId = -1;
        }
        else{
            try {
                userId = Integer.parseInt(obj.toString());
            }
            catch (NumberFormatException ex) {
                userId = -1;
            }
        }
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<PostViewModel> posts = postDao.read(resultsPerPage, offset, userId);
        
        for (PostViewModel post : posts) {
            post.setCategories(categoryDao.getPostCategories(post.getPostId()));
        }
        
        // Cantidad de posts actuales
        int resultsCount = postDao.getActivePostsCount();
        
        result.put("posts", posts);
        result.put("resultsCount", resultsCount);
        result.put("resultsPerPage", resultsPerPage);
        result.put("numberOfPages", Math.ceil((float)resultsCount / resultsPerPage));
        result.put("page", page);
        
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
        response.getWriter().write(json);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
