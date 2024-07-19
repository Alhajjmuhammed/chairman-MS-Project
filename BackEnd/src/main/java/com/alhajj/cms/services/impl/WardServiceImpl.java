package com.alhajj.cms.services.impl;

import com.alhajj.cms.model.WardEntity;
import com.alhajj.cms.repositories.WardRepository;
import com.alhajj.cms.services.WardService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WardServiceImpl implements WardService {
    WardRepository repository;

    public WardServiceImpl(WardRepository repository) {
        this.repository = repository;
    }

    @Override
    public WardEntity saveWard(WardEntity ward) {
        return repository.save(ward);
    }

    @Override
    public List<WardEntity> getAllWards() {
        return repository.findAll();
    }

    @Override
    public Optional<WardEntity> getWardByID(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteWard(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean isExist(Long id) {
        return repository.existsById(id);
    }
}
