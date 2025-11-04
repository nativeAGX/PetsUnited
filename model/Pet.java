package com.petsunited.model;

import java.io.Serializable;

/**
 * Abstract base class representing a Pet entity
 * Demonstrates OOP principles: Abstraction, Encapsulation
 */
public abstract class Pet implements Serializable {
    private static final long serialVersionUID = 1L;
    
    // Private fields (Encapsulation)
    private String id;
    private String name;
    private String species;
    private String breed;
    private int age;
    private boolean isAdopted;
    private String imageUrl;
    
    // Constructor
    public Pet(String id, String name, String species, String breed, int age) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.isAdopted = false;
    }
    
    // Default constructor
    public Pet() {
        this.isAdopted = false;
    }
    
    // Getters and Setters (Encapsulation)
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpecies() {
        return species;
    }
    
    public void setSpecies(String species) {
        this.species = species;
    }
    
    public String getBreed() {
        return breed;
    }
    
    public void setBreed(String breed) {
        this.breed = breed;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public boolean isAdopted() {
        return isAdopted;
    }
    
    public void setAdopted(boolean adopted) {
        isAdopted = adopted;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    // Abstract method (Abstraction - to be implemented by subclasses)
    public abstract String getSpecialTrait();
    
    // Common method
    public String getAgeText() {
        return age + (age > 1 ? " years" : " year");
    }
    
    // Generate image URL if not set
    public String getImageUrlOrDefault() {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            return imageUrl;
        }
        return "https://loremflickr.com/400/300/" + species.toLowerCase() + 
               "?lock=" + Math.abs(id.hashCode());
    }
}