package com.remarket.backend.services;

import com.remarket.backend.dto.UsuarioDTO;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioDTO getMiPerfil(Usuario usuario) {
        return toDTO(usuario);
    }

    public UsuarioDTO actualizar(Usuario usuario, String nombre, String email, String password) {
        if (!usuario.getEmail().equals(email) && usuarioRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está en uso");
        }
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        if (password != null && !password.isBlank()) {
            usuario.setPassword(passwordEncoder.encode(password));
        }
        return toDTO(usuarioRepository.save(usuario));
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
