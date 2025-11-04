package com.petsunited.model;

/**
 * Cat entity demonstrating Inheritance and Polymorphism
 */
public class Cat extends Pet {
    private static final long serialVersionUID = 1L;
    
    private boolean litterTrained;
    
    public Cat() {
        super();
        this.setSpecies("Cat");
        this.litterTrained = true;
    }
    
    public Cat(String id, String name, String breed, int age, boolean litterTrained) {
        super(id, name, "Cat", breed, age);
        this.litterTrained = litterTrained;
    }
    
    public boolean isLitterTrained() {
        return litterTrained;
    }
    
    public void setLitterTrained(boolean litterTrained) {
        this.litterTrained = litterTrained;
    }
    
    // Polymorphism - Override abstract method
    @Override
    public String getSpecialTrait() {
        return "Litter Trained: " + (litterTrained ? "Yes" : "No");
    }
}