package com.example.backend.repository;

import com.example.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Find all completed todos
    List<Todo> findByCompletedTrue();

    // Optional: also add the inverse if needed
    List<Todo> findByCompletedFalse();

}
