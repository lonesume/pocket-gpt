#!/bin/bash

# Load environment variables from .env file (development mode)
source .env

mkdir -p build/darwin
sips -z 1024 1024 appicon.png --out build/darwin/appicon.icns

# Ensure the environment variable is loaded
echo "POCKET_GPT_KEY is $POCKET_GPT_KEY"

# Set the environment variable for the build process
export POCKET_GPT_KEY=$POCKET_GPT_KEY

# Build the Wails app with the environment variable baked into the binary for production
# Use ldflags to inject the variable at build time
wails build -platform darwin -ldflags "-X main.POCKET_GPT_KEY=$POCKET_GPT_KEY"

# Sign the app if necessary
codesign --sign "Developer ID Application: lonesume" --deep --force build/bin/pocket-gpt.app

cp -R build/bin/pocket-gpt.app ~/Applications