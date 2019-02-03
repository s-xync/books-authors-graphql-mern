const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.development" });

const app = express();

// connect with mlab
const MONGODB_URI = "mongodb://127.0.0.1:27017/gql";
// const MONGODB_URI = process.env.MONGODB_URI;
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
