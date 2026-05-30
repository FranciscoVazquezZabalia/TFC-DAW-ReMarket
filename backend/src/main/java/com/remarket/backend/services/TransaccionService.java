package com.remarket.backend.services;

import com.remarket.backend.dto.TransaccionDTO;
import com.remarket.backend.entities.Producto;
import com.remarket.backend.entities.Transaccion;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.repositories.ProductoRepository;
import com.remarket.backend.repositories.TransaccionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TransaccionService {

    private final TransaccionRepository transaccionRepository;
    private final ProductoRepository productoRepository;

    @Transactional
    public TransaccionDTO crear(Long productoId, Usuario comprador) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        if (!"disponible".equals(producto.getEstadoVenta())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El producto no está disponible");
        }

        producto.setEstadoVenta("vendido");
        productoRepository.save(producto);

        Transaccion transaccion = new Transaccion();
        transaccion.setProducto(producto);
        transaccion.setComprador(comprador);
        transaccion.setEstadoPedido("completado");
        transaccion.setFechaTransaccion(LocalDateTime.now());

        return toDTO(transaccionRepository.save(transaccion));
    }

    private TransaccionDTO toDTO(Transaccion t) {
        return new TransaccionDTO(
                t.getId(),
                t.getProducto().getId(),
                t.getProducto().getTitulo(),
                t.getComprador().getId(),
                t.getComprador().getNombre(),
                t.getEstadoPedido(),
                t.getFechaTransaccion()
        );
    }
}
