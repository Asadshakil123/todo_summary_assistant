package com.example.backend.service;

import com.example.backend.model.Todo;
import com.example.backend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final SlackService slackService;

    public TodoServiceImpl(TodoRepository todoRepository, SlackService slackService) {
        this.todoRepository = todoRepository;
        this.slackService = slackService;
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
    public String summarizeAndSendToSlack() {
        List<Todo> todos = todoRepository.findAll();

        if (todos.isEmpty()) {
            String emptyMessage = "📋 No pending todos to summarize.";
            slackService.sendMessage(emptyMessage);
            return emptyMessage;
        }

        // Simple text summary (can replace with LLM later)
        StringBuilder summary = new StringBuilder("*📝 Todo Summary:*\n");
        for (Todo todo : todos) {
            summary.append("- ")
                    .append(todo.isCompleted() ? "✅ " : "🕒 ")
                    .append(todo.getTitle())
                    .append("\n");
        }

        String summaryText = summary.toString();

        // Send to Slack
        slackService.sendMessage(summaryText);

        return "Summary sent to Slack successfully!";
    }
}
