package com.remarket.backend.services;

import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.dto.UsuarioDTO;
import com.remarket.backend.entities.Producto;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.repositories.ProductoRepository;
import com.remarket.backend.repositories.TransaccionRepository;
import com.remarket.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final TransaccionRepository transaccionRepository;

    public List<UsuarioDTO> getAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(u -> new UsuarioDTO(u.getId(), u.getNombre(), u.getEmail(),
                        u.getAvatarUrl(), u.getFechaRegistro(), u.getRole()))
                .toList();
    }

    public UsuarioDTO editarUsuario(Long id, String nombre, String email) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        if (!usuario.getEmail().equals(email) && usuarioRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email ya en uso");
        }
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        Usuario saved = usuarioRepository.save(usuario);
        return new UsuarioDTO(saved.getId(), saved.getNombre(), saved.getEmail(),
                saved.getAvatarUrl(), saved.getFechaRegistro(), saved.getRole());
    }

    public ProductoDTO editarProducto(Long id, String titulo, Double precio) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
        p.setTitulo(titulo);
        p.setPrecio(precio);
        Producto saved = productoRepository.save(p);
        return new ProductoDTO(
                saved.getId(), saved.getTitulo(), saved.getDescripcion(),
                saved.getPrecio(), saved.getEstado(), saved.getImagenUrl(),
                saved.getFechaPublicacion(), saved.getEstadoVenta(),
                saved.getVendedor().getId(), saved.getVendedor().getNombre(),
                saved.getCategoria() != null ? saved.getCategoria().getId() : null,
                saved.getCategoria() != null ? saved.getCategoria().getNombre() : null);
    }

    @Transactional
    public void eliminarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        transaccionRepository.deleteByComprador(usuario);

        List<Producto> productos = productoRepository.findByVendedor(usuario);
        for (Producto producto : productos) {
            transaccionRepository.deleteByProducto(producto);
        }

        usuarioRepository.delete(usuario);
    }

    @Transactional
    public void eliminarProducto(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        transaccionRepository.deleteByProducto(producto);
        productoRepository.delete(producto);
    }
}
