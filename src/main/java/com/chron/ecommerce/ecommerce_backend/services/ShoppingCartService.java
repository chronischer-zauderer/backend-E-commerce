package com.chron.ecommerce.ecommerce_backend.services;

import com.chron.ecommerce.ecommerce_backend.Models.ShoppingCart;
import com.chron.ecommerce.ecommerce_backend.repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public List<ShoppingCart> getAllShoppingCarts() {
        return shoppingCartRepository.findAll();
    }
    public Optional<ShoppingCart> getShoppingCartById(long id) {
        return shoppingCartRepository.findById(id);
    }
    public ShoppingCart createShoppingCart(ShoppingCart shoppingCart) {
        return shoppingCartRepository.save(shoppingCart);
    }
    public void deleteShoppingCartById(long id) {
        shoppingCartRepository.deleteById(id);
    }
}
