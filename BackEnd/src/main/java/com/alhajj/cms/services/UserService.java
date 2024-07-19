package com.alhajj.cms.services;

import com.alhajj.cms.model.UserEntity;
import com.alhajj.cms.model.dto.CredentialDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserEntity saveUser(UserEntity user);
    List<UserEntity> getAllUsers();
    Optional<UserEntity> getUserById(Long id);
    void deleteUser(Long id);
    boolean isExist(Long id);
    UserEntity login(CredentialDto credentialDto);

}
