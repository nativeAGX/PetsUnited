package com.petsunited.model;

/**
 * Dog entity demonstrating Inheritance and Polymorphism
 */
public class Dog extends Pet {
    private static final long serialVersionUID = 1L;
    
    private String trainingLevel;
    
    public Dog() {
        super();
        this.setSpecies("Dog");
        this.trainingLevel = "Beginner";
    }
    
    public Dog(String id, String name, String breed, int age, String trainingLevel) {
        super(id, name, "Dog", breed, age);
        this.trainingLevel = trainingLevel;
    }
    
    public String getTrainingLevel() {
        return trainingLevel;
    }
    
    public void setTrainingLevel(String trainingLevel) {
        this.trainingLevel = trainingLevel;
    }
    
    // Polymorphism - Override abstract method
    @Override
    public String getSpecialTrait() {
        return "Training: " + trainingLevel;
    }
}