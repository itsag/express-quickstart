import express, { json } from "express";

const app = express();

app.use(json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
