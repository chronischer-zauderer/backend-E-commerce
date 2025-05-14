package com.chron.ecommerce.ecommerce_backend.domain.paymentMethod;

import com.chron.ecommerce.ecommerce_backend.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "payment_methods")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_method_id")
    private Long paymentMethodId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "method_type", nullable = false, length = 50)
    private String methodType;

    @Column(name = "provider", nullable = false, length = 100)
    private String provider;

    @Column(name = "account_number", nullable = false, length = 50)
    private String accountNumber;

    @Column(name = "expiry_date", nullable = false, length = 10)
    private String expiryDate;
}
