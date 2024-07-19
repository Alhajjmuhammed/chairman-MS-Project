package com.alhajj.cms.services;

import com.alhajj.cms.model.ProvinceEntity;

import java.util.List;
import java.util.Optional;

public interface ProvinceService {

    ProvinceEntity saveProvince(ProvinceEntity province);
    List<ProvinceEntity> getAllProvince();
    Optional<ProvinceEntity> getProvinceByID(Long id);
    void delProvince(Long id);
    boolean isExist(Long id);
}
