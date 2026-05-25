package com.remarket.backend.repositories;

import com.remarket.backend.entities.Transaccion;
import com.remarket.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {

    List<Transaccion> findByComprador(Usuario comprador);
}
