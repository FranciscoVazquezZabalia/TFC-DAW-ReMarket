package com.remarket.backend.services;

import com.remarket.backend.dto.CrearProductoDTO;
import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.entities.Categoria;
import com.remarket.backend.entities.Producto;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.repositories.CategoriaRepository;
import com.remarket.backend.repositories.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

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

    public ProductoDTO crear(CrearProductoDTO dto, Usuario vendedor) {
        Producto producto = new Producto();
        producto.setTitulo(dto.getTitulo());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setEstado(dto.getEstado());
        producto.setImagenUrl(dto.getImagenUrl()); 
        producto.setVendedor(vendedor);
        producto.setEstadoVenta("disponible");
        producto.setFechaPublicacion(LocalDateTime.now());
        if (dto.getCategoriaId() != null) {
            producto.setCategoria(resolverCategoria(dto.getCategoriaId()));
        }
        return toDTO(productoRepository.save(producto));
    }

    public ProductoDTO actualizar(Long id, CrearProductoDTO dto, Usuario usuarioActual) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        if (!producto.getVendedor().getId().equals(usuarioActual.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No puedes editar este producto");
        }
        producto.setTitulo(dto.getTitulo());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setEstado(dto.getEstado());
        producto.setImagenUrl(dto.getImagenUrl()); 
        producto.setCategoria(dto.getCategoriaId() != null ? resolverCategoria(dto.getCategoriaId()) : null);
        return toDTO(productoRepository.save(producto));
    }

    public void eliminar(Long id, Usuario usuarioActual) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        if (!producto.getVendedor().getId().equals(usuarioActual.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No puedes eliminar este producto");
        }
        productoRepository.delete(producto);
    }

    public List<ProductoDTO> buscar(String q, Long categoriaId, String estadoVenta) {
        return productoRepository.findAll().stream()
                .filter(p -> q == null || q.isBlank()
                        || p.getTitulo().toLowerCase().contains(q.toLowerCase()))
                .filter(p -> categoriaId == null
                        || (p.getCategoria() != null && p.getCategoria().getId().equals(categoriaId)))
                .filter(p -> estadoVenta == null || estadoVenta.isBlank()
                        || p.getEstadoVenta().equalsIgnoreCase(estadoVenta))
                .map(this::toDTO)
                .toList();
    }

    public List<ProductoDTO> getMisProductos(Usuario vendedor) {
        return productoRepository.findByVendedor(vendedor).stream()
                .map(this::toDTO)
                .toList();
    }

    private Categoria resolverCategoria(Long categoriaId) {
        return categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoría no encontrada"));
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
