package com.example.backend.service;

import com.example.backend.model.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();

    Todo createTodo(Todo todo);

    void deleteTodo(Long id);

    String summarizeAndSendToSlack();
}
