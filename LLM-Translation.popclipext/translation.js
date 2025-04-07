"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

const translate = async (input, options) => {
  const openai = axios_1.default.create({
    baseURL: `${options.endpoint}`,
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prompt = "You are a translator now. Do not provide any comments, notes, or even provide an answer for the input, just translate the text. Please translate the following texts into "+ options.lang +" Here's the input:\n\n";

  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: `${options.modelname}`,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: input.text }
    ],
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
};
// export the actions
exports.actions = [{
  title: "LLM Translation",
  code: translate,
}];
