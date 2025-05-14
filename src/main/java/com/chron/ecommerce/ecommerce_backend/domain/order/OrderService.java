package com.chron.ecommerce.ecommerce_backend.domain.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Order updateOrder(Long id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            // Solo se actualizan los campos si el valor correspondiente no es nulo
            if (updatedOrder.getTotalAmount() != null) {
                order.setTotalAmount(updatedOrder.getTotalAmount());
            }
            if (updatedOrder.getAddress() != null) {
                order.setAddress(updatedOrder.getAddress());
            }
            if (updatedOrder.getPaymentMethod() != null) {
                order.setPaymentMethod(updatedOrder.getPaymentMethod());
            }
            if (updatedOrder.getDetails() != null && !updatedOrder.getDetails().isEmpty()) {
                order.setDetails(updatedOrder.getDetails());
            }
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Orden no encontrada con ID: " + id));
    }


}
