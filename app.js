const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");
const cors = require("cors");

const app = express();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(cors());
app.use(express.static("public"));

app.use(
    "/api",
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    require("./route-groups")
);

app.get("/", (req, res) => {
    res.send({
        message: "It is working!"
    });
});

module.exports = app;
