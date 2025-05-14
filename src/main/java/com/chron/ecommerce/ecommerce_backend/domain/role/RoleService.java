package com.chron.ecommerce.ecommerce_backend.domain.role;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    public Role updateRole(Long id, Role updatedRole) {
        return roleRepository.findById(id).map(role -> {
            role.setRoleName(updatedRole.getRoleName());
            return roleRepository.save(role);
        }).orElseThrow(() -> new EntityNotFoundException("Rol no encontrado con ID: " + id));
    }
}
