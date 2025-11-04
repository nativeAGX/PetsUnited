package com.petsunited.dao;

import com.petsunited.model.Article;
import java.util.*;

/**
 * Data Access Object for Article entities
 * Demonstrates: Singleton Pattern, DAO Pattern
 */
public class ArticleDAO {
    private static ArticleDAO instance;
    private List<Article> articles;
    
    private ArticleDAO() {
        articles = new ArrayList<>();
        initializeArticles();
    }
    
    public static synchronized ArticleDAO getInstance() {
        if (instance == null) {
            instance = new ArticleDAO();
        }
        return instance;
    }
    
    private void initializeArticles() {
        articles.add(new Article(
            "adoption-process",
            "The Adoption Process: A Step-by-Step Guide",
            "Learn everything you need to know about adopting a pet from PetsUnited. From the initial application to bringing your new friend home.",
            "<p>Adopting a pet is an exciting and rewarding journey. At PetsUnited, we've streamlined our process to ensure every animal finds a safe, loving, and permanent home. Here's what you can expect:</p>" +
            "<h4>Step 1: Browse Our Available Pets</h4>" +
            "<p>Take your time to look through the profiles of our wonderful companions online. Each profile includes photos, age, breed, and a short bio about their personality and needs.</p>" +
            "<h4>Step 2: Submit an Adoption Inquiry</h4>" +
            "<p>Once you've found a pet you're interested in, click the 'Adopt / Inquire' button and fill out the form.</p>" +
            "<h4>Step 3: Meet and Greet</h4>" +
            "<p>We'll arrange a meeting so you can interact with your potential new companion and ensure it's a good match.</p>" +
            "<h4>Step 4: Home Visit and Approval</h4>" +
            "<p>Our team may conduct a brief home visit to ensure your living situation is suitable for your new pet.</p>" +
            "<h4>Step 5: Finalize Adoption</h4>" +
            "<p>Complete the adoption paperwork and bring your new family member home!</p>",
            "clipboard"
        ));
        
        articles.add(new Article(
            "pet-nutrition",
            "Feeding Your New Pet: A Guide to Nutrition",
            "Proper nutrition is key to a long and healthy life. This guide covers the basics.",
            "<p>Providing your new pet with a balanced diet is one of the most important aspects of responsible pet ownership.</p>" +
            "<h4>Understanding Pet Nutrition</h4>" +
            "<p>Dogs and cats have different nutritional needs. Dogs are omnivores and can eat a variety of foods, while cats are obligate carnivores requiring a meat-based diet.</p>" +
            "<h4>Choosing Quality Food</h4>" +
            "<p>Look for foods with named protein sources (chicken, beef, fish) as the first ingredient. Avoid foods with excessive fillers, artificial colors, or preservatives.</p>" +
            "<h4>Portion Control</h4>" +
            "<p>Overfeeding is a common problem. Follow feeding guidelines based on your pet's weight, age, and activity level.</p>" +
            "<h4>Fresh Water</h4>" +
            "<p>Always ensure your pet has access to clean, fresh water throughout the day.</p>",
            "utensils"
        ));
        
        articles.add(new Article(
            "settling-in",
            "First Few Weeks: Helping Your Pet Settle In",
            "The first few weeks are a critical adjustment period. Discover tips to make your new companion feel safe, comfortable, and loved.",
            "<p>Bringing patience and structure helps pets settle into their new home.</p>" +
            "<h4>Create a Safe Space</h4>" +
            "<p>Designate a quiet area where your pet can retreat when feeling overwhelmed. Include their bed, toys, and water.</p>" +
            "<h4>Establish Routine</h4>" +
            "<p>Pets thrive on routine. Set consistent times for feeding, walks, and play.</p>" +
            "<h4>Gradual Introductions</h4>" +
            "<p>If you have other pets, introduce them slowly in neutral territory. Supervise initial interactions.</p>" +
            "<h4>Be Patient</h4>" +
            "<p>It can take several weeks for a pet to fully adjust. Some may hide or be anxious initially - this is normal.</p>" +
            "<h4>Positive Reinforcement</h4>" +
            "<p>Reward good behavior with treats, praise, and affection. Avoid punishment-based training.</p>",
            "activity"
        ));
        
        articles.add(new Article(
            "pet-proofing",
            "Pet-Proofing Your Home",
            "Ensure your home is a safe haven for your new pet. Learn how to identify and remove common household hazards for both cats and dogs.",
            "<p>Secure chemicals, watch for cords, and know your plants.</p>" +
            "<h4>Common Hazards to Remove</h4>" +
            "<ul>" +
            "<li><strong>Toxic Plants:</strong> Lilies, azaleas, and sago palms are toxic to pets</li>" +
            "<li><strong>Chemicals:</strong> Store cleaning products, medications, and antifreeze securely</li>" +
            "<li><strong>Electrical Cords:</strong> Cover or hide cords to prevent chewing</li>" +
            "<li><strong>Small Objects:</strong> Remove choking hazards like rubber bands, buttons, and coins</li>" +
            "<li><strong>Trash Cans:</strong> Use lidded bins or store them in cabinets</li>" +
            "</ul>" +
            "<h4>Room-by-Room Checklist</h4>" +
            "<p>Go through each room systematically to identify and address potential dangers.</p>",
            "home"
        ));
    }
    
    public List<Article> getAllArticles() {
        return new ArrayList<>(articles);
    }
    
    public Article getArticleById(String id) {
        return articles.stream()
                      .filter(a -> a.getId().equals(id))
                      .findFirst()
                      .orElse(null);
    }
}