package com.chron.ecommerce.ecommerce_backend.services;

import com.chron.ecommerce.ecommerce_backend.Models.PaymentMethod;
import com.chron.ecommerce.ecommerce_backend.repositories.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;


    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    public Optional<PaymentMethod> getPaymentMethodById(Long id) {
        return paymentMethodRepository.findById(id);
    }

    public PaymentMethod createPaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    public void deletePaymentMethod(Long id) {
        paymentMethodRepository.deleteById(id);
    }

    public PaymentMethod updatePaymentMethod(Long id, PaymentMethod updatedPaymentMethod) {
        return paymentMethodRepository.findById(id).map(paymentMethod -> {
            paymentMethod.setMethodType(updatedPaymentMethod.getMethodType());
            paymentMethod.setProvider(updatedPaymentMethod.getProvider());
            paymentMethod.setAccountNumber(updatedPaymentMethod.getAccountNumber());
            paymentMethod.setExpiryDate(updatedPaymentMethod.getExpiryDate());
            return paymentMethodRepository.save(paymentMethod);
        }).orElseThrow(() -> new RuntimeException("Método de pago no encontrado con ID: " + id));
    }
}
