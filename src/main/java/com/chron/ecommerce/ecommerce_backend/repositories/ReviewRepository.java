package com.chron.ecommerce.ecommerce_backend.repositories;

import com.chron.ecommerce.ecommerce_backend.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
