package com.alhajj.cms.controllers;

import com.alhajj.cms.config.UserAuthProvider;
import com.alhajj.cms.model.UserEntity;
import com.alhajj.cms.model.dto.CredentialDto;
import com.alhajj.cms.model.dto.UserDto;
import com.alhajj.cms.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private UserService userService;
    private UserAuthProvider authProvider;
    private ModelMapper modelMapper;

    public AuthController(UserService userService, UserAuthProvider authProvider, ModelMapper modelMapper) {
        this.userService = userService;
        this.authProvider = authProvider;
        this.modelMapper = modelMapper;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialDto credentialDto) {
        try {
            UserEntity userEntity = userService.login(credentialDto);
            UserDto userDto = modelMapper.map(userEntity, UserDto.class);
            userDto.setToken(authProvider.createToken(userDto));
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
