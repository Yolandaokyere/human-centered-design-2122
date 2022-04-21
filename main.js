require('dotenv').config()
const express = require("express");
const app = express();
const http = require('http').createServer(app)
const port = process.env.PORT || 6060;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", function (request, response) {
    response.render('index')
});
// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const filename = 'D:\HeardPod\human-centered-design-2122\images\voorbeeld.mp3';
const encoding = 'Encoding of the audio file, e.g. LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'BCP-47 language code, e.g. en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
const [response] = await client.recognize(request);
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
console.log('Transcription: ', transcription);

http.listen(port, () => {
  console.log(`App is on ${port}`);
});


