import generateFlashcards from "@/app/_lib/generateFlashcards";

export async function POST(req) {
  try {
    const { title, quantity, difficulty, language } = await req.json();

    const generatedContent = await generateFlashcards(
      title,
      quantity,
      difficulty,
      language
    );

    return new Response(JSON.stringify({ content: generatedContent }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
