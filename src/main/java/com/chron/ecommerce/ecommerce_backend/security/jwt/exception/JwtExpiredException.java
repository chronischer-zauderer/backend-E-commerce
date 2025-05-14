package com.chron.ecommerce.ecommerce_backend.security.jwt.exception;

public class JwtExpiredException extends RuntimeException {
    public JwtExpiredException(String message) {
        super(message);
    }
}
