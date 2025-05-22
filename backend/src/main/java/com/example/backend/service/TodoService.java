package com.example.backend.service;

import com.example.backend.model.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();

    Todo createTodo(Todo todo);

    void deleteTodo(Long id);

    List<Todo> getCompletedTodos();

    List<Todo> getUnCompletedTodos();

    String summarizeAndSendToSlack();

    boolean updateTodo(Long id, Todo todo);
}
