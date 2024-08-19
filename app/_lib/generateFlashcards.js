import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function generateFlashcards(
  title,
  quantity,
  difficulty,
  language
) {
  const system_prompt = `
      You are a flashcard creator tasked with generating ${quantity} concise and effective flashcards on the topic "${title}" in ${language}. The flashcards should be tailored to a ${difficulty} difficulty level.

      1. Provide exactly ${quantity} flashcards.
      2. Create clear and concise questions for the front of each flashcard.
      3. Provide accurate and concise answers for the back of each flashcard. The answer should be brief and to the point, without any additional explanation or elaboration.
      4. Focus each flashcard on a single concept or piece of information to enhance learning.
      5. Use simple and accessible language to ensure the flashcards are understandable by learners at the specified difficulty level.
      6. Incorporate a variety of question types, including definitions, examples, comparisons, and applications.
      7. Avoid complex or ambiguous phrasing in both questions and answers.
      8. Where appropriate, use mnemonics or memory aids to reinforce key concepts.
      9. Extract the most important and relevant information if provided with a body of text, ensuring it aligns with the specified difficulty level.
      10. Aim for a balanced set of flashcards that comprehensively covers the topic.
      11. Ensure that the answer on the back of each flashcard is a single, concise response without any additional explanation or context.

      Return in the following JSON format:

      {
        "flashcards": [
          {
            "front": "Question text",
            "back": "Answer text"
          },
          // Repeat for each flashcard
        ]
      }
  `;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const jsonResponse = response.choices[0].message.content;

    const flashcards = JSON.parse(jsonResponse);
    return flashcards;
  } catch (error) {
    "error", error;
    throw error;
  }
}
