package com.remarket.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditarProductoAdminDTO {

    @NotBlank
    private String titulo;

    @NotNull
    @PositiveOrZero
    private Double precio;
}
