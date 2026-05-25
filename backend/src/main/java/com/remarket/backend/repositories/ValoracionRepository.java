package com.remarket.backend.repositories;

import com.remarket.backend.entities.Valoracion;
import com.remarket.backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

    List<Valoracion> findByReceptor(Usuario receptor);
}
