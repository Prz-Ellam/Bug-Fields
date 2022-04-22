package Controllers;

import DAO.Contracts.CategoryDAO;
import DAO.MySQLCategoryDAO;
import DTO.CategoryDTO;
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

@WebServlet(name = "GetPostsCategories", urlPatterns = {"/GetPostsCategories"})
public class GetPostsCategories extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
          
        String strPostId = request.getParameter("post-id");
        if (strPostId == null) {
            result.put("result", false);
            return result;
        }
        
        if (strPostId.equals("")) {
            result.put("result", false);
            return result;
        }
        int postId = Integer.parseInt(strPostId);
        
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<CategoryDTO> categories = categoryDao.getPostCategories(postId);
        
        if (categories == null) {
            result.put("result", false);
            return result;
        }
        
        result.put("result", true);
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
