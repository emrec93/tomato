const express = require("express");
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CLoud Translate API, credentials obtained from Google Cloud Platform - REQUIRES BILLING
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

// Body parser middleware
app.use(express.json()); // Handle raw JSON
app.use(express.urlencoded({ extended: false })); // Handle urlencoded data

// Allow CORS
app.use(
  cors({
    origin: "*",
  })
);

// Detects the language of the text passed in and returns the word tomato translated in the detected language
const detectLanguage = async (text) => {
  try {
    if (
      // Prevents appending #Tomato if included already
      text.includes("#Pomodoro") ||
      text.includes("#Tomate") ||
      text.includes("#Pomidor") ||
      text.includes("#Tomaat")
    ) {
      return { hashtag: "" };
    }
    let response = await translate.detect(text); // Detect the language from the client side
    let rawTranslation = await translate.translate("Tomato", response[0].language); // Translate 'Tomato' into the detected language
    let tomato = rawTranslation[0]; // Tidy the data
    let translatedTomato = "#" + tomato; // Prepend #
    return { hashtag: translatedTomato }; // Return as an object for the front end
  } catch (error) {
    if (text !== "") {
      console.log(`An error has occured: ${error}`);
      return 0;
    }
  }
};

app.post("/api/translate", async (req, res) => {
  //Post requests made to /api/translate
  let tweet = req.body.tweet;
  let data = await detectLanguage(tweet);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
