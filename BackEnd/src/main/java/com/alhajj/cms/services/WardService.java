package com.alhajj.cms.services;

import com.alhajj.cms.model.WardEntity;

import java.util.List;
import java.util.Optional;

public interface WardService {
    WardEntity saveWard(WardEntity ward);
    List<WardEntity> getAllWards();
    Optional<WardEntity> getWardByID(Long id);
    void deleteWard(Long id);
    boolean isExist(Long id);
}
