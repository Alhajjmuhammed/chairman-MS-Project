package com.alhajj.cms.controllers;

import com.alhajj.cms.model.ChairmanEntity;
import com.alhajj.cms.model.CitizenEntity;
import com.alhajj.cms.model.dto.CitizenDto;
import com.alhajj.cms.services.ChairmanService;
import com.alhajj.cms.services.CitizenService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/citizen")
public class CitizenController {

    private CitizenService citizenService;
    private ChairmanService chairmanService;
    private ModelMapper modelMapper;

    public CitizenController(CitizenService citizenService, ChairmanService chairmanService, ModelMapper modelMapper) {
        this.citizenService = citizenService;
        this.chairmanService = chairmanService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<CitizenDto> createCitizen(@RequestBody CitizenDto citizenDto) {
        Optional<ChairmanEntity> chairmanEntity = chairmanService.getByID(citizenDto.getChairman().getId());
        if(chairmanEntity.isPresent()) {
            CitizenEntity citizenEntity = modelMapper.map(citizenDto, CitizenEntity.class);
            citizenEntity.setChairman(chairmanEntity.get());
            CitizenEntity savedCitizen = citizenService.saveCitizen(citizenEntity);
            return new ResponseEntity<>(modelMapper.map(savedCitizen, CitizenDto.class), HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<CitizenDto>> getAllCitizens() {
        List<CitizenEntity> citizenEntity = citizenService.getAllCitizens();
        List<CitizenDto> citizenDto = citizenEntity.stream()
                .map(citizen -> modelMapper.map(citizen, CitizenDto.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(citizenDto, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CitizenDto> getCitizenByID(@PathVariable("id") Long id) {
        Optional<CitizenEntity> citizenEntity = citizenService.getCitizenByID(id);
        return citizenEntity.map(citizen -> new ResponseEntity<>(modelMapper.map(citizen, CitizenDto.class), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CitizenDto> updateCitizen(
            @PathVariable("id") Long id, @RequestBody CitizenDto citizenDto) {
        System.out.println("in the controller");
        if (!citizenService.isExist(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            citizenDto.setId(id);
            CitizenEntity citizenEntity = modelMapper.map(citizenDto, CitizenEntity.class);
            Optional<ChairmanEntity> chairmanEntity = chairmanService.getByID(citizenDto.getChairman().getId());
            if(chairmanEntity.isPresent()) {
                citizenEntity.setChairman(chairmanEntity.get());
            }
            CitizenEntity savedCitizen = citizenService.saveCitizen(citizenEntity);
            return new ResponseEntity<>(modelMapper.map(savedCitizen, CitizenDto.class), HttpStatus.OK);
        }

    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity deleteCitizen(@PathVariable("id") Long id) {
        Optional<CitizenEntity> citizenEntity = citizenService.getCitizenByID(id);
        if(!citizenEntity.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CitizenEntity citizen = citizenEntity.get();
        citizen.setChairman(null);
        citizenService.saveCitizen(citizen);
        citizenService.deleteCitizen(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);


    }


}
