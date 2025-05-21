package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenRouterService {

    @Value("${openrouter.api.key}")
    private String openRouterApiKey;

    private static final String OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

    private final RestTemplate restTemplate;

    public OpenRouterService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String generateSummary(List<String> todos) {
        String todoPrompt = String.join("\n", todos);

        Map<String, Object> requestBody = Map.of(
                "model", "mistralai/mistral-7b-instruct:free",
                "messages", List.of(
                        Map.of("role", "system", "content", "You are Todo service manager, and your role is to help user based on their todo reminders."),
                        Map.of("role", "user", "content", "Summarize the following todo list:\n" + todoPrompt)
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openRouterApiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENROUTER_API_URL, request, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            e.printStackTrace();
            return "⚠️ Failed to generate summary via OpenRouter.";
        }
    }
}
