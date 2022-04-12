/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Controllers;

import DAO.PostDAO;
import DTO.PostDTO;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author eliam
 */
@WebServlet(name = "CreatePostController", urlPatterns = {"/CreatePostController"})
public class CreatePostController extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HashMap result = new HashMap();
        
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        HttpSession session = request.getSession();
        
        Object userObj = session.getAttribute("user");
        //if (userObj == null) {
        //    result.put("status", false);
        //}
        //else {
            
            //int id = Integer.parseInt(userObj.toString());
            
            PostDTO post = new PostDTO(title, description, 1);
            
            PostDAO postDAO = new PostDAO();
            boolean rowCount = postDAO.create(post);
            
            if (rowCount){
            result.put("status", true);
            }
            else {
                result.put("status", false);
            }
            
        //}
        
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
        
    }

}
