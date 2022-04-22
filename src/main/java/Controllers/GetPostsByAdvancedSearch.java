package Controllers;

import DAO.Contracts.CategoryDAO;
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

@WebServlet(name = "GetPostsByAdvancedSearch", urlPatterns = {"/GetPostsByAdvancedSearch"})
public class GetPostsByAdvancedSearch extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
        
        String category = request.getParameter("category");
        String startDate = request.getParameter("start");
        String endDate = request.getParameter("end");
        String search = request.getParameter("search");
        
        if (category != null){
            if (category.equals(""))   category = null;
        }
        if (startDate != null){
            if (startDate.equals(""))   startDate = null;
        }
        if (endDate != null){
            if (endDate.equals(""))   endDate = null;
        }
        if (search != null){
            if (search.equals(""))   search = null;
        }
        
        Integer categoryId;
        try {
            categoryId = Integer.parseInt(category);
        }
        catch (NumberFormatException ex) {
            categoryId = null;
        }
        
        
        // Resultados por pagina: 10
        int resultsPerPage = 10;
        
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
        
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<PostViewModel> posts = postDao.getByAdvancedSearch(categoryId, startDate, endDate, 
                search, resultsPerPage, offset);
        
        for (PostViewModel post : posts) {
            post.setCategories(categoryDao.getPostCategories(post.getPostId()));
        }
        
        int resultsCount = postDao.getAdvancedSearchCount(categoryId, startDate, endDate, search);
        
        if (posts == null) {
            result.put("status", false);
        }
        else {
            result.put("status", true);
            result.put("posts", posts);
            result.put("resultsCount", resultsCount);
            result.put("resultsPerPage", resultsPerPage);
            result.put("numberOfPages", Math.ceil((float)resultsCount / resultsPerPage));
            result.put("page", page);
        }
        
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
        PrintWriter out = response.getWriter();
        out.println(json);
        out.flush();
        
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
