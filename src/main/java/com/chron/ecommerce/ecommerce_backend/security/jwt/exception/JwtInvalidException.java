package com.chron.ecommerce.ecommerce_backend.security.jwt.exception;

public class JwtInvalidException extends RuntimeException {
    public JwtInvalidException(String message) {
        super(message);
    }
}
