const express = require("express");
const app = express();
app.use(express.json());

app.post("/health-check", (req, res) =>{
  const kidneys = req.body.kidneys;
  const kidneysLenght = kidneys.length;
  res.send("you have "+ kidneysLenght + " kidneys");
})

app.listen(3000);