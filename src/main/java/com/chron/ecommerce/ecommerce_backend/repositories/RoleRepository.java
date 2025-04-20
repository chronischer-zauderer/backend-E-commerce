package com.chron.ecommerce.ecommerce_backend.repositories;

import com.chron.ecommerce.ecommerce_backend.Models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
