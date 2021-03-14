const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Goodbye Cruel World"));

app.listen(5000, () => console.log("Server is running on port 5000"));