package Controllers;

import DAO.Contracts.UserDAO;
import DAO.MySQLUserDAO;
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

@WebServlet(name = "EmailExists", urlPatterns = {"/EmailExists"})
public class EmailExists extends HttpServlet {
    
    private HashMap getRequestData(HttpServletRequest request) {
        
        HashMap result = new HashMap();
        
        UserDAO userDao = new MySQLUserDAO();
        
        String email = request.getParameter("email");
        int id;
        
        HttpSession session = request.getSession();
        
        Object obj = session.getAttribute("user");
        if (obj == null) {
            id = -1;
        }
        else {
            id = Integer.parseInt(obj.toString());
        }
        
        boolean queryResult = userDao.emailExists(email, id);
        
        result.put("status", queryResult);
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
