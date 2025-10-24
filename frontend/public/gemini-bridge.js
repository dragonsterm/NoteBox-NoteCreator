window.addEventListener("message", async (event) => {
  if (event.data?.type !== "GEMINI_PROMPT_REQUEST") return

  try {
    const session = await LanguageModel.create({
      expectedInputs: [],
      outputLanguage: "en"
    })
    const result = await session.prompt([
      { role: "system", content: "You are a helpful study assistant." },
      { role: "user", content: event.data.prompt }
    ])
    window.postMessage({ type: "GEMINI_PROMPT_RESPONSE", result })
  } catch (err) {
    window.postMessage({ type: "GEMINI_PROMPT_ERROR", error: err.message })
  }
})