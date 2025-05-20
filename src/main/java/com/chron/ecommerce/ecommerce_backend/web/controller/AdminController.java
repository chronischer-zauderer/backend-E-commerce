package com.chron.ecommerce.ecommerce_backend.web.controller;

import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final RefreshTokenService refreshTokenService;

    public AdminController(RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    @DeleteMapping("/users/{userId}/tokens")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> revokeAllTokensForUser(@PathVariable Long userId) {
        refreshTokenService.deleteAllTokensByUserId(userId);
        return ResponseEntity.ok("Todos los tokens del usuario han sido revocados");
    }
}


