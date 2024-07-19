package com.alhajj.cms.repositories;

import com.alhajj.cms.model.CitizenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitizenRepository extends JpaRepository<CitizenEntity, Long> {
}
