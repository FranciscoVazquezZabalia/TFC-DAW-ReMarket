package com.remarket.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    // Estado físico del producto: nuevo, como nuevo, usado, etc
    @Column(nullable = false, length = 50)
    private String estado;

    // Ruta a la imagen del producto 

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "fecha_publicacion", nullable = false)
    private LocalDateTime fechaPublicacion = LocalDateTime.now();

    // Estado de venta: disponible, reservado, vendido
    @Column(name = "estado_venta", nullable = false, length = 50)
    private String estadoVenta = "disponible";

    // Vendedor del producto ,relación N a 1 con Usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Usuario vendedor;

    // Categoría del producto 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}
