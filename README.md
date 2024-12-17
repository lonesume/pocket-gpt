# Pocket GPT
🚀 A powerful desktop application for macOS, Windows, and Linux that brings ChatGPT directly to your computer. Built with Golang, React, TypeScript, and the OpenAI API for fast and seamless AI-powered searches at your fingertips.

## Project Overview
Pocket GPT is a cross-platform desktop application for AI-powered text generation and management, built with local-first principles.

## Motivation
Provide a flexible, private AI text generation tool that:
- Works offline
- Protects user data
- Offers seamless cross-platform experience

## Technologies
- **Backend**: Go
- **Frontend**: React
- **Framework**: Wails v2
- **Build Tool**: Vite

## Prerequisites
- Go 1.20+
- Node.js 16+
- Wails CLI
- npm/yarn

## Development Setup

### Install Dependencies
```bash
# Install Wails CLI
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# Clone repository
git clone https://github.com/yourusername/pocket-gpt.git
cd pocket-gpt

# Install frontend dependencies
cd frontend
npm install
```

### Development Mode
```bash
# Run in development mode
wails dev
```

## Building the Application

### Development Build
```bash
wails build
```

### Production Build
```bash
wails build -production
```

## Project Structure
- `backend/`: Go backend logic
- `frontend/`: React components
- `app.go`: Application core
- `main.go`: Entry point

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push and create pull request

## License
MIT
