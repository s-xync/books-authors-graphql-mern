const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: ".env.development" });
const cors = require("cors");

const app = express();

// cors policies
app.use(cors());

// connect with mongodb
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gql";
const MONGODB_URI = "mongodb://127.0.0.1:27017/gql";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
