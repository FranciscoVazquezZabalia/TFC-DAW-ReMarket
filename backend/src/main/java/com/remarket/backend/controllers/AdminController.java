package com.remarket.backend.controllers;

import com.remarket.backend.dto.EditarProductoAdminDTO;
import com.remarket.backend.dto.EditarUsuarioAdminDTO;
import com.remarket.backend.dto.ProductoDTO;
import com.remarket.backend.dto.UsuarioDTO;
import com.remarket.backend.services.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        return ResponseEntity.ok(adminService.getAllUsuarios());
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioDTO> editarUsuario(
            @PathVariable Long id,
            @Valid @RequestBody EditarUsuarioAdminDTO dto) {
        return ResponseEntity.ok(adminService.editarUsuario(id, dto.getNombre(), dto.getEmail()));
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        adminService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<ProductoDTO> editarProducto(
            @PathVariable Long id,
            @Valid @RequestBody EditarProductoAdminDTO dto) {
        return ResponseEntity.ok(adminService.editarProducto(id, dto.getTitulo(), dto.getPrecio()));
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        adminService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
