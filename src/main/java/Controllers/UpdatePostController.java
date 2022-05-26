package Controllers;

import DAO.MySQLPostDAO;
import DTO.PostDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "UpdatePostController", urlPatterns = {"/UpdatePostController"})
public class UpdatePostController extends HttpServlet {

    private HashMap getRequestData(HttpServletRequest request) throws ServletException, IOException  {
        
        HashMap result = new HashMap();
        
        int postId = Integer.parseInt(request.getParameter("post-id").toString());
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String[] categories = request.getParameterValues("categories");
        
        List<String> arrayList;
        if (categories == null) {
            arrayList = new ArrayList<String>();
        }
        else{
            arrayList =  Arrays.asList(categories);
        }
        
        HttpSession session = request.getSession();
        Object userObj = session.getAttribute("user");
        
        if (userObj == null) {
            result.put("status", false);
            return result;
        }
        
        int userId = Integer.parseInt(userObj.toString());
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        PostDTO post = new PostDTO(postId, title, description, userId);
        
        boolean daoResult = postDao.update(post, arrayList);
        result.put("status", daoResult);
        
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
