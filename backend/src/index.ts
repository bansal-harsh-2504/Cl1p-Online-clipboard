import express from "express";
import connectToDb from "./config/db";
import cors from "cors";
import Clip from "./models/clip";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working!");
});

app.post("/clipboard", async (req, res) => {
  const { content } = req.body;
  const clip = await Clip.create({ content });

  res.json({
    message: "Clip created successfully",
    id: clip._id,
  });
});

app.get("/clipboard/:id", async (req, res) => {
  const { id } = req.params;
  const clip = await Clip.findById(id);
  res.json({
    content: clip?.content,
  });
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
