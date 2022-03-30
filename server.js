const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000
const route = require("./routes/route");

const app = express();
const directory = path.join(__dirname, "public/uploads");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config()

app.use(cors());
app.use("/uploads", express.static(directory));

mongoose.connect(process.env.DB_CONNECT)
const db = mongoose.connection
db.on('error', console.log.bind(console, "Failed connect to database"))
db.once('open', () => {
  console.log("Connected to database")
})


app.get("/", (req, res) => {
  res.json({ message: "Tourism Place API" });
});

app.use("/api", route);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server running in http://127.0.0.1:3000");
});
