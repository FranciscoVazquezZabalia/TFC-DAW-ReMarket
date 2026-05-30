package com.remarket.backend.controllers;

import com.remarket.backend.dto.ActualizarUsuarioDTO;
import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.dto.UsuarioDTO;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.services.ProductoService;
import com.remarket.backend.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final ProductoService productoService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> getMiPerfil(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(usuarioService.getMiPerfil(usuario));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioDTO> actualizarPerfil(
            @Valid @RequestBody ActualizarUsuarioDTO dto,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(usuarioService.actualizar(usuario, dto.getNombre(), dto.getEmail(), dto.getPassword()));
    }

    @GetMapping("/me/productos")
    public ResponseEntity<List<ProductoDTO>> getMisProductos(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(productoService.getMisProductos(usuario));
    }
}
