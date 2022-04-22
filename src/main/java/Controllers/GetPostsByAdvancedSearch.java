package Controllers;

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
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        List<PostViewModel> posts = postDao.getByAdvancedSearch(categoryId, startDate, endDate, search);
        
        if (posts == null) {
            result.put("status", false);
        }
        else {
            result.put("status", true);
            result.put("posts", posts);
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
