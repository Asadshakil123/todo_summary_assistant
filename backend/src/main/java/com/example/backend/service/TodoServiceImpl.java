package com.example.backend.service;

import com.example.backend.model.Todo;
import com.example.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final SlackService slackService;
    private final OpenRouterService openRouterService;

    public TodoServiceImpl(
            TodoRepository todoRepository,
            SlackService slackService,
            OpenRouterService openRouterService
    ) {
        this.todoRepository = todoRepository;
        this.slackService = slackService;
        this.openRouterService = openRouterService;
    }

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    @Override
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByCompletedTrue();
    }

    @Override
    public List<Todo> getUnCompletedTodos() {
        return todoRepository.findByCompletedFalse();
    }

    @Override
    public String summarizeAndSendToSlack() {
        List<Todo> todos = todoRepository.findAll();

        if (todos.isEmpty()) {
            String emptyMessage = "📋 No pending todos to summarize.";
            slackService.sendMessage(emptyMessage);
            return emptyMessage;
        }

        // Prepare todos for LLM prompt
        List<String> todoLines = todos.stream()
                .filter(todo -> !todo.isCompleted())
                .map(todo -> "- " + todo.getTitle() + (todo.getDescription() != null ? ": " + todo.getDescription() : ""))
                .toList();

        // Use OpenRouter to summarize
        String llmSummary = openRouterService.generateSummary(todoLines);

        // Send summary to Slack
        slackService.sendMessage(llmSummary);

        return "LLM summary sent to Slack!";
    }

}
