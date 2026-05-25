package com.remarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearProductoDTO {
    private String titulo;
    private String descripcion;
    private Double precio;
    private String estado;
    private Long categoriaId;
}
