package com.petsunited.model;

import java.io.Serializable;

/**
 * Article entity for pet care guides
 */
public class Article implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String id;
    private String title;
    private String summary;
    private String fullContent;
    private String icon;
    
    public Article(String id, String title, String summary, String fullContent, String icon) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.fullContent = fullContent;
        this.icon = icon;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getSummary() {
        return summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }
    
    public String getFullContent() {
        return fullContent;
    }
    
    public void setFullContent(String fullContent) {
        this.fullContent = fullContent;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
}