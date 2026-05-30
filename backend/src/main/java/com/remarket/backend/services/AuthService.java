package com.remarket.backend.services;

import com.remarket.backend.dto.AuthResponseDTO;
import com.remarket.backend.dto.LoginRequestDTO;
import com.remarket.backend.dto.RegisterRequestDTO;
import com.remarket.backend.entities.Usuario;
import com.remarket.backend.repositories.UsuarioRepository;
import com.remarket.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequestDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email ya registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setRole("ROLE_USER");
        usuarioRepository.save(usuario);

        String token = jwtService.generarToken(usuario.getEmail());
        return new AuthResponseDTO(token, usuario.getEmail(), usuario.getNombre(), usuario.getRole());
    }

    public AuthResponseDTO login(LoginRequestDTO dto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        String token = jwtService.generarToken(usuario.getEmail());
        return new AuthResponseDTO(token, usuario.getEmail(), usuario.getNombre(), usuario.getRole());
    }
}
