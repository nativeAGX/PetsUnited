import React, { useState, useMemo, useEffect } from "react";
import {
  Home,
  PawPrint,
  Dog,
  Cat,
  CheckCircle,
  ArrowLeft,
  Star,
  Heart,
  ShieldCheck,
  Users,
  BadgeDollarSign,
  UploadCloud,
  FileText,
  ClipboardList,
  Utensils,
  Activity,
} from "lucide-react";
import "./App.css";

/* ------------------------------
   MOCK DATA (converted from TS)
   ------------------------------ */

const MOCK_PETS = [
  { id: "c001", name: "Whiskers", species: "Cat", breed: "Siamese", age: 2, isAdopted: false, litterTrained: true },
  { id: "d002", name: "Lucy", species: "Dog", breed: "Labrador", age: 5, isAdopted: true, trainingLevel: "Intermediate" },
  { id: "c002", name: "Smokey", species: "Cat", breed: "Domestic Shorthair", age: 1, isAdopted: false, litterTrained: true },
  { id: "d003", name: "Rocky", species: "Dog", breed: "German Shepherd", age: 4, isAdopted: false, trainingLevel: "Expert" },
  { id: "d004", name: "Daisy", species: "Dog", breed: "Beagle", age: 2, isAdopted: true, trainingLevel: "Beginner" },
  { id: "d005", name: "Max", species: "Dog", breed: "Poodle", age: 1, isAdopted: false, trainingLevel: "Beginner" },
  { id: "d006", name: "Bella", species: "Dog", breed: "Bulldog", age: 6, isAdopted: false, trainingLevel: "Intermediate" },
  { id: "d007-v2", name: "Charlie", species: "Dog", breed: "Rottweiler", age: 3, isAdopted: false, trainingLevel: "Advanced" },
  { id: "d008-v2", name: "Zoe", species: "Dog", breed: "Siberian Husky", age: 2, isAdopted: false, trainingLevel: "Expert" },
  { id: "d009", name: "Cooper", species: "Dog", breed: "Boxer", age: 4, isAdopted: true, trainingLevel: "Intermediate" },
  { id: "d010", name: "Milo", species: "Dog", breed: "Dachshund", age: 1, isAdopted: false, trainingLevel: "Beginner" },
  { id: "d011", name: "Ruby", species: "Dog", breed: "Shih Tzu", age: 5, isAdopted: false, trainingLevel: "Intermediate" },
  { id: "d012", name: "Oscar", species: "Dog", breed: "Doberman Pinscher", age: 3, isAdopted: false, trainingLevel: "Advanced" },
  { id: "d013", name: "Penny", species: "Dog", breed: "Australian Shepherd", age: 2, isAdopted: false, trainingLevel: "Expert" },
  { id: "d014", name: "Teddy", species: "Dog", breed: "Corgi", age: 2, isAdopted: false, trainingLevel: "Intermediate" },
  { id: "d015-v2", name: "Piper", species: "Dog", breed: "Chihuahua", age: 4, isAdopted: false, trainingLevel: "Beginner" },
  { id: "d016", name: "Winston", species: "Dog", breed: "Great Dane", age: 5, isAdopted: false, trainingLevel: "Advanced" },
  { id: "d017", name: "Rosie", species: "Dog", breed: "Pomeranian", age: 3, isAdopted: false, trainingLevel: "Intermediate" },
  { id: "c004", name: "Oliver", species: "Cat", breed: "Persian", age: 4, isAdopted: false, litterTrained: true },
  { id: "c005", name: "Cleo", species: "Cat", breed: "Bengal", age: 1, isAdopted: false, litterTrained: true },
  { id: "c006", name: "Leo", species: "Cat", breed: "Ragdoll", age: 3, isAdopted: true, litterTrained: true },
  { id: "c007", name: "Coco", species: "Cat", breed: "Sphynx", age: 2, isAdopted: false, litterTrained: true },
  { id: "c009", name: "Nala", species: "Cat", breed: "Abyssinian", age: 2, isAdopted: false, litterTrained: true },
  { id: "c010-v2", name: "Simba", species: "Cat", breed: "Scottish Fold", age: 1, isAdopted: false, litterTrained: true },
  { id: "c012", name: "Toby", species: "Cat", breed: "Russian Blue", age: 6, isAdopted: false, litterTrained: true },
  { id: "c013", name: "Misty", species: "Cat", breed: "Himalayan", age: 3, isAdopted: false, litterTrained: false },
  { id: "c014", name: "Gizmo", species: "Cat", breed: "Exotic Shorthair", age: 2, isAdopted: false, litterTrained: true },
  { id: "c015-v2", name: "Shadow", species: "Cat", breed: "Bombay", age: 1, isAdopted: false, litterTrained: true },
];

const ARTICLES_DATA = [
  {
    id: "adoption-process",
    icon: "clipboard",
    title: "The Adoption Process: A Step-by-Step Guide",
    summary:
      "Learn everything you need to know about adopting a pet from PetsUnited. From the initial application to bringing your new friend home.",
    fullContent: (
      <div>
        <p>
          Adopting a pet is an exciting and rewarding journey. At PetsUnited, we've streamlined our
          process to ensure every animal finds a safe, loving, and permanent home. Here's what you
          can expect:
        </p>
        <h4>Step 1: Browse Our Available Pets</h4>
        <p>
          Take your time to look through the profiles of our wonderful companions online. Each
          profile includes photos, age, breed, and a short bio about their personality and needs.
        </p>
        <h4>Step 2: Submit an Adoption Inquiry</h4>
        <p>
          Once you've found a pet you're interested in, click the "Adopt / Inquire" button and fill
          out the form.
        </p>
      </div>
    ),
  },
  {
    id: "pet-nutrition",
    icon: "utensils",
    title: "Feeding Your New Pet: A Guide to Nutrition",
    summary: "Proper nutrition is key to a long and healthy life. This guide covers the basics.",
    fullContent: (
      <div>
        <p>Providing your new pet with a balanced diet is one of the most important aspects of responsible pet ownership.
        </p>
      </div>
    ),
  },
  {
    id: "settling-in",
    icon: "activity",
    title: "First Few Weeks: Helping Your Pet Settle In",
    summary: "The first few weeks are a critical adjustment period. Discover tips to make your new companion feel safe, comfortable, and loved.",
    fullContent: <div><p>Bring patience and structure — it helps pets settle.</p></div>,
  },
  {
    id: "pet-proofing",
    icon: "home",
    title: "Pet-Proofing Your Home",
    summary: "Ensure your home is a safe haven for your new pet. Learn how to identify and remove common household hazards for both cats and dogs.",
    fullContent: <div><p>Secure chemicals, watch for cords, and know your plants.</p></div>,
  },
];

/* ------------------------------
   Helper
   ------------------------------ */

function stringToSeed(str) {
  let hash = 0;
  if (!str || str.length === 0) return 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/* ------------------------------
   Small UI pieces (all in this file)
   ------------------------------ */

function Header({ onNavigate, currentPage }) {
  const navItems = [
    { page: "Home", label: "Home", icon: <Home size={16} /> },
    { page: "AvailablePets", label: "Available Pets", icon: <PawPrint size={16} /> },
    { page: "GetInvolved", label: "Get Involved", icon: <Users size={16} /> },
    { page: "Articles", label: "Articles", icon: <FileText size={16} /> },
  ];
  return (
    <header className="header">
      <div className="container nav">
        <div className="brand">
          <img
            src="/paw-icon.png"
            alt="PetsUnited logo"
            className="header-paw"
          />
          <div>
            <h1>PetsUnited</h1>
            <div style={{ fontSize: 12, color: "#64748b" }}>Animal Adoption System</div>
          </div>
        </div>

        <div className="nav-items">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`nav-button ${currentPage === item.page ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* PetCard */
function PetCard({ pet, onSelect }) {
  const imageUrl =
    pet.imageUrl || `https://loremflickr.com/400/300/${pet.species.toLowerCase()}?lock=${stringToSeed(pet.id)}`;
  return (
    <div className="card pet-card">
      <img src={imageUrl} alt={pet.name} />
      <div className="info">
        <h4>{pet.name}</h4>
        <p>{pet.breed}</p>
        <p>
          Age: {pet.age} {pet.age > 1 ? "years" : "year"}
        </p>
        {pet.species === "Dog" ? (
          <p>Training: {pet.trainingLevel}</p>
        ) : (
          <p>Litter Trained: {pet.litterTrained ? "Yes" : "No"}</p>
        )}
        <button onClick={() => onSelect(pet.id)}>Adopt / Inquire</button>
      </div>
    </div>
  );
}

/* Featured card */
function FeaturedPet({ pet, onSelect }) {
  if (!pet) return null;
  const imageUrl = pet.imageUrl || `https://loremflickr.com/500/700/${pet.species.toLowerCase()}?lock=${stringToSeed(pet.id)}`;
  const trait = pet.species === "Dog" ? `Training: ${pet.trainingLevel}` : `Litter Trained: ${pet.litterTrained ? "Yes" : "No"}`;
  return (
    <div className="featured">
      <img src={imageUrl} alt={pet.name} />
      <div className="meta">
        <p style={{ color: "#6366f1", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <Star size={16} /> Featured Companion
        </p>
        <h3>{pet.name}</h3>
        <p>
          {pet.breed} • {pet.age} {pet.age > 1 ? "years" : "year"} old
        </p>
        <div style={{ marginTop: 12 }}>
          <span style={{ background: "#f1f5ff", padding: "6px 10px", borderRadius: 20, fontWeight: 600 }}>{trait}</span>
        </div>
        <p style={{ marginTop: 12, color: "#475569" }}>
          {pet.name} is a wonderful companion waiting to find a loving home.
        </p>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => onSelect(pet.id)} style={{ background: "#4f46e5", color: "#fff", padding: "10px 16px", borderRadius: 20, border: "none", fontWeight: 700 }}>
            Meet {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Pages (Home, AvailablePets, AdoptionForm, GetInvolved, Articles, ArticleDetail) */

function HomePage({ stats, onNavigate, featuredPets, onSelectPet }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    if (featuredPets.length < 2) return;
    const timer = setTimeout(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPets.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [featuredIndex, featuredPets]);

  const currentFeatured = featuredPets[featuredIndex];

  return (
    <div className="container">
      <div className="hero">
        <h2>PetsUnited: <span style={{ color: "#6366f1" }}>Animal Adoption System</span></h2>
        <p style={{ marginTop: 12 }}>Your centralized hub for managing pet adoptions, tracking animal welfare, and connecting loving families with their new best friends.</p>
        <div style={{ marginTop: 16 }}>
          <button className="nav-button" onClick={() => onNavigate("AvailablePets")} style={{ background: "#4f46e5", color: "#fff", padding: "10px 18px", borderRadius: 999 }}>
            View Adoptable Companions
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pets Available</h3>
          <div className="value">{stats.available}</div>
        </div>
        <div className="stat-card">
          <h3>Adoptions Processed</h3>
          <div className="value" style={{ color: "#10b981" }}>{stats.adopted}</div>
        </div>
        <div className="stat-card">
          <h3>Total Pets Cared For</h3>
          <div className="value">{stats.available + stats.adopted}</div>
        </div>
      </div>

      {currentFeatured && (
        <div className="featured-wrap">
          <h3 style={{ marginTop: 22 }}>Featured Companion</h3>
          <FeaturedPet pet={currentFeatured} onSelect={onSelectPet} />
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <h3>Why Adopt From PetsUnited?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 12 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>💖</div>
            <h4>Save a Life</h4>
            <p style={{ color: "#475569" }}>You give a deserving animal a second chance at a happy, loving home.</p>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>🛡️</div>
            <h4>Health Guarantee</h4>
            <p style={{ color: "#475569" }}>All pets are vaccinated and health-checked before adoption.</p>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>👥</div>
            <h4>Expert Matching</h4>
            <p style={{ color: "#475569" }}>Our team knows each pet's personality to help you find the perfect match.</p>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>💲</div>
            <h4>Cost-Effective</h4>
            <p style={{ color: "#475569" }}>Adoption fees help cover vet care and are affordable.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailablePetsPage({ pets, onSelectPet, currentFilter, onFilterChange }) {
  const filters = ["All", "Dog", "Cat"];
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Our Available Companions</h2>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map((f) => (
            <button key={f} onClick={() => onFilterChange(f)} className={`nav-button ${currentFilter === f ? "active" : ""}`}>
              {f === "Dog" ? "Dogs" : f === "Cat" ? "Cats" : "All"}
            </button>
          ))}
        </div>
      </div>

      {pets.length > 0 ? (
        <div className="grid-cards">
          {pets.map((p) => (
            <PetCard key={p.id} pet={p} onSelect={onSelectPet} />
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 18, textAlign: "center" }}>
          <p style={{ color: "#64748b" }}>No companions match the current filter.</p>
        </div>
      )}
    </div>
  );
}

function AdoptionFormPage({ pet, onProcessAdoption, onBack }) {
  const [adopterName, setAdopterName] = useState("");
  const [adopterContact, setAdopterContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!pet) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: 30 }}>
          <p style={{ color: "#ef4444" }}>Error: No pet selected.</p>
          <button onClick={onBack} className="nav-button" style={{ color: "#4f46e5" }}>Go back</button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adopterName.trim() || !adopterContact.trim()) {
      alert("Please fill out all fields.");
      return;
    }
    onProcessAdoption(pet.id, { name: adopterName, contact: adopterContact });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <CheckCircle size={48} color="#10b981" />
          <h3>Success!</h3>
          <p>Adoption of <strong>{pet.name}</strong> has been registered in PetsUnited!</p>
          <button onClick={onBack} className="nav-button" style={{ marginTop: 12, background: "#4f46e5", color: "#fff" }}>
            Back to Available Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <button onClick={onBack} className="nav-button" style={{ marginBottom: 12 }}>
        <ArrowLeft size={16} /> Back to Pets
      </button>

      <div
  className="card"
  style={{
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "60vh",  // centers vertically
  }}
>
  <h1 className="form-title">Adoption Inquiry Form</h1>
  <p className="form-subtitle">
  You're one step closer to adopting <strong style={{ color: "#4f46e5" }}>{pet.name}</strong>!
  </p>

  <form onSubmit={handleSubmit} className="form">
  <div className="form-field">
    <label>Name</label>
    <input
      type="text"
      className="input"
      placeholder="Enter name"
      value={adopterName}
      onChange={(e) => setAdopterName(e.target.value)}
      required
    />
  </div>

  <div className="form-field">
    <label>Contact Email or Phone</label>
    <input
      type="text"
      className="input"
      placeholder="Enter contact info"
      value={adopterContact}
      onChange={(e) => setAdopterContact(e.target.value)}
      required
    />
  </div>

  <button type="submit" className="form-btn">
    Register Inquiry
  </button>
</form>

</div>
    </div>
  );
}

function GetInvolvedPage({ onAddPet, onNavigate }) {
  const [species, setSpecies] = useState("Dog");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [trainingLevel, setTrainingLevel] = useState("Beginner");
  const [litterTrained, setLitterTrained] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim() || !age || !imageUrl) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const petAge = parseInt(age, 10);
    if (isNaN(petAge) || petAge < 0) {
      alert("Please enter a valid age.");
      return;
    }

    const newPet =
      species === "Dog"
        ? { name, species, breed, age: petAge, imageUrl, trainingLevel }
        : { name, species, breed, age: petAge, imageUrl, litterTrained };

    onAddPet(newPet);
    setIsSubmitted(true);
    setTimeout(() => onNavigate("AvailablePets"), 800);
  };

  if (isSubmitted) {
    return (
      <div className="container" style={{ paddingTop: 30 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <CheckCircle size={48} color="#10b981" />
          <h3>Thank You!</h3>
          <p>Your pet has been listed for adoption. Redirecting to available pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h3>List a Pet for Adoption</h3>
        <p>Help us find a new home for a companion in need. Please provide details below.</p>

        <form onSubmit={handleSubmit} className="form" style={{ marginTop: 12 }}>
          {/* IMAGE UPLOAD BOX */}
          <div className="form-field" style={{ marginBottom: "1.2rem" }}>
            <label>Pet Photo</label>
            <div
              style={{
                position: "relative",
                border: "2px dashed #cbd5e1",
                borderRadius: "12px",
                width: "100%",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8fafc",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => document.getElementById("petPhoto").click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImageUrl(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "0.95rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <UploadCloud size={36} />
                  <p style={{ marginTop: "6px" }}>Click or drag & drop to upload an image</p>
                  <small style={{ color: "#94a3b8" }}>PNG, JPG, GIF up to 10MB</small>
                </div>
              )}
            </div>

            <input
              type="file"
              id="petPhoto"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* OTHER FIELDS */}
          <div className="form-field">
            <label>Species</label>
            <div className="radio-group" style={{ marginBottom: "1rem" }}>
              <label style={{ marginRight: "1rem" }}>
                <input
                  type="radio"
                  name="species"
                  value="Dog"
                  checked={species === "Dog"}
                  onChange={() => setSpecies("Dog")}
                />{" "}
                Dog
              </label>
              <label>
                <input
                  type="radio"
                  name="species"
                  value="Cat"
                  checked={species === "Cat"}
                  onChange={() => setSpecies("Cat")}
                />{" "}
                Cat
              </label>
            </div>
          </div>

          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
              }}
            />
          </div>

          <div className="form-field">
            <label>Breed</label>
            <input
              type="text"
              className="input"
              placeholder="Enter breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
              }}
            />
          </div>

          <div className="form-field">
            <label>Age</label>
            <input
              type="number"
              className="input"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
              }}
            />
          </div>

          {species === "Dog" ? (
            <div className="form-field">
              <label>Training Level</label>
              <select
                className="input"
                value={trainingLevel}
                onChange={(e) => setTrainingLevel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          ) : (
            <div className="form-field">
              <label>
                <input
                  type="checkbox"
                  checked={litterTrained}
                  onChange={(e) => setLitterTrained(e.target.checked)}
                />{" "}
                Litter Trained
              </label>
            </div>
          )}

          {/* FIXED BUTTON SIZE */}
          <button type="submit" className="form-btn">
            Submit Pet for Adoption
          </button>
        </form>
      </div>
    </div>
  );
}

function ArticlesPage({ articles, onSelectArticle }) {
  return (
    <div className="container">
      <h2 style={{ marginBottom: "1rem" }}>Helpful Articles & Guides</h2>

      <div
        className="articles-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="card"
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "8px" }}>{article.title}</h3>
              <p style={{ color: "#475569", marginBottom: "12px" }}>
                {article.summary}
              </p>
            </div>
            <button
              onClick={() => onSelectArticle(article.id)}
              className="nav-button"
              style={{
                background: "#4f46e5",
                color: "#fff",
                marginTop: "auto",
                alignSelf: "flex-start",
              }}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


function ArticleDetailPage({ article, onBack }) {
  if (!article) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: 30 }}>
          <p style={{ color: "#ef4444" }}>Error: Article not found.</p>
          <button onClick={onBack} className="nav-button" style={{ color: "#4f46e5" }}>Back to Articles</button>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <button onClick={onBack} className="nav-button" style={{ marginBottom: 12 }}>
        <ArrowLeft size={16} /> Back to Articles
      </button>
      <div className="card">
        <h3>{article.title}</h3>
        <div style={{ color: "#475569" }}>{article.fullContent}</div>
      </div>
    </div>
  );
}

/* ------------------------------
   Main App
   ------------------------------ */

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [pets, setPets] = useState(MOCK_PETS);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [speciesFilter, setSpeciesFilter] = useState("All");

  const filteredAvailablePets = useMemo(() => {
    return pets.filter((pet) => {
      if (pet.isAdopted) return false;
      if (speciesFilter === "All") return true;
      return pet.species === speciesFilter;
    });
  }, [pets, speciesFilter]);

  const featuredPets = useMemo(() => pets.filter((p) => !p.isAdopted).slice(0, 3), [pets]);

  const selectedPet = useMemo(() => pets.find((p) => p.id === selectedPetId), [pets, selectedPetId]);

  const selectedArticle = useMemo(() => ARTICLES_DATA.find((a) => a.id === selectedArticleId), [selectedArticleId]);

  const adoptionStats = useMemo(() => {
    return pets.reduce(
      (acc, pet) => {
        if (pet.isAdopted) acc.adopted++;
        else acc.available++;
        return acc;
      },
      { available: 0, adopted: 0 }
    );
  }, [pets]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectPetForAdoption = (petId) => {
    setSelectedPetId(petId);
    handleNavigate("AdoptionForm");
  };

  const processAdoption = (petId, adopterData) => {
    console.log("New Adopter Data:", adopterData);
    setPets((prev) => prev.map((pet) => (pet.id === petId ? { ...pet, isAdopted: true } : pet)));
  };

  const handleAddPet = (newPetData) => {
    const newPet = { ...newPetData, id: `user-${Date.now()}`, isAdopted: false };
    setPets((prev) => [newPet, ...prev]);
  };

  const handleReturnToPets = () => {
    setSelectedPetId(null);
    handleNavigate("AvailablePets");
  };

  const handleSelectArticle = (articleId) => {
    setSelectedArticleId(articleId);
    handleNavigate("ArticleDetail");
  };

  const handleReturnToArticles = () => {
    setSelectedArticleId(null);
    handleNavigate("Articles");
  };

  return (
    <div className="app-root">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {currentPage === "Home" && (
          <HomePage stats={adoptionStats} onNavigate={handleNavigate} featuredPets={featuredPets} onSelectPet={handleSelectPetForAdoption} />
        )}
        {currentPage === "AvailablePets" && (
          <AvailablePetsPage pets={filteredAvailablePets} onSelectPet={handleSelectPetForAdoption} currentFilter={speciesFilter} onFilterChange={setSpeciesFilter} />
        )}
        {currentPage === "AdoptionForm" && (
          <AdoptionFormPage pet={selectedPet} onProcessAdoption={processAdoption} onBack={handleReturnToPets} />
        )}
        {currentPage === "GetInvolved" && <GetInvolvedPage onAddPet={handleAddPet} onNavigate={handleNavigate} />}
        {currentPage === "Articles" && <ArticlesPage articles={ARTICLES_DATA} onSelectArticle={handleSelectArticle} />}
        {currentPage === "ArticleDetail" && <ArticleDetailPage article={selectedArticle} onBack={handleReturnToArticles} />}
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} PetsUnited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}








