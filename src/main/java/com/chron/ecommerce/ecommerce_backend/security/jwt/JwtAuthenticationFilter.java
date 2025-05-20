package com.chron.ecommerce.ecommerce_backend.security.jwt;

import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshToken;
import com.chron.ecommerce.ecommerce_backend.domain.token.RefreshTokenService;
import com.chron.ecommerce.ecommerce_backend.domain.user.UserService;
import com.chron.ecommerce.ecommerce_backend.payload.AuthRequest;
import com.chron.ecommerce.ecommerce_backend.security.jwt.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            // Obtener   credenciales desde el body JSON
            var credentials = new ObjectMapper().readValue(request.getInputStream(), AuthRequest.class);

            var authToken = new UsernamePasswordAuthenticationToken(
                    credentials.getUsername(),
                    credentials.getPassword()
            );

            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException("Error al leer las credenciales de inicio de sesión", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {


        UserDetails userDetails = (UserDetails) authResult.getPrincipal();


        String accessToken = jwtUtils.generateToken(userDetails);

        // 3. Recuperas el User de dominio para crear el refresh token
        //    (añade este método en tu UserService si no lo tienes)
        com.chron.ecommerce.ecommerce_backend.domain.user.User domainUser =
                userService.getByUsername(userDetails.getUsername());

        // 4. Creas y guardas el refresh token
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(domainUser);

        // 5. Mapeas la respuesta con ambos tokens
        Map<String, String> body = new HashMap<>();
        body.put("accessToken",  accessToken);
        body.put("refreshToken", refreshToken.getToken());

        // 6. Devuelves JSON
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getWriter(), body);
    }
}
