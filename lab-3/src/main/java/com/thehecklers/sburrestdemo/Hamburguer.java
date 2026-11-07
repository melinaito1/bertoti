package com.thehecklers.sburrestdemo;

import javax.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "HAMBURGUER")
public class Hamburguer {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME")
    private String name;

    public Hamburguer() {
    }

    @PrePersist
    public void gerarId() {
        if (this.id == null || this.id.isEmpty()) {
            this.id = UUID.randomUUID().toString();
        }
    }

    public Hamburguer(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public Hamburguer(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}