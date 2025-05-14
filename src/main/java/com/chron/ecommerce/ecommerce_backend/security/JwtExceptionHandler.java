package com.chron.ecommerce.ecommerce_backend.security;

import com.chron.ecommerce.ecommerce_backend.payload.ApiResponse;
import com.chron.ecommerce.ecommerce_backend.security.jwt.exception.JwtExpiredException;
import com.chron.ecommerce.ecommerce_backend.security.jwt.exception.JwtInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Component
public class JwtExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { JwtExpiredException.class, JwtInvalidException.class })
    protected ResponseEntity<Object> handleJwtException(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(new ApiResponse(false, ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }
}
