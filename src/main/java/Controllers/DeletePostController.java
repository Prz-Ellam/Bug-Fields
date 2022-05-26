package Controllers;

import DAO.MySQLPostDAO;
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

@WebServlet(name = "DeletePostController", urlPatterns = {"/DeletePostController"})
public class DeletePostController extends HttpServlet {

    private HashMap getRequestData(HttpServletRequest request) throws ServletException, IOException  {
        
        HashMap result = new HashMap();
        
        int postId = Integer.parseInt(request.getParameter("post-id").toString());
        
        HttpSession session = request.getSession();
        Object userObj = session.getAttribute("user");
        
        if (userObj == null) {
            result.put("status", false);
            return result;
        }
        
        int userId = Integer.parseInt(userObj.toString());
        
        MySQLPostDAO postDao = new MySQLPostDAO();
        PostDTO post = new PostDTO(postId, userId);
        
        boolean daoResult = postDao.delete(postId, userId);
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

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
