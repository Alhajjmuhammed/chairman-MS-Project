package com.alhajj.cms.services.impl;

import com.alhajj.cms.model.ProvinceEntity;
import com.alhajj.cms.repositories.ProvinceRepository;
import com.alhajj.cms.services.ProvinceService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    ProvinceRepository repository;

    public ProvinceServiceImpl(ProvinceRepository repository) {
        this.repository = repository;
    }

    @Override
    public ProvinceEntity saveProvince(ProvinceEntity province) {
        return repository.save(province);
    }

    @Override
    public List<ProvinceEntity> getAllProvince() {
        return repository.findAll();
    }

    @Override
    public Optional<ProvinceEntity> getProvinceByID(Long id) {
        return repository.findById(id);
    }

    @Override
    public void delProvince(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean isExist(Long id) {
        return repository.existsById(id);
    }
}
