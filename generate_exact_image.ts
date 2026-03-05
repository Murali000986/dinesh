import { GoogleGenAI } from "@google/genai";

async function generateExactImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A high-resolution digital illustration of a traditional rural house (Mane) with a tiled roof, set in a lush green organic farm. In the foreground, there are neat rows of green crops. In the background, cows are grazing in a meadow, and rolling hills are visible under a warm, golden hour sun. The style should be a clean, vibrant digital painting, exactly matching the composition of the provided reference image.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "2K"
      },
    },
  });

  for (const part of response.candidates![0].content.parts) {
    if (part.inlineData) {
      console.log(part.inlineData.data);
      return;
    }
  }
}

generateExactImage();
