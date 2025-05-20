package com.chron.ecommerce.ecommerce_backend.domain.token;

import com.chron.ecommerce.ecommerce_backend.domain.user.User;
import com.chron.ecommerce.ecommerce_backend.domain.user.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {


    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.refresh.expiration.ms:604800000}") // 7 días por defecto
    private Long refreshTokenDurationMs;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("El refresh token ha expirado. Inicia sesión de nuevo.");
        }
        return token;
    }
    public com.chron.ecommerce.ecommerce_backend.domain.user.User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }
    @Modifying
    @Transactional
    public void deleteByUserId(Long userId) {
        refreshTokenRepository.deleteByUserUserId(userId);
    }
    @Scheduled(cron = "0 0 0 * * *") // Cada hora
    public void deleteExpiredTokens() {
        Instant now = Instant.now();
        int deleted = refreshTokenRepository.deleteByExpiryDateBefore(now);
        Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);
        logger.info("Se eliminaron {} refresh tokens expirados", deleted);
    }
    @Modifying
    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
    public void deleteAllTokensByUserId(Long userId) {
        refreshTokenRepository.deleteByUserUserId(userId);
    }

}
