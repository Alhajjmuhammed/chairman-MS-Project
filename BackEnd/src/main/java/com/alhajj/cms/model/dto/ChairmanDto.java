package com.alhajj.cms.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChairmanDto {

    private Long id;
    private String fullname;
    private String province;
    private String ward;
    private UserDto user;

}
