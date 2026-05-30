package com.remarket.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditarUsuarioAdminDTO {

    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    private String email;
}
