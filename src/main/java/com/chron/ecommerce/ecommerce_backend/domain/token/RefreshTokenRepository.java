package com.chron.ecommerce.ecommerce_backend.domain.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
    int deleteByExpiryDateBefore(Instant expiryDate);
    void deleteByUser(com.chron.ecommerce.ecommerce_backend.domain.user.User user);
    void deleteByUserUserId(Long userId);
}
