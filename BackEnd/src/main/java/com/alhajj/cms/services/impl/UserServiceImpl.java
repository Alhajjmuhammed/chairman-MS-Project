package com.alhajj.cms.services.impl;

import com.alhajj.cms.model.UserEntity;
import com.alhajj.cms.model.dto.CredentialDto;
import com.alhajj.cms.repositories.UserRepository;
import com.alhajj.cms.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean isExist(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public UserEntity login(CredentialDto credentialDto) {
        UserEntity user = userRepository.findByUsername(credentialDto.username())
                .orElseThrow(() -> new RuntimeException("Unknown User"));

        if (!user.getPassword().equals(credentialDto.password())) {
            throw new RuntimeException("Invalid Credential");
        }

        return user;
    }
}