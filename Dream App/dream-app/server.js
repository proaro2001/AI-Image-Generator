import * as dotenv from "dotenv";
import OpenAI from "openai";

import express from "express";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize openai
const openai = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
  // organization: process.env.OPENAI_ORG,
  // project: process.env.OPENAI_PROJECTID,
});

// Initialize express
const app = express();

// Middleware
app.use(cors()); // ( Cross Origin Resource Sharing )
app.use(express.json()); // ( Parse JSON bodies )

app.post("/dream", async (req, res) => {
  try {
    // Get the prompt from the request body
    const prompt = req.body.prompt;
    // Generate the image
    const aiResponse = await openai.images.generate({
      model:"dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
  
    const image_url = aiResponse.data[0].url;
    res.send({ image_url });
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

app.listen(8080, () => {
  console.log("make art on http://localhost:8080/dream");
});
