package com.chron.ecommerce.ecommerce_backend.repositories;

import com.chron.ecommerce.ecommerce_backend.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
