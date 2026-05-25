package com.remarket.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionDTO {
    private Long id;
    private Long productoId;
    private String productoTitulo;
    private Long compradorId;
    private String compradorNombre;
    private String estadoPedido;
    private LocalDateTime fechaTransaccion;
}
