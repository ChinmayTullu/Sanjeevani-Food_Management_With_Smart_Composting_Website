import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fetchFoodExpiry(foodItem: string): Promise<void> {
  const apiKey = "AIzaSyAbD22OH2n6zAqPQAz4lzfS6E_2vHMYtMQ";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Provide the approximate expiry time for ${foodItem}.`;
  const result = await model.generateContent(prompt);

  console.log(result.response.text());
}

// Example usage
fetchFoodExpiry("milk").catch((error) => {
  console.error("Error fetching food expiry:", error);
});
