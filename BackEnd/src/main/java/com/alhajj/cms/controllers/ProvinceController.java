package com.alhajj.cms.controllers;


import com.alhajj.cms.model.ProvinceEntity;
import com.alhajj.cms.model.dto.ProvinceDto;
import com.alhajj.cms.services.ProvinceService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/province")
public class ProvinceController {

    ProvinceService provinceService;
    ModelMapper modelMapper;
    public ProvinceController(ProvinceService provinceService, ModelMapper modelMapper) {
        this.provinceService = provinceService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<ProvinceDto> createProvince(@RequestBody ProvinceDto provinceDto) {
        ProvinceEntity provinceEntity = modelMapper.map(provinceDto, ProvinceEntity.class);
        ProvinceEntity savedProvince = provinceService.saveProvince(provinceEntity);
        return new ResponseEntity<>(modelMapper.map(savedProvince, ProvinceDto.class), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProvinceDto>> getAllProvince() {
        List<ProvinceEntity> provinceEntity = provinceService.getAllProvince();
        List<ProvinceDto> provinceDto = provinceEntity.stream()
                .map(province -> modelMapper.map(province, ProvinceDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(provinceDto, HttpStatus.OK);
    }
    @GetMapping(path = "/{id}")
    public ResponseEntity<ProvinceDto> getProvince(@PathVariable("id") Long id) {
        Optional<ProvinceEntity> provinceEntity = provinceService.getProvinceByID(id);
        return provinceEntity.map(province -> new ResponseEntity<>(modelMapper.map(province,ProvinceDto.class),HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<ProvinceDto> updateProvince(@PathVariable("id") Long id, @RequestBody ProvinceDto provinceDto) {
        if(!provinceService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            provinceDto.setId(id);
            ProvinceEntity provinceEntity = modelMapper.map(provinceDto, ProvinceEntity.class);
            ProvinceEntity savedProvince = provinceService.saveProvince(provinceEntity);
            return new ResponseEntity<>(modelMapper.map(savedProvince, ProvinceDto.class), HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteProvince(@PathVariable("id") Long id) {
        provinceService.delProvince(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
