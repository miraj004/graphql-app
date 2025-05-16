const express = require("express");
const models = require("./models");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const cors = require("cors")
const app = express();

const MONGO_URI =
  "mongodb+srv://mirajcei:u1DVgn1uzMQ86GZj@cluster0.ujsdnch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

app.use(cors({
    origin: "http://localhost:5173"  // or your froFntend port
}));
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);



module.exports = app;
