package com.alhajj.cms.controllers;

import com.alhajj.cms.config.UserAuthProvider;
import com.alhajj.cms.model.UserEntity;
import com.alhajj.cms.model.dto.UserDto;
import com.alhajj.cms.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private UserService userService;
    private ModelMapper modelMapper;

    private UserAuthProvider authProvider;

    public UserController(UserService userService, ModelMapper modelMapper, UserAuthProvider authProvider) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.authProvider = authProvider;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
        UserEntity savedUser = userService.saveUser(userEntity);
        userDto.setToken(authProvider.createToken(userDto));
        return new ResponseEntity<>(modelMapper.map(savedUser, UserDto.class), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUser() {
        List<UserEntity> userEntity = userService.getAllUsers();
        List<UserDto> userDto = userEntity.stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDto> getUserByID(@PathVariable("id") Long id) {
        Optional<UserEntity> userEntity = userService.getUserById(id);
        return userEntity.map(entity -> new ResponseEntity<>(modelMapper.map(entity, UserDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long id, @RequestBody UserDto userDto) {
        if(!userService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            userDto.setId(id);
            UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
            UserEntity saveUser = userService.saveUser(userEntity);
            return new ResponseEntity<>(modelMapper.map(saveUser, UserDto.class),HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
