package com.alhajj.cms.controllers;

import com.alhajj.cms.model.ProvinceEntity;
import com.alhajj.cms.model.WardEntity;
import com.alhajj.cms.model.dto.WardDto;
import com.alhajj.cms.services.ProvinceService;
import com.alhajj.cms.services.WardService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/wards")
public class WardController {

    private WardService wardService;
    private ProvinceService provinceService;
    private ModelMapper modelMapper;
    public WardController(WardService wardService, ProvinceService provinceService, ModelMapper modelMapper) {
        this.wardService = wardService;
        this.provinceService = provinceService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<WardDto> createWard(@RequestBody WardDto wardDto) {
        Optional<ProvinceEntity> provinceEntity = provinceService.getProvinceByID(wardDto.getProvince().getId());
        if(provinceEntity.isPresent()) {
            WardEntity wardEntity = modelMapper.map(wardDto, WardEntity.class);
            wardEntity.setProvince(provinceEntity.get());
            WardEntity savedWard = wardService.saveWard(wardEntity);
            return new ResponseEntity<>(modelMapper.map(savedWard, WardDto.class), HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<WardDto>> getAllWards() {
        List<WardEntity> wardEntities = wardService.getAllWards();
        List<WardDto> wardDto = wardEntities.stream()
                .map(ward -> modelMapper.map(ward, WardDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(wardDto, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<WardDto> getWard(@PathVariable("id") Long id) {
        Optional<WardEntity> wardEntity = wardService.getWardByID(id);
        return wardEntity.map(ward -> new ResponseEntity<>(modelMapper.map(ward, WardDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<WardDto> updateWard(
            @PathVariable("id") Long id, @RequestBody WardDto wardDto) {
        if (!wardService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            wardDto.setId(id);
            WardEntity wardEntity = modelMapper.map(wardDto, WardEntity.class);
            Optional<ProvinceEntity> provinceEntity = provinceService.getProvinceByID(wardDto.getProvince().getId());
            if (provinceEntity.isPresent()) {
                wardEntity.setProvince(provinceEntity.get());
            }
            WardEntity savedWard = wardService.saveWard(wardEntity);
            return new ResponseEntity<>(modelMapper.map(savedWard, WardDto.class), HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteWard(@PathVariable("id") Long id) {

        Optional<WardEntity> optionalWard = wardService.getWardByID(id);
        if (!optionalWard.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        WardEntity ward = optionalWard.get();
        ward.setProvince(null);
        wardService.saveWard(ward);

        wardService.deleteWard(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
