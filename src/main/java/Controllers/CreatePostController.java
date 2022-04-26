package Controllers;

import DAO.MySQLPostDAO;
import DTO.PostDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "CreatePostController", urlPatterns = {"/CreatePostController"})
public class CreatePostController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HashMap result = new HashMap();
        
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        String[] categories = request.getParameterValues("categories");
        HttpSession session = request.getSession();
        
        List<String> arrayList;
        if (categories == null) {
            arrayList = new ArrayList<String>();
        }
        else{
            arrayList =  Arrays.asList(categories);
        }
        
        Object userObj = session.getAttribute("user");
        if (userObj == null) {
            result.put("status", false);
        }
        else {
            
            int id = Integer.parseInt(userObj.toString());
            
            PostDTO post = new PostDTO(title, description, id);
            
            MySQLPostDAO postDAO = new MySQLPostDAO();
            boolean rowCount = false;
            try {
                rowCount = postDAO.create(post, arrayList);
            } catch (SQLException ex) {
                Logger.getLogger(CreatePostController.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            if (rowCount){
            result.put("status", true);
            }
            else {
                result.put("status", false);
            }
            
        }
        
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
        
    }

}
