package com.chron.ecommerce.ecommerce_backend.domain.user;

import com.chron.ecommerce.ecommerce_backend.domain.address.Address;
import com.chron.ecommerce.ecommerce_backend.domain.order.Order;
import com.chron.ecommerce.ecommerce_backend.domain.paymentMethod.PaymentMethod;
import com.chron.ecommerce.ecommerce_backend.domain.review.Review;
import com.chron.ecommerce.ecommerce_backend.domain.role.Role;
import com.chron.ecommerce.ecommerce_backend.domain.shoppingCart.ShoppingCart;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false, length = 100,unique = true)
    private String username;

    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, length = 100,unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    @JsonBackReference
    private Role role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
    private List<PaymentMethod> paymentMethods;

    @OneToMany(mappedBy = "user")
    private List<Address> addresses;

    @OneToOne(mappedBy = "user")
    private ShoppingCart shoppingCart;

    @OneToMany(mappedBy = "user")
    private List<Review> reviews;
}
