package com.alhajj.cms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "citizens")
public class CitizenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "citizenID")
    private Long citizenID;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "ward")
    private String ward;

    @Column(name = "houseNo")
    private String houseNo;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "status")
    private String status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "chairman_id")
    private ChairmanEntity chairman;

}
