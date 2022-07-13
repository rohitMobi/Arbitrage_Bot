const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://rohitMobi:Rohit5053@cluster0.1eqze.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Database Connected");
});

app.use("/api", require("./routes/allroutes.route"));

app.listen(5000, () => {
    console.log("Server Start on port 5000");
})