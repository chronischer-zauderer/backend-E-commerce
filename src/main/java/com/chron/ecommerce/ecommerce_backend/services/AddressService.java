package com.chron.ecommerce.ecommerce_backend.services;

import com.chron.ecommerce.ecommerce_backend.Models.Address;
import com.chron.ecommerce.ecommerce_backend.repositories.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(long id) {
        return addressRepository.findById(id);
    }

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    public void deleteAddressById(long id) {
        addressRepository.deleteById(id);
    }

    public Address updateAddress(long id, Address updatedAddress) {
        return addressRepository.findById(id).map(address -> {
            if (updatedAddress.getAddressLine() != null && !updatedAddress.getAddressLine().isEmpty()) {
                address.setAddressLine(updatedAddress.getAddressLine());
            }
            if (updatedAddress.getCity() != null && !updatedAddress.getCity().isEmpty()) {
                address.setCity(updatedAddress.getCity());
            }
            if (updatedAddress.getState() != null && !updatedAddress.getState().isEmpty()) {
                address.setState(updatedAddress.getState());
            }
            if (updatedAddress.getZipCode() != null && !updatedAddress.getZipCode().isEmpty()) {
                address.setZipCode(updatedAddress.getZipCode());
            }
            if (updatedAddress.getCountry() != null && !updatedAddress.getCountry().isEmpty()) {
                address.setCountry(updatedAddress.getCountry());
            }
            if (updatedAddress.getPhoneNumber() != null && !updatedAddress.getPhoneNumber().isEmpty()) {
                address.setPhoneNumber(updatedAddress.getPhoneNumber());
            }
            return addressRepository.save(address);
        }).orElseThrow(() -> new RuntimeException("Dirección no encontrada con ID: " + id));
    }
}
