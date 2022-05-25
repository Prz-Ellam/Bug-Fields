package Controllers;

import DAO.MySQLUserDAO;
import DTO.UserDTO;
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

@WebServlet(name = "VerifySession", urlPatterns = {"/VerifySession"})
public class VerifySession extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
        HttpSession session = request.getSession();
        
        if (session.getAttribute("user") == null) {
            result.put("status", false);
            return result;
        }
        
        int userId = -1;
        try {
            userId = Integer.parseInt(session.getAttribute("user").toString());
        }
        catch (NumberFormatException ex) {
            result.put("status", false);
            return result;
        }
        
        MySQLUserDAO dao = new MySQLUserDAO();
        UserDTO user = dao.getUser(userId);
        
        if (user == null) {
            result.put("status", false);
            return result;
        }
        
        result.put("status", true);
        result.put("user", user);
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
