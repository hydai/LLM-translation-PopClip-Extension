# AI Translation

Send the selected text to an OpenAI compatible LLM service, such as [OpenAI](https://platform.openai.com/docs/overview) or [Gaia](https://docs.gaianet.ai/getting-started/quick-start), for instant translation into your chosen language.

It will show as a popup screen with the translated text, and copy it to the clipboard.

You can press `shift` to paste it directly.

## Features

- **Robust Error Handling**: Comprehensive error handling for network issues, API errors, and invalid responses
- **Input Validation**: Validates text input and configuration parameters before processing
- **Automatic Retry**: Smart retry logic with exponential backoff for improved reliability
- **Secure Configuration**: Password-protected API key field for enhanced security
- **Customizable Prompts**: Configure your own translation instructions with language placeholder support
- **URL Validation**: Ensures API endpoints are properly formatted before use

![LOGO](./LLM-Translation.popclipext/translation.svg)

### Configuration

#### API Endpoint

You can choose between different API endpoints to send your translation requests.

##### Gaia
* **Running your own Gaia node:** use `http://localhost:8080/v1`
* **Public Gaia node:** it could be something like `https://0x1234.gaia.domains/v1` -- the public address of your node

##### OpenAI (Default)
* **OpenAI:** defaults to `https://api.openai.com/v1`

#### API Key

You have to provide an API key to use this extension. You can get it from the service provider you choose.

##### Gaia
* **Running your own Gaia node:** you can leave this empty.
* **Public Gaia node:** https://docs.gaianet.ai/getting-started/authentication

##### OpenAI
* **OpenAI API:** https://platform.openai.com/account/api-keys

#### Model Name

You can choose the model you want to use for translation. The default is `gpt-4o-mini` for OpenAI, and `default` for Gaia.

##### Gaia
* **Gaia:** you can use `default`

##### OpenAI (Default)
* **OpenAI:** default model is `gpt-4o-mini`

#### Target Language

The default target language is `English`, feel free to change it into any language you like, such as `Simplified Chinese`.

#### Translation Prompt

You can now customize the translation instructions by modifying the "Translation Prompt" setting. The default prompt includes a `{lang}` placeholder that will be automatically replaced with your target language. This allows you to fine-tune how the AI translates your text.

## About

This is an extension for [PopClip](https://pilotmoon.com/popclip/).

### Requirements

Requires PopClip 2022.12 or later.

## Credit

### Icons

* Icon used in the PopClip Extension by [SVG Repo](https://www.svgrepo.com/svg/498497/translate)
* LOGO by [Claude](https://claude.ai/)
