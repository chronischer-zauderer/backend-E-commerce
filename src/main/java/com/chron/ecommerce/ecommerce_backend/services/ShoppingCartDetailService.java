package com.chron.ecommerce.ecommerce_backend.services;

import com.chron.ecommerce.ecommerce_backend.Models.ShoppingCartDetail;
import com.chron.ecommerce.ecommerce_backend.repositories.ShoppingCartDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartDetailService {

    @Autowired
    private ShoppingCartDetailRepository shoppingCartDetailRepository;

    public List<ShoppingCartDetail> getAllDetails() {
        return shoppingCartDetailRepository.findAll();
    }

    public Optional<ShoppingCartDetail> getDetailById(Long id) {
        return shoppingCartDetailRepository.findById(id);
    }

    public List<ShoppingCartDetail> getDetailsByCartId(Long cartId) {
        return shoppingCartDetailRepository.findByCart_CartId(cartId);
    }

    public ShoppingCartDetail createDetail(ShoppingCartDetail detail) {
        return shoppingCartDetailRepository.save(detail);
    }

    public void deleteDetail(Long id) {
        shoppingCartDetailRepository.deleteById(id);
    }

    public ShoppingCartDetail updateDetail(Long id, ShoppingCartDetail updatedDetail) {
        return shoppingCartDetailRepository.findById(id).map(existingDetail -> {
            existingDetail.setCart(updatedDetail.getCart());
            existingDetail.setProduct(updatedDetail.getProduct());
            existingDetail.setQuantity(updatedDetail.getQuantity());
            return shoppingCartDetailRepository.save(existingDetail);
        }).orElseThrow(() -> new RuntimeException("Detalle de carrito no encontrado con ID: " + id));
    }

}
