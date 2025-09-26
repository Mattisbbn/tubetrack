import { VideoCard } from './Video-cards';
import { getPlaylistPercentage } from '../utils/getPlaylistPercentage';

import { useState, useEffect, useMemo } from 'react';

export function VideoList({ playlist, setActiveVideo }) {
  const [playlistPercentage, setPlaylistPercentage] = useState(0);

  useEffect(() => {
    setPlaylistPercentage(getPlaylistPercentage(playlist));
  }, [playlist]);

  const savePlaylistPercentage = (percentage) => {
    setPlaylistPercentage(percentage);
    const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
    const found = playlists.find((p) => p.playlistId === playlist?.playlistId);
    if (found) {
      found.overallProgressPercentage = percentage;
      localStorage.setItem('playlists', JSON.stringify(playlists));
    }
  };

  useEffect(() => {
    function handleProgress(e) {
      try {
        const { playlistId } = e.detail || {};
        if (!playlistId || playlistId !== playlist?.playlistId) return;
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const found = playlists.find((p) => p.playlistId === playlist?.playlistId);
        if (found) {
          savePlaylistPercentage(getPlaylistPercentage(found));
        }
      } catch {}
    }

    window.addEventListener('playlist-progress', handleProgress);
    return () => window.removeEventListener('playlist-progress', handleProgress);
  }, [playlist?.playlistId]);

  const videos = useMemo(() => {
    return [...(playlist?.videos || [])].sort(
      (a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt),
    );
  }, [playlist?.videos, playlist?.videos]);

  return (
    <div id="video-list-section" className="lg:col-span-1 section-clickable">
      <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl border border-dark-700/50 h-[800px] overflow-hidden">
        <div id="progress-section" className="p-4 border-b border-dark-700/50 section-clickable">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Progression</h3>
            <span className="text-slate-400 font-medium text-sm">{playlistPercentage}%</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2 mb-3">
            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${playlistPercentage}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-emerald-400">
                {playlist.videos.filter((video) => video.status === 'seen').length}
              </div>
              <div className="text-xs text-gray-400">Vues</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">
                {playlist.totalVideos - playlist.videos.filter((video) => video.status === 'seen').length}
              </div>
              <div className="text-xs text-gray-400">Restantes</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">{playlist.totalVideos}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Liste des vidéos</h3>
            {/* <select className="bg-dark-700/50 border border-dark-600 rounded-xl px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option>Toutes</option>
              <option>Non vues</option>
              <option>Vues</option>
            </select> */}
          </div>

          <div
            id="videos-list"
            className="space-y-3 overflow-y-auto scrollbar-hide section-clickable"
            style={{ height: '550px' }}>
            {playlist &&
              videos.map((video) => (
                <VideoCard
                  key={video.contentDetails.videoId}
                  video={video}
                  isActive={playlist.activeVideoIndex === videos.indexOf(video)}
                  index={videos.indexOf(video)}
                  totalVideos={playlist.totalVideos}
                  setActiveVideo={setActiveVideo}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
