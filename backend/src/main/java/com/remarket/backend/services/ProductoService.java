package com.remarket.backend.services;

import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.entities.Producto;
import com.remarket.backend.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<ProductoDTO> getAll() {
        return productoRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ProductoDTO getById(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        return toDTO(producto);
    }

    private ProductoDTO toDTO(Producto p) {
        return new ProductoDTO(
                p.getId(),
                p.getTitulo(),
                p.getDescripcion(),
                p.getPrecio(),
                p.getEstado(),
                p.getImagenUrl(),
                p.getFechaPublicacion(),
                p.getEstadoVenta(),
                p.getVendedor().getId(),
                p.getVendedor().getNombre(),
                p.getCategoria() != null ? p.getCategoria().getId() : null,
                p.getCategoria() != null ? p.getCategoria().getNombre() : null
        );
    }
}
