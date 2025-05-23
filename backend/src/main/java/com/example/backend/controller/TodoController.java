package com.example.backend.controller;

import com.example.backend.model.Todo;
import com.example.backend.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // GET /todos - Fetch all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // GET /todos/true - Fetch all todos with completed status
    @GetMapping("/{status}")
    public ResponseEntity<List<Todo>> getAllTodosAsStatus(@PathVariable Boolean status) {
        if (status) {
            return ResponseEntity.ok(todoService.getCompletedTodos());
        }
        return ResponseEntity.ok(todoService.getUnCompletedTodos());
    }

    // POST /todos - Create a new todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.createTodo(todo));
    }

    // DELETE /todos/{id} - Delete a todo by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    // POST /summarize - Summarize todos and send to Slack
    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeTodosAndSendToSlack() {
        String summary = todoService.summarizeAndSendToSlack();
        return ResponseEntity.ok(summary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        boolean flag = todoService.updateTodo(id, todo);
        if (flag) {
            return ResponseEntity.ok(todo);
        }
        return ResponseEntity.status(400).body(todo);
    }
}

