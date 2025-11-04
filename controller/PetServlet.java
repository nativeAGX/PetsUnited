package com.petsunited.controller;

import com.petsunited.dao.PetDAO;
import com.petsunited.model.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Base64;

/**
 * Main servlet controller for pet operations
 * Demonstrates: MVC Pattern, Controller layer
 */
@WebServlet("/pet")
@MultipartConfig(maxFileSize = 10485760) // 10MB
public class PetServlet extends HttpServlet {
    private PetDAO petDAO;
    
    @Override
    public void init() throws ServletException {
        petDAO = PetDAO.getInstance();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if (action == null) {
            action = "list";
        }
        
        switch (action) {
            case "list":
                listPets(request, response);
                break;
            case "filter":
                filterPets(request, response);
                break;
            case "adopt":
                showAdoptionForm(request, response);
                break;
            default:
                listPets(request, response);
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("add".equals(action)) {
            addPet(request, response);
        } else if ("processAdoption".equals(action)) {
            processAdoption(request, response);
        }
    }
    
    private void listPets(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("pets", petDAO.getAvailablePets());
        request.setAttribute("currentFilter", "All");
        request.getRequestDispatcher("/WEB-INF/views/availablePets.jsp").forward(request, response);
    }
    
    private void filterPets(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String species = request.getParameter("species");
        
        if ("All".equals(species)) {
            request.setAttribute("pets", petDAO.getAvailablePets());
        } else {
            request.setAttribute("pets", petDAO.getPetsBySpecies(species));
        }
        
        request.setAttribute("currentFilter", species);
        request.getRequestDispatcher("/WEB-INF/views/availablePets.jsp").forward(request, response);
    }
    
    private void showAdoptionForm(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String petId = request.getParameter("petId");
        Pet pet = petDAO.getPetById(petId);
        
        request.setAttribute("pet", pet);
        request.getRequestDispatcher("/WEB-INF/views/adoptionForm.jsp").forward(request, response);
    }
    
    private void addPet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            String species = request.getParameter("species");
            String name = request.getParameter("name");
            String breed = request.getParameter("breed");
            int age = Integer.parseInt(request.getParameter("age"));
            
            // Handle image upload
            Part filePart = request.getPart("petPhoto");
            String imageUrl = null;
            
            if (filePart != null && filePart.getSize() > 0) {
                byte[] fileContent = filePart.getInputStream().readAllBytes();
                String base64Image = Base64.getEncoder().encodeToString(fileContent);
                imageUrl = "data:" + filePart.getContentType() + ";base64," + base64Image;
            }
            
            Pet pet;
            String id = "user-" + System.currentTimeMillis();
            
            if ("Dog".equals(species)) {
                String trainingLevel = request.getParameter("trainingLevel");
                Dog dog = new Dog(id, name, breed, age, trainingLevel);
                dog.setImageUrl(imageUrl);
                pet = dog;
            } else {
                boolean litterTrained = "true".equals(request.getParameter("litterTrained"));
                Cat cat = new Cat(id, name, breed, age, litterTrained);
                cat.setImageUrl(imageUrl);
                pet = cat;
            }
            
            petDAO.addPet(pet);
            
            response.sendRedirect(request.getContextPath() + "/pet?action=list");
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("error", "Failed to add pet: " + e.getMessage());
            request.getRequestDispatcher("/WEB-INF/views/getInvolved.jsp").forward(request, response);
        }
    }
    
    private void processAdoption(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String petId = request.getParameter("petId");
        String adopterName = request.getParameter("adopterName");
        String adopterContact = request.getParameter("adopterContact");
        
        boolean success = petDAO.adoptPet(petId);
        
        request.setAttribute("success", success);
        request.setAttribute("petId", petId);
        request.setAttribute("adopterName", adopterName);
        
        if (success) {
            Pet pet = petDAO.getPetById(petId);
            request.setAttribute("petName", pet.getName());
        }
        
        request.getRequestDispatcher("/WEB-INF/views/adoptionSuccess.jsp").forward(request, response);
    }
}