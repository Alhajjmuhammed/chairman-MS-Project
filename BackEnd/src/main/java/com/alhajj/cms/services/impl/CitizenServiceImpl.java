package com.alhajj.cms.services.impl;

import com.alhajj.cms.model.CitizenEntity;
import com.alhajj.cms.repositories.CitizenRepository;
import com.alhajj.cms.services.CitizenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitizenServiceImpl implements CitizenService {
    private CitizenRepository repository;
    public CitizenServiceImpl(CitizenRepository repository) {
        this.repository = repository;
    }

    @Override
    public CitizenEntity saveCitizen(CitizenEntity citizen) {
        return repository.save(citizen);
    }

    @Override
    public List<CitizenEntity> getAllCitizens() {
        return repository.findAll();
    }

    @Override
    public Optional<CitizenEntity> getCitizenByID(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteCitizen(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean isExist(Long id) {
        return repository.existsById(id);
    }

}
