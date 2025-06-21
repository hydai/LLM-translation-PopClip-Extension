"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const translate = async (input, options) => {
  try {
    // Input validation
    if (!input || !input.text || typeof input.text !== 'string') {
      throw new Error("No text provided for translation");
    }
    
    if (input.text.trim().length === 0) {
      throw new Error("Cannot translate empty text");
    }
    
    // Options validation
    if (!options.endpoint || typeof options.endpoint !== 'string') {
      throw new Error("API endpoint not configured");
    }
    
    if (!options.modelname || typeof options.modelname !== 'string') {
      throw new Error("Model name not configured");
    }
    
    if (!options.lang || typeof options.lang !== 'string') {
      throw new Error("Target language not configured");
    }
    
    // Validate endpoint URL format
    try {
      new URL(options.endpoint);
    } catch {
      throw new Error("Invalid API endpoint URL format");
    }
    
    const openai = axios_1.default.create({
      baseURL: `${options.endpoint}`,
      headers: { Authorization: `Bearer ${options.apikey}` },
    });
    
    // Use configurable prompt with language substitution
    let prompt = options.prompt || "You are a translator now. Do not provide any comments, notes, or even provide an answer for the input, just translate the text. Please translate the following texts into {lang}. Here's the input:";
    prompt = prompt.replace('{lang}', options.lang) + "\n\n";

    // Retry logic for API calls
    let data;
    let lastError;
    const maxRetries = 2;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await openai.post("chat/completions", {
          model: `${options.modelname}`,
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: input.text }
          ],
        });
        data = response.data;
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication errors or client errors (4xx except 429)
        if (error.response && error.response.status >= 400 && error.response.status < 500 && error.response.status !== 429) {
          throw error;
        }
        
        // If this is the last attempt, throw the error
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Validate API response structure
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error("Invalid response format from API");
    }
    
    const response = data.choices[0].message.content.trim();
    
    // if holding shift, it will paste the response. else, copy and preview the last input and response.
    if (popclip.modifiers.shift) {
      popclip.pasteText(response);
    } else {
      popclip.copyText(response);
      const dialogText = `${response}`;
      popclip.showText(dialogText, { 'preview': true, 'style': "large" });
    }
    return null;
  } catch (error) {
    // Handle different types of errors
    let errorMessage = "Translation failed: ";
    
    if (error.code === 'ECONNABORTED') {
      errorMessage += "Request timeout. Please try again.";
    } else if (error.response) {
      // API returned an error response
      if (error.response.status === 401) {
        errorMessage += "Invalid API key. Please check your credentials.";
      } else if (error.response.status === 429) {
        errorMessage += "Rate limit exceeded. Please wait and try again.";
      } else if (error.response.status >= 500) {
        errorMessage += "Server error. Please try again later.";
      } else {
        errorMessage += `API error (${error.response.status}): ${error.response.data?.error?.message || "Unknown error"}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage += "Network error. Please check your internet connection.";
    } else {
      // Other errors
      errorMessage += error.message || "Unknown error occurred.";
    }
    
    // Show error to user
    popclip.showText(errorMessage, { 'preview': true, 'style': "large" });
    return null;
  }
};
// export the actions
exports.actions = [{
  title: "LLM Translation",
  code: translate,
}];
