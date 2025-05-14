package com.chron.ecommerce.ecommerce_backend.domain.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category updateCategory(Long id, Category updatedCategory) {
        return categoryRepository.findById(id).map(category -> {
            if (updatedCategory.getCategoryName() != null && !updatedCategory.getCategoryName().isEmpty()) {
                category.setCategoryName(updatedCategory.getCategoryName());
            }
            if (updatedCategory.getParent() != null) {
                category.setParent(updatedCategory.getParent());
            }

            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }
}
