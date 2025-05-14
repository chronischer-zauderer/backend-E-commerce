package com.chron.ecommerce.ecommerce_backend.security.jwt;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
}
