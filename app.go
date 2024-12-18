package main

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/openai/openai-go"
	"github.com/openai/openai-go/option"
)

// Placeholder for API key - will be replaced during build
var POCKET_GPT_KEY = "replace_with_actual_key"

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	godotenv.Load(".env")
	if envKey := os.Getenv("POCKET_GPT_KEY"); envKey != "" {
		POCKET_GPT_KEY = envKey
	}
}

// GetGPTResponse returns a response from GPT
func (a *App) GetGPTResponse(userMessage string) string {
	// Validate that the key has been replaced during build
	if POCKET_GPT_KEY == "replace_with_actual_key" {
		log.Fatal("API key was not properly injected during build")
	}

	client := openai.NewClient(
		option.WithAPIKey(POCKET_GPT_KEY),
	)

	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
		Messages: openai.F([]openai.ChatCompletionMessageParamUnion{
			openai.UserMessage(userMessage),
		}),
		Model:     openai.F(openai.ChatModelGPT3_5Turbo),
		MaxTokens: openai.F(int64(100)),
	})

	if err != nil {
		log.Fatalf("Error getting GPT response: %v", err)
	}

	return chatCompletion.Choices[0].Message.Content
}
