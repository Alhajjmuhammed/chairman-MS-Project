package com.alhajj.cms.services;

import com.alhajj.cms.model.CitizenEntity;

import java.util.List;
import java.util.Optional;

public interface CitizenService {

    CitizenEntity saveCitizen(CitizenEntity citizen);
    List<CitizenEntity> getAllCitizens();
    Optional<CitizenEntity> getCitizenByID(Long id);
    void deleteCitizen(Long id);
    boolean isExist(Long id);

}
