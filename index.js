const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");

app.use(express.urlencoded({extended: true}));

let noun, verb, adj, secondNoun, secondVerb;

function createPath(fileName = null) {
  if (!fileName) {
    throw new Error("You need to provide a file name");
  }
  return `${__dirname}/public/${fileName}.html`;
}

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.sendFile(createPath("index"));
});

app.get("/first-word", (req, res) => {
  res.sendFile(createPath("first-word"));
});

app.post("/second-word", (req, res) => {
  noun = req.body.noun;
  res.sendFile(createPath("second-word"));
});

app.post("/third-word", (req, res) => {
  verb = req.body.verb;
  res.sendFile(createPath("third-word"));
});

app.post("/fourth-word", (req, res) => {
  adj = req.body.adj;
  res.sendFile(createPath("fourth-word"));
});

app.post("/fifth-word", (req, res) => {
  secondNoun = req.body.noun;
  res.sendFile(createPath("fifth-word"));
});

app.post("/story", (req, res) => {
  secondVerb = req.body.verb;
  const storyFilePath = createPath("story");
  fs.readFile(storyFilePath, "utf8", (err, data) => {
    // add the end result into story.html
    const modifiedData = data.replace("<h1>Story</h1>", `<h1>The ${adj} ${noun} decided to ${verb}, but the ${adj} ${secondNoun} wanted to ${secondVerb}.</h1>`);
    res.send(modifiedData);
  });
});

app.get("/reset", (req, res) => {
  noun = null;
  verb = null;
  adj = null;
  secondNoun = null;
  secondVerb = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
