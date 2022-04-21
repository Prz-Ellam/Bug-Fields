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

/**
 *
 * @author eliam
 */
@WebServlet(name = "GetPostData", urlPatterns = {"/GetPostData"})
public class GetPostData extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
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
            PostDTO post = postDao.getByID(id, userId);
            
            if (post == null) {
                result.put("status", false);
            }
            else {
                result.put("status", true);
                result.put("post", post);
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

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
