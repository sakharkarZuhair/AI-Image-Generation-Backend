import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/dalleDemo").get((req, res) => {
  res.send("Hello From Dall-E");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1, // Single Image
      size: "1024x1024", //Image Size
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    return res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Bad Request" });
  }
});

export default router;
