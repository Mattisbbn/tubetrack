import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

const env = dotenv.config().parsed;
const app = express();

app.use(cors());
app.use(express.json());





const API_KEY = env.API_KEY;


app.get("/api/playlist/:id", async (req, res) => {
  const playlistId = req.params.id;

  try {
    let playlistItemsRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`);
    const playlistItems = await playlistItemsRes.json();

    let playlistRes = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY}`);
    const playlist = await playlistRes.json();

    let visibleItems = (playlistItems.items || []).filter(item => item?.status?.privacyStatus !== "private");
    visibleItems = visibleItems.map(item => {
      item.watchedTimePercentage = 0;
      item.watchedTimeSeconds = 0;
      return item;
    });
    

    const response = {
      uuid : uuidv4(),
      playlistId: playlistId,
      playlistName: playlist.items[0].snippet.localized.title,
      channelName: playlist.items[0].snippet.channelTitle,
      totalVideos: visibleItems.length,
      videos: visibleItems,
      activeVideoIndex: 0,
      fetchedAt: new Date().toISOString()
    }

    if (playlistItems.error || playlist.error) {
      return res.status(400).json({ 
        error: playlistItems.error.message || playlist.error.message,
        details: playlistItems.error || playlist.error 
      });
    }
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
