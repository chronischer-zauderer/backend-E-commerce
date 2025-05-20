package com.chron.ecommerce.ecommerce_backend.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
}
