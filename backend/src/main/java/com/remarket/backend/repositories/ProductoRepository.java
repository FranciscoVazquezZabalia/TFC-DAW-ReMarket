package com.remarket.backend.repositories;

import com.remarket.backend.entities.Producto;
import com.remarket.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Productos publicados por un vendedor concreto
    List<Producto> findByVendedor(Usuario vendedor);

    // Productos disponibles 
    List<Producto> findByEstadoVenta(String estadoVenta);
}
