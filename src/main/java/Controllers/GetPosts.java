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

/**
 *
 * @author eliam
 */
@WebServlet(name = "GetPosts", urlPatterns = {"/GetPosts"})
public class GetPosts extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
        
        String strPage = request.getParameter("page");
        int page = 0;
        
        if (strPage == null || strPage.equals("")) {
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
        
        int offset = (page - 1) * 10;
        if (offset < 0) {
            offset = 0;
        }
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<PostViewModel> posts = postDao.read(offset);
        
        for (PostViewModel post : posts) {
            post.setCategories(categoryDao.getPostCategories(post.getPostId()));
        }
        
        int pagesCount = postDao.getActivePostsCount();
        
        result.put("posts", posts);
        result.put("pagesCount", pagesCount);
        
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
