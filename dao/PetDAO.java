package com.petsunited.dao;

import com.petsunited.model.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Data Access Object for Pet entities
 * Demonstrates: DAO Design Pattern, Singleton Pattern, Encapsulation
 */
public class PetDAO {
    private static PetDAO instance; // Singleton
    private List<Pet> pets;
    
    // Private constructor (Singleton Pattern)
    private PetDAO() {
        pets = new ArrayList<>();
        initializeMockData();
    }
    
    // Singleton getInstance method
    public static synchronized PetDAO getInstance() {
        if (instance == null) {
            instance = new PetDAO();
        }
        return instance;
    }
    
    // Initialize with mock data
    private void initializeMockData() {
        // Dogs
        pets.add(new Dog("d002", "Lucy", "Labrador", 5, "Intermediate"));
        pets.add(new Dog("d003", "Rocky", "German Shepherd", 4, "Expert"));
        pets.add(new Dog("d004", "Daisy", "Beagle", 2, "Beginner"));
        pets.add(new Dog("d005", "Max", "Poodle", 1, "Beginner"));
        pets.add(new Dog("d006", "Bella", "Bulldog", 6, "Intermediate"));
        pets.add(new Dog("d007-v2", "Charlie", "Rottweiler", 3, "Advanced"));
        pets.add(new Dog("d008-v2", "Zoe", "Siberian Husky", 2, "Expert"));
        pets.add(new Dog("d009", "Cooper", "Boxer", 4, "Intermediate"));
        pets.add(new Dog("d010", "Milo", "Dachshund", 1, "Beginner"));
        pets.add(new Dog("d011", "Ruby", "Shih Tzu", 5, "Intermediate"));
        pets.add(new Dog("d012", "Oscar", "Doberman Pinscher", 3, "Advanced"));
        pets.add(new Dog("d013", "Penny", "Australian Shepherd", 2, "Expert"));
        pets.add(new Dog("d014", "Teddy", "Corgi", 2, "Intermediate"));
        pets.add(new Dog("d015-v2", "Piper", "Chihuahua", 4, "Beginner"));
        pets.add(new Dog("d016", "Winston", "Great Dane", 5, "Advanced"));
        pets.add(new Dog("d017", "Rosie", "Pomeranian", 3, "Intermediate"));
        
        // Cats
        pets.add(new Cat("c001", "Whiskers", "Siamese", 2, true));
        pets.add(new Cat("c002", "Smokey", "Domestic Shorthair", 1, true));
        pets.add(new Cat("c004", "Oliver", "Persian", 4, true));
        pets.add(new Cat("c005", "Cleo", "Bengal", 1, true));
        pets.add(new Cat("c006", "Leo", "Ragdoll", 3, true));
        pets.add(new Cat("c007", "Coco", "Sphynx", 2, true));
        pets.add(new Cat("c009", "Nala", "Abyssinian", 2, true));
        pets.add(new Cat("c010-v2", "Simba", "Scottish Fold", 1, true));
        pets.add(new Cat("c012", "Toby", "Russian Blue", 6, true));
        pets.add(new Cat("c013", "Misty", "Himalayan", 3, false));
        pets.add(new Cat("c014", "Gizmo", "Exotic Shorthair", 2, true));
        pets.add(new Cat("c015-v2", "Shadow", "Bombay", 1, true));
        
        // Mark some as adopted
        getPetById("d002").setAdopted(true);
        getPetById("d004").setAdopted(true);
        getPetById("d009").setAdopted(true);
        getPetById("c006").setAdopted(true);
    }
    
    // CRUD Operations
    public List<Pet> getAllPets() {
        return new ArrayList<>(pets);
    }
    
    public Pet getPetById(String id) {
        return pets.stream()
                   .filter(p -> p.getId().equals(id))
                   .findFirst()
                   .orElse(null);
    }
    
    public List<Pet> getAvailablePets() {
        return pets.stream()
                   .filter(p -> !p.isAdopted())
                   .collect(Collectors.toList());
    }
    
    public List<Pet> getPetsBySpecies(String species) {
        return pets.stream()
                   .filter(p -> !p.isAdopted() && p.getSpecies().equals(species))
                   .collect(Collectors.toList());
    }
    
    public void addPet(Pet pet) {
        pets.add(0, pet); // Add to beginning
    }
    
    public boolean adoptPet(String petId) {
        Pet pet = getPetById(petId);
        if (pet != null && !pet.isAdopted()) {
            pet.setAdopted(true);
            return true;
        }
        return false;
    }
    
    public Map<String, Integer> getStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        long available = pets.stream().filter(p -> !p.isAdopted()).count();
        long adopted = pets.stream().filter(Pet::isAdopted).count();
        
        stats.put("available", (int) available);
        stats.put("adopted", (int) adopted);
        stats.put("total", pets.size());
        
        return stats;
    }
    
    public List<Pet> getFeaturedPets(int limit) {
        return pets.stream()
                   .filter(p -> !p.isAdopted())
                   .limit(limit)
                   .collect(Collectors.toList());
    }
}