package com.remarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearValoracionDTO {
    private Long receptorId;
    private Integer puntuacion;
    private String comentario;
}
