package com.alhajj.cms.services;

import com.alhajj.cms.model.ChairmanEntity;

import java.util.List;
import java.util.Optional;

public interface ChairmanService {
    ChairmanEntity saveChairman(ChairmanEntity chairman);
    List<ChairmanEntity> getAll();
    Optional<ChairmanEntity> getByID(Long id);
    void delChairman(Long id);
    boolean isExists(Long id);
}
