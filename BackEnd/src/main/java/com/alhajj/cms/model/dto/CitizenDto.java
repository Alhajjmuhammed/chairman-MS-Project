package com.alhajj.cms.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CitizenDto {

    private Long id;
    private Long citizenID;
    private String fullname;
    private String ward;
    private String houseNo;
    private LocalDate dob;
    private String status;
    private ChairmanDto chairman;
}
