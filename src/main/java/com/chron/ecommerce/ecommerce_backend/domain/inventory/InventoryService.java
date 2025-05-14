package com.chron.ecommerce.ecommerce_backend.domain.inventory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

    public Inventory updateInventory(Long id, Inventory updatedInventory) {
        return inventoryRepository.findById(id).map(inventory -> {
            if (updatedInventory.getStock() != null) {
                inventory.setStock(updatedInventory.getStock());
            }
            return inventoryRepository.save(inventory);
        }).orElseThrow(() -> new RuntimeException("Inventario no encontrado con ID: " + id));
    }

}
