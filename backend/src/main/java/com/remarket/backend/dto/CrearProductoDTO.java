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
public class CrearProductoDTO {

    @NotBlank
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotNull
    @PositiveOrZero
    private Double precio;

    @NotBlank
    private String estado;

    private Long categoriaId;
}
