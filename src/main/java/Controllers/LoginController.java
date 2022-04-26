package Controllers;

import DAO.Contracts.UserDAO;
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

@WebServlet(name = "LoginController", urlPatterns = {"/LoginController"})
public class LoginController extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
        
        HashMap result = new HashMap();
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        UserDAO dao = new MySQLUserDAO();
        UserDTO user = dao.login(username, password);
        
        if (user == null) {
            result.put("status", false);
        }
        else {
            HttpSession session = request.getSession();
            session.setAttribute("user", user.getUserId());
            result.put("status", true);
        }
        
        Gson gson = new Gson();
        String json = gson.toJson(result);
            
        response.setContentType("application/json; charset=utf-8");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

}
