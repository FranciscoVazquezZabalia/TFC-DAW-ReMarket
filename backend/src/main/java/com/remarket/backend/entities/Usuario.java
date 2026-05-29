package com.remarket.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@ToString(exclude = "productos")
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    // El email es único, no puede haber dos usuarios con el mismo
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    // Aquí guardaremos la contraseña HASHEADA con BCrypt 
    @Column(nullable = false)
    private String password;

    // Rol del usuario. 
    @Column(nullable = false)
    private String role = "ROLE_USER";

    private String avatarUrl;

    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro = LocalDateTime.now();

    // Productos publicados por este usuario.
    @OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL)
    private List<Producto> productos;
}
