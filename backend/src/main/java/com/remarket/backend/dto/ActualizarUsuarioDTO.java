package com.remarket.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActualizarUsuarioDTO {

    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    private String email;

    @Size(min = 6)
    private String password;
}
