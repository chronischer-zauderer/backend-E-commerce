package com.chron.ecommerce.ecommerce_backend.domain.token;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_tokens_id")
    private Long id;


    @Column(nullable = false, unique = true)
    private String token;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private com.chron.ecommerce.ecommerce_backend.domain.user.User user;


    @Column(nullable = false)
    private Instant expiryDate;


}
