package com.chron.ecommerce.ecommerce_backend.web.controller;

import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshToken;
import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshTokenRepository;
import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshTokenService;
import com.chron.ecommerce.ecommerce_backend.payload.AuthResponse;
import com.chron.ecommerce.ecommerce_backend.payload.LoginRequest;
import com.chron.ecommerce.ecommerce_backend.payload.TokenRefreshRequest;
import com.chron.ecommerce.ecommerce_backend.payload.TokenRefreshResponse;
import com.chron.ecommerce.ecommerce_backend.security.jwt.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtils.generateToken(userDetails);


        return ResponseEntity.ok(new AuthResponse(token));
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
        String requestToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String newAccessToken = jwtUtils.generateTokenFromUser(user);
                    return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken, requestToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token no válido: " + requestToken));
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        com.chron.ecommerce.ecommerce_backend.domain.user.User user = refreshTokenService
                    .getUserByUsername(username);
        refreshTokenService.deleteByUserId(user.getUserId());

        return ResponseEntity.ok("Refresh token eliminado correctamente.");
    }
    @PostMapping("/revoke")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> revokeToken(@RequestBody TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        refreshTokenService.deleteByToken(refreshToken);

        return ResponseEntity.ok("Token revocado correctamente");
    }
}
