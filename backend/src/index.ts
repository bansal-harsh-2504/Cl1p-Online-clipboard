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

app.post("/clipboard", async (req: any, res: any) => {
  const { content, customId } = req.body;

  if (!customId || !content) {
    return res
      .status(400)
      .json({ message: "customId and content are required" });
  }

  try {
    const clip = await Clip.create({ customId, content });

    res.json({
      message: "Clip created successfully",
      id: clip.customId,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create clip", error });
  }
});

app.get("/clipboard/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const clip = await Clip.findOne({ customId: id });

    if (!clip) {
      return res.status(404).json({ message: "Clipboard not found" });
    }

    res.json({
      content: clip.content,
      expiresAt: new Date(
        clip.createdAt.getTime() + 60 * 60 * 1000
      ).toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving clip", error });
  }
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${process.env.PORT}`);
});
