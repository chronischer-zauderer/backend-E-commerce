package com.chron.ecommerce.ecommerce_backend.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private Long roleId;
}
