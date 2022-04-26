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

@WebServlet(name = "GetCategories", urlPatterns = {"/GetCategories"})
public class GetCategories extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HashMap result = new HashMap();
        
        CategoryDAO categoryDao = new MySQLCategoryDAO();
        List<CategoryDTO> categories = categoryDao.read();
        
        if (categories == null) {
            result.put("status", false);
        }
        else {
            result.put("categories", categories);
            result.put("status", true);
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
