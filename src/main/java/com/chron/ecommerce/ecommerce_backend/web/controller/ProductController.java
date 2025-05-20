package com.chron.ecommerce.ecommerce_backend.web.controller;

import com.chron.ecommerce.ecommerce_backend.domain.product.Product;
import com.chron.ecommerce.ecommerce_backend.domain.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saved = productService.createProduct(product);
        return ResponseEntity.ok(saved);
    }
}
