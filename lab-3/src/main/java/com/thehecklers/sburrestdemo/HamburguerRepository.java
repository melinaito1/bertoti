package com.thehecklers.sburrestdemo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HamburguerRepository
        extends JpaRepository<Hamburguer, String> {
}