# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PopClip extension that provides AI-powered translation functionality. The extension sends selected text to an OpenAI-compatible LLM API service for translation into a target language.

## Architecture

### Core Components

- **LLM-Translation.popclipext/**: Main extension directory containing all PopClip extension files
  - `Config.json`: PopClip extension configuration with options for API endpoint, model, API key, and target language
  - `translation.js`: Main JavaScript module containing the translation logic
  - `icon.svg` and `translation.svg`: Extension icons

### Key Files

- `translation.js:6-31`: Main translation function that handles API calls to OpenAI-compatible endpoints
- `Config.json:16-44`: Configuration options for API endpoint, model name, API key, and target language

## Development Notes

### Extension Structure
- This is a PopClip extension (requires PopClip 2022.12+)
- No build process required - JavaScript is executed directly by PopClip
- Extension uses axios for HTTP requests to LLM APIs
- Supports both OpenAI and Gaia node endpoints

### Key Functionality
- Text translation using OpenAI-compatible APIs
- Shift key modifier support: hold Shift to paste translation directly, otherwise copy and show preview
- Configurable API endpoints (OpenAI, Gaia nodes)
- Configurable target languages and models

### API Integration
- Uses OpenAI chat completions format
- Supports custom API endpoints and models
- Bearer token authentication via API key
- Translation prompt is hardcoded in `translation.js:11`

### No Build/Test Commands
This project has no package.json, build scripts, or test frameworks. It's a simple PopClip extension that runs JavaScript directly.