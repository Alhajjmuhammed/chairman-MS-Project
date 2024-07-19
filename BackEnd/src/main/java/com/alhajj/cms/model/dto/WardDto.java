package com.alhajj.cms.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class WardDto {

    private Long id;
    private String name;
    private ProvinceDto province;

}
