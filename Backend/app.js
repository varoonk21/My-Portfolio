import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: ["POST", "GET"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("I'm running");
});

import emailRouter from "./router/email.router.js";
app.use("/api", emailRouter);

import videoRouter from "./router/video.router.js";
app.use("/api", videoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at PORT:${PORT}`);
});
