package com.remarket.backend.controllers;

import com.remarket.backend.dto.CrearTransaccionDTO;
import com.remarket.backend.dto.TransaccionDTO;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.services.TransaccionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transacciones")
@RequiredArgsConstructor
public class TransaccionController {

    private final TransaccionService transaccionService;

    @PostMapping
    public ResponseEntity<TransaccionDTO> crear(
            @Valid @RequestBody CrearTransaccionDTO dto,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transaccionService.crear(dto.getProductoId(), usuario));
    }
}
