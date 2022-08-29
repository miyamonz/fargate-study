const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
let i = 0;
app.get("*", (_, response) => {
  response.setHeader("Content-Type", "application/json");
  response.send(JSON.stringify({ msg: i++ }));
});
app.listen(3000, () => {
  console.log("start application server.");
});
