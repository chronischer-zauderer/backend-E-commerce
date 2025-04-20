package com.chron.ecommerce.ecommerce_backend.services;

import com.chron.ecommerce.ecommerce_backend.Models.ProductImage;
import com.chron.ecommerce.ecommerce_backend.repositories.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageService {

    @Autowired
    private ProductImageRepository productImageRepository;

    public List<ProductImage> getAllProductImages() {
        return productImageRepository.findAll();
    }

    public Optional<ProductImage> getProductImageById(Long id) {
        return productImageRepository.findById(id);
    }

    public ProductImage createProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    public void deleteProductImage(Long id) {
        productImageRepository.deleteById(id);
    }

    public ProductImage updateProductImage(Long id, ProductImage updatedProductImage) {
        return productImageRepository.findById(id).map(productImage -> {
            productImage.setImageUrl(updatedProductImage.getImageUrl());
            productImage.setAltText(updatedProductImage.getAltText());
            return productImageRepository.save(productImage);
        }).orElseThrow(() -> new RuntimeException("Imagen de producto no encontrada con ID: " + id));
    }

}
