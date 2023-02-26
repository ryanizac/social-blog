import express from "express";

const PORT = process.env.PORT || 3000;
const server = express();

server.get("/hello", (req, res) => {
  res.send("hello!");
});

server.listen(PORT, () => {
  console.log(`Server listen on http:localhost:${PORT}`);
});
