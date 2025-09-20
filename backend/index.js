import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());


import dotenv from "dotenv";
dotenv.config();

const API_KEY = dotenv.config().parsed.API_KEY;


app.get("/api/playlist/:id", async (req, res) => {
  const playlistId = req.params.id;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ 
        error: data.error.message,
        details: data.error 
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
