package com.chron.ecommerce.ecommerce_backend.domain.shoppingCartDetail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShoppingCartDetailRepository extends JpaRepository<ShoppingCartDetail, Long> {
    List<ShoppingCartDetail> findByCart_CartId(Long cartId);
}
