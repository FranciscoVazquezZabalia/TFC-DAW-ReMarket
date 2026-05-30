package com.remarket.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDateTime;

@Entity
@Table(name = "transacciones")
@Data
@ToString(exclude = {"producto", "comprador"})
@NoArgsConstructor
@AllArgsConstructor
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Producto que se compra
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    // Usuario que compra, el vendedor está dentro del producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comprador_id", nullable = false)
    private Usuario comprador;

    // Estado del pedido: pendiente, completado, cancelado
    @Column(name = "estado_pedido", nullable = false, length = 50)
    private String estadoPedido = "pendiente";

    @Column(name = "fecha_transaccion", nullable = false)
    private LocalDateTime fechaTransaccion = LocalDateTime.now();
}
