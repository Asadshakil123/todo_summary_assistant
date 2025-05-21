package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SlackService {

    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    private final RestTemplate restTemplate;

    public SlackService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void sendMessage(String message) {
        Map<String, String> payload = Map.of("text", message);
        restTemplate.postForObject(slackWebhookUrl, payload, String.class);
    }
}
