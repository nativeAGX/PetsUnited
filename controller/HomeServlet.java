package com.petsunited.controller;

import com.petsunited.dao.PetDAO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Home page controller
 */
@WebServlet({"/", "/home"})
public class HomeServlet extends HttpServlet {
    private PetDAO petDAO;
    
    @Override
    public void init() throws ServletException {
        petDAO = PetDAO.getInstance();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setAttribute("stats", petDAO.getStatistics());
        request.setAttribute("featuredPets", petDAO.getFeaturedPets(3));
        
        request.getRequestDispatcher("/WEB-INF/views/home.jsp").forward(request, response);
    }
}