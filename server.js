require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(process.env.DEVELOPMENT_DB_URL).then(() => {
    console.log("Database Connected");
});

app.use("/api", require("./routes/allroutes.route"));

app.listen(5000, () => {
    console.log("Server Start on port 5000");
})