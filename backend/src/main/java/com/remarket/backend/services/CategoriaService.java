package com.remarket.backend.services;

import com.remarket.backend.dto.CategoriaDTO;
import com.remarket.backend.entities.Categoria;
import com.remarket.backend.repositories.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> getAll() {
        return categoriaRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    private CategoriaDTO toDTO(Categoria c) {
        return new CategoriaDTO(c.getId(), c.getNombre());
    }
}
