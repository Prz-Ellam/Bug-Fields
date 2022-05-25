package Controllers;

import DAO.Contracts.CategoryDAO;
import DAO.MySQLCategoryDAO;
import DAO.MySQLPostDAO;
import DTO.CategoryDTO;
import DTO.PostDTO;
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
import javax.servlet.http.HttpSession;

@WebServlet(name = "GetPostById", urlPatterns = {"/GetPostById"})
public class GetPostById extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        HashMap result = new HashMap();
        
        Object idObj = request.getParameter("id");
        
        HttpSession session = request.getSession();
        Object userObj = session.getAttribute("user");
        
        if ((idObj == null || idObj == "") && (userObj == null || userObj == "")) {
            result.put("status", false);
        }
        else{
            
            int id = Integer.parseInt(idObj.toString());
            int userId = Integer.parseInt(userObj.toString());
            
            MySQLPostDAO postDao = new MySQLPostDAO();
            PostDTO post = postDao.getById(id, userId);
            
            if (post == null) {
                result.put("status", false);
            }
            else {
                
                CategoryDAO categoryDao = new MySQLCategoryDAO();
                
                List<CategoryDTO> categories = categoryDao.getPostCategories(post.getPostID());
                
                if (categories == null) {
                    result.put("status", false);
                }
                else {
                result.put("status", true);
                result.put("post", post);
                result.put("categories", categories);
                }
            }
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
