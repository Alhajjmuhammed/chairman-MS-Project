package com.alhajj.cms.controllers;


import com.alhajj.cms.model.ChairmanEntity;
import com.alhajj.cms.model.UserEntity;
import com.alhajj.cms.model.dto.ChairmanDto;
import com.alhajj.cms.model.dto.UserDto;
import com.alhajj.cms.services.ChairmanService;
import com.alhajj.cms.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/chairman")
public class ChairmanController {

    private UserService userService;
    private ChairmanService chairmanService;
    private ModelMapper modelMapper;
    public ChairmanController(UserService userService, ChairmanService chairmanService, ModelMapper modelMapper) {
        this.userService = userService;
        this.chairmanService = chairmanService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<ChairmanDto> createChairman(@RequestBody ChairmanDto chairmanDto) {

        ChairmanEntity chairmanEntity = modelMapper.map(chairmanDto, ChairmanEntity.class);
        UserEntity userEntity = modelMapper.map(chairmanDto.getUser(), UserEntity.class);
        UserEntity savedUser = userService.saveUser(userEntity);
        chairmanEntity.setUser(savedUser);
        ChairmanEntity savedChairman = chairmanService.saveChairman(chairmanEntity);
        ChairmanDto savedChairmanDto = modelMapper.map(savedChairman, ChairmanDto.class);
        return new ResponseEntity<>(savedChairmanDto, HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<ChairmanDto>> getChairman() {
        List<ChairmanEntity> chairmanEntities = chairmanService.getAll();
        List<ChairmanDto> chairmanDto = chairmanEntities.stream()
                .map(user -> modelMapper.map(user, ChairmanDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(chairmanDto, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ChairmanDto> getUserByID(@PathVariable("id") Long id) {
        Optional<ChairmanEntity> chairmanEntity = chairmanService.getByID(id);
        return chairmanEntity.map(entity -> new ResponseEntity<>(modelMapper.map(entity, ChairmanDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<ChairmanDto> updateChairman(
            @PathVariable("id") Long id, @RequestBody ChairmanDto chairmanDto){
        if(!chairmanService.isExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            chairmanDto.setId(id);
            ChairmanEntity chairmanEntity = modelMapper.map(chairmanDto, ChairmanEntity.class);
            ChairmanEntity savedchairmanEntity = chairmanService.saveChairman(chairmanEntity);
            return new ResponseEntity<>(modelMapper.map(savedchairmanEntity, ChairmanDto.class), HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteChairman(@PathVariable("id") Long id) {
        chairmanService.delChairman(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
