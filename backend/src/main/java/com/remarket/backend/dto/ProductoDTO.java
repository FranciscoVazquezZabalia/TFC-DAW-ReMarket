package com.remarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private Double precio;
    private String estado;
    private String imagenUrl;
    private LocalDateTime fechaPublicacion;
    private String estadoVenta;
    private Long vendedorId;
    private String vendedorNombre;
    private Long categoriaId;
    private String categoriaNombre;
}
