import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import sanitizeHtml from 'sanitize-html';

const env = dotenv.config().parsed;
const app = express();
const API_KEY = env.API_KEY;

app.use(cors());
app.use(express.json());

dayjs.extend(duration);

async function fetchVideosDurationsSeconds(videoIds) {
  if (!Array.isArray(videoIds) || videoIds.length === 0) return {};
  const idChunks = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    idChunks.push(videoIds.slice(i, i + 50));
  }

  const idToSeconds = {};
  for (const chunk of idChunks) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunk.join(',')}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data?.error) {
      throw new Error(data.error.message || 'YouTube API error');
    }
    (data.items || []).forEach((v) => {
      const id = v.id;
      const iso = v?.contentDetails?.duration;
      const seconds = iso ? dayjs.duration(iso).asSeconds() : 0;
      idToSeconds[id] = seconds;
    });
  }
  return idToSeconds;
}

async function fetchPlaylistItems(playlistId) {
  let res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`,
  );
  return await res.json();
}

async function fetchPlaylist(playlistId) {
  let res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY}`,
  );
  return await res.json();
}

app.get('/api/playlist/:id', async (req, res) => {
  let playlistId = req.params.id;
  playlistId = sanitizeHtml(playlistId);


  try {
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key manquante côté serveur' });
    }

    const playlist = await fetchPlaylist(playlistId);
    const playlistItems = await fetchPlaylistItems(playlistId);


    if (playlistItems?.error || playlist?.error) {
      return res.status(400).json({
        error: playlistItems?.error?.message || playlist?.error?.message || "Erreur de l'API YouTube",
        details: playlistItems?.error || playlist?.error,
      });
    }

    if (!Array.isArray(playlist?.items) || playlist.items.length === 0) {
      return res.status(404).json({ error: 'Playlist introuvable' });
    }

    let visibleItems = (playlistItems.items || []).filter((item) => item?.status?.privacyStatus !== 'private');

    visibleItems = visibleItems.map((item) => {
      item.watchedTimePercentage = 0;
      item.watchedTimeSeconds = 0;
      item.status = 'not_seen';
      return item;
    });

    const videoIds = visibleItems.map((i) => i?.contentDetails?.videoId).filter(Boolean); // Filtre toutes les videos qui n'on pas de contentdetails / videoID

    const idToDurationSeconds = await fetchVideosDurationsSeconds(videoIds);

    let totalDurationSeconds = 0;
    visibleItems = visibleItems.map((item) => {
      const vid = item?.contentDetails?.videoId;
      const durationSeconds = Number(idToDurationSeconds[vid] || 0);
      item.durationSeconds = durationSeconds;
      totalDurationSeconds += durationSeconds;
      return item;
    });

    const response = {
      uuid: uuidv4(),
      playlistId: playlistId,
      playlistName: playlist.items[0]?.snippet?.localized?.title || playlist.items[0]?.snippet?.title || 'Playlist',
      channelName: playlist.items[0].snippet.channelTitle,
      totalVideos: visibleItems.length,
      totalDurationSeconds,
      videos: visibleItems,
      activeVideoIndex: 0,
      overallProgressPercentage: 0,
      fetchedAt: new Date().toISOString(),
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', details: err?.message || String(err) });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
