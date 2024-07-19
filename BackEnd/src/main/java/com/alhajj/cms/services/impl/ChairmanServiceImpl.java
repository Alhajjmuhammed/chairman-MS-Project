package com.alhajj.cms.services.impl;

import com.alhajj.cms.model.ChairmanEntity;
import com.alhajj.cms.repositories.ChairmanRepository;
import com.alhajj.cms.services.ChairmanService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChairmanServiceImpl implements ChairmanService {

    ChairmanRepository repository;
    public ChairmanServiceImpl(ChairmanRepository repository) {
        this.repository = repository;
    }

    @Override
    public ChairmanEntity saveChairman(ChairmanEntity chairman) {
        return repository.save(chairman);
    }

    @Override
    public List<ChairmanEntity> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<ChairmanEntity> getByID(Long id) {
        return repository.findById(id);
    }

    @Override
    public void delChairman(Long id) {
        ChairmanEntity chairman = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chairman not found with id: " + id));

        repository.delete(chairman);

    }

    @Override
    public boolean isExists(Long id) {
        return repository.existsById(id);
    }
}
