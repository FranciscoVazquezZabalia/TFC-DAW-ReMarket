package com.remarket.backend.services;

import com.remarket.backend.dto.UsuarioDTO;
import com.remarket.backend.entities.Usuario;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    public UsuarioDTO getMiPerfil(Usuario usuario) {
        return toDTO(usuario);
    }

    private UsuarioDTO toDTO(Usuario u) {
        return new UsuarioDTO(
                u.getId(),
                u.getNombre(),
                u.getEmail(),
                u.getAvatarUrl(),
                u.getFechaRegistro()
        );
    }
}
