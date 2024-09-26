/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const emailRoutes = require("./routes/emailRoutes");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/email", emailRoutes);

app.use("/", (req, res) => {
  res.send("Hello");
});

// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
