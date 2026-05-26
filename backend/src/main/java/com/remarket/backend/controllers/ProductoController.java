package com.remarket.backend.controllers;

import com.remarket.backend.dto.CrearProductoDTO;
import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.services.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> buscar(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String estadoVenta) {
        return ResponseEntity.ok(productoService.buscar(q, categoriaId, estadoVenta));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(
            @Valid @RequestBody CrearProductoDTO dto,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.crear(dto, usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CrearProductoDTO dto,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(productoService.actualizar(id, dto, usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id,
            @AuthenticationPrincipal Usuario usuario) {
        productoService.eliminar(id, usuario);
        return ResponseEntity.noContent().build();
    }
}
