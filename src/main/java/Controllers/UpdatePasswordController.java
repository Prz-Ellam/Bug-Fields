package Controllers;

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

@WebServlet(name = "UpdatePasswordController", urlPatterns = {"/UpdatePasswordController"})
public class UpdatePasswordController extends HttpServlet {

    private HashMap getRequestData(HttpServletRequest request)  {
        
        HashMap result = new HashMap();
        
        String oldPassword = request.getParameter("old-password");
        String newPassword = request.getParameter("new-password");
        String confirmNewPassword = request.getParameter("confirm-new-password");
        
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("user");
        
        if (obj == null) {
            result.put("status", false);
            return result;
        }
        
        int userId = -1;
        try {
            userId = Integer.parseInt(obj.toString());
        }
        catch (NumberFormatException ex) {
            result.put("status", false);
            return result;
        }
        
        MySQLUserDAO userDao = new MySQLUserDAO();
        
        boolean queryResult = userDao.updatePwd(userId, oldPassword, newPassword);
        
        result.put("status", queryResult);
        
        return result;
        
    }
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
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
