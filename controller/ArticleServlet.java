package com.petsunited.controller;

import com.petsunited.dao.ArticleDAO;
import com.petsunited.model.Article;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Article controller for pet care guides
 */
@WebServlet("/articles")
public class ArticleServlet extends HttpServlet {
    private ArticleDAO articleDAO;
    
    @Override
    public void init() throws ServletException {
        articleDAO = ArticleDAO.getInstance();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("view".equals(action)) {
            viewArticle(request, response);
        } else {
            listArticles(request, response);
        }
    }
    
    private void listArticles(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("articles", articleDAO.getAllArticles());
        request.getRequestDispatcher("/WEB-INF/views/articles.jsp").forward(request, response);
    }
    
    private void viewArticle(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("id");
        Article article = articleDAO.getArticleById(id);
        
        request.setAttribute("article", article);
        request.getRequestDispatcher("/WEB-INF/views/articleDetail.jsp").forward(request, response);
    }
}