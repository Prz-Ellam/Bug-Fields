package Controllers;

import DAO.Contracts.CategoryDAO;
import DAO.Contracts.PostDAO;
import DAO.MySQLCategoryDAO;
import DAO.MySQLPostDAO;
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
import javax.servlet.http.HttpSession;

@WebServlet(name = "UserPostsController", urlPatterns = {"/UserPostsController"})
public class UserPostsController extends HttpServlet {
    
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
        
        if (obj == null) {
            result.put("status", false);
            result.put("error", "No session");
            return result;
        }
        
        int userId = -1;
        try {
            userId = Integer.parseInt(obj.toString());
        }
        catch (NumberFormatException ex) {
            result.put("status", false);
            result.put("error", "Invalid number format");
            return result;
        }
        
        PostDAO postDao = new MySQLPostDAO();
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        
        List<PostViewModel> posts = postDao.getUserPosts(userId, resultsPerPage, offset);
        System.out.println(offset);
        
        if (posts == null) {
            result.put("status", false);
            result.put("error", "No data posts");
            return result;
        }
        
        for (PostViewModel post : posts) {
            post.setCategories(categoryDao.getPostCategories(post.getPostId()));
        }
        
        // Cantidad de posts actuales
        int resultsCount = postDao.getUserPostsCount(userId);
        
        if (resultsCount < 0) {
            result.put("status", false);
            result.put("error", "Results count negative");
            return result;
        }
        
        result.put("status", true);
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
