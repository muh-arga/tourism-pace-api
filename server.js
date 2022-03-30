const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const route = require("./routes/route");

const app = express();
const directory = path.join(__dirname, 'public/uploads')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/uploads', express.static(directory))

app.get("/", (req, res) => {
  res.json({ message: "Tourism Place API" });
});

app.use("/api", route);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server running in http://127.0.0.1:3000");
});
