const express = require("express");
const connectDB = require("./db");
const path = require("path");
const cron = require("./cron");

const app = express();

//Connect Database
connectDB();

//Bodyparser Middleware
app.use(express.json({ extended: false }));

//Use Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/blog", require("./routes/api/blog"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
