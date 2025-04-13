const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "write a script to generate a 30 seconds video on topic : interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"imagePrompt\": \"Realistic photo of a bustling 18th-century London coffeehouse, filled with men in wigs and coats discussing politics and news. Candlelight flickers, casting long shadows. Papers are scattered on tables, and a server pours coffee. Detailed background with period-accurate architecture.\",\n    \"ContentText\": \"(0-5 seconds) **Narrator:** In the heart of 18th-century London, coffeehouses weren't just places for a caffeine fix. They were centers of information and revolution.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic oil painting of Edward Lloyd, a shrewd and intelligent businessman, standing proudly in his coffeehouse. He is surrounded by maps, nautical charts, and ship manifests. His expression is knowing and confident.\",\n    \"ContentText\": \"(5-10 seconds) **Narrator:** One such coffeehouse, Lloyd's Coffee House, became the go-to spot for maritime news, insurance, and shipping information. Its owner, Edward Lloyd, was a keen observer.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic illustration of a ship battling a fierce storm at sea. Waves crash over the deck, and the mast is swaying precariously. Lightning illuminates the scene. Focus on the dramatic elements of the storm.\",\n    \"ContentText\": \"(10-15 seconds) **Narrator:** Lloyd diligently collected reports of shipwrecks, pirate attacks, and treacherous sea conditions. This information was vital for merchants and ship owners looking to insure their vessels.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic photograph of a group of men, some with quills and ledgers, gathered around a table in Lloyd's Coffee House. They are intently discussing insurance rates and ship losses. Period-accurate clothing and setting.\",\n    \"ContentText\": \"(15-20 seconds) **Narrator:** He started posting this data, creating a transparent market where risks could be assessed and insurance rates could be fairly determined.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic digital art of a modern-day insurance form or a computer screen displaying insurance data, subtly fading in from the 18th-century scene. A sense of continuity between the past and present.\",\n    \"ContentText\": \"(20-25 seconds) **Narrator:** From this humble coffeehouse, the modern insurance industry was born.\"\n  },\n  {\n    \"imagePrompt\": \"Realistic view inside a contemporary office, showing a global map on the wall and busy people working at computers. The scene conveys a sense of global commerce and risk management.\",\n    \"ContentText\": \"(25-30 seconds) **Narrator:** Today, Lloyd's of London remains a global leader in insurance, a testament to the power of information and the entrepreneurial spirit of a London coffeehouse owner.\"\n  }\n]\n```\n"},
        ],
      },
    ],
  });
