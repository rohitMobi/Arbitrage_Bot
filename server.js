require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


app.use(express.json());

mongoose.connect(process.env.DEVELOPMENT_DB_URL).then(() => {
  console.log("Database Connected");
});
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Arbitrage_Bot",
      description:
        "A REST API built with Express and MongoDB. This API provides movie catchphrases and the context of the catchphrase in the movie.",
    },
  },
  apis: ["./routes/allroutes.route"],
};

app.use("/api", require("./routes/allroutes.route"));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(5000, () => {
  console.log("Server Start on port 5000");
});
