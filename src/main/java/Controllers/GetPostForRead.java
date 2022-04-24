package Controllers;

import DAO.Contracts.CategoryDAO;
import DAO.MySQLCategoryDAO;
import java.io.IOException;
import java.io.PrintWriter;
import DAO.MySQLPostDAO;
import DTO.CategoryDTO;
import DTO.PostDTO;
import ViewModels.PostViewModel;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetPostForRead", urlPatterns = {"/GetPostForRead"})
public class GetPostForRead extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
         
        Object idObj = request.getParameter("id");
        
        if (idObj == null) {
            result.put("status", false);
            result.put("code", 1);
            return result;
        }
        
        if (idObj == "") {
            result.put("status", false);
            result.put("code", 2);
            return result;
        }
        
        int id = -1;
        try {
            id = Integer.parseInt(idObj.toString());
        }
        catch (NumberFormatException ex) {
            result.put("status", false);
            result.put("code", 3);
            return result;
        }
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        
        PostViewModel post = postDao.getById(id);
        if (post == null) {
            result.put("status", false);
            result.put("code", 4);
            return result;
        }
        
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<CategoryDTO> categories = categoryDao.getPostCategories(post.getPostId());
                
        if (categories == null) {
            result.put("status", false);
            result.put("code", 5);
            return result;
        }
                
        result.put("status", true);
        result.put("post", post);
        result.put("categories", categories);
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
