package com.chron.ecommerce.ecommerce_backend.domain.orderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    public Optional<OrderDetail> getOrderDetailById(long id) {
        return orderDetailRepository.findById(id);
    }

    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    public void deleteOrderDetailById(long id) {
        orderDetailRepository.deleteById(id);
    }

    public OrderDetail updateOrderDetail(Long id, OrderDetail updatedOrderDetail) {
        return orderDetailRepository.findById(id).map(orderDetail -> {
            if (updatedOrderDetail.getQuantity() != null) {
                orderDetail.setQuantity(updatedOrderDetail.getQuantity());
            }
            if (updatedOrderDetail.getPrice() != null) {
                orderDetail.setPrice(updatedOrderDetail.getPrice());
            }
            return orderDetailRepository.save(orderDetail);
        }).orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con ID: " + id));
    }


}
