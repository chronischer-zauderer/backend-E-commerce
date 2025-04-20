package com.chron.ecommerce.ecommerce_backend.repositories;

import com.chron.ecommerce.ecommerce_backend.Models.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
}
