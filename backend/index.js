const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());

const PORT = 4000; 
const SURVEY_DB_URL = "mongodb+srv://nikhilnigamnik:cSpTMaMo8PkkWQ8Q@cluster2.qavuup7.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(SURVEY_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection to MongoDB failed: " + err.message);
  });

const surveyAnswerSchema = new mongoose.Schema({
  sessionId: String,
  question: String,
  answer: mongoose.Schema.Types.Mixed,
  rating: Number,
});

const SurveyAnswer = mongoose.model("SurveyAnswer", surveyAnswerSchema);

app.use(bodyParser.json());

app.get("/",(req,res) => {
  res.send('Hello World!');
} )

app.post("/api/survey/answers", async (req, res) => {
  const { sessionId, answers } = req.body;

  try {
    for (const answer of answers) {
      const { question, answer: value } = answer;
      const rating = typeof value === "number" ? value : null;
      const surveyAnswer = new SurveyAnswer({
        sessionId,
        question,
        answer: value,
        rating,
      });
      await surveyAnswer.save();
    }

    res.status(200).json({ message: "Survey answers saved successfully" });
  } catch (error) {
    console.log("Error saving survey answers: " + error.message);
    res.status(500).json({ message: "Error saving survey answers" });
  }
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));
