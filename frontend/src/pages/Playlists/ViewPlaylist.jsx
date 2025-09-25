import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../../components/Header';
import { PlaylistHeader } from '../../components/Playlist-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { VideoList } from '../../components/VideoList';
import { VideoPlayer } from '../../components/VideoPlayer';
import { Footer } from '../../components/Footer';

export function ViewPlaylist() {
  const [playlist, setPlaylist] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const { playlistId } = useParams();
  
  useEffect(() => {
    const playlistItems = localStorage.getItem('playlists');
    if (playlistItems) {
      setPlaylist(JSON.parse(playlistItems).find((playlist) => playlist.uuid === playlistId));
    }
  }, [playlistId]);
  
  useEffect(() => {
    if (playlist) {
      setActiveVideo(playlist.videos[playlist.activeVideoIndex]);
    }
  }, [playlist]);

  // Écouter les changements dans le localStorage pour mettre à jour la playlist
  useEffect(() => {
    const handleStorageChange = () => {
      const playlistItems = localStorage.getItem('playlists');
      if (playlistItems) {
        const updatedPlaylist = JSON.parse(playlistItems).find((p) => p.uuid === playlistId);
        if (updatedPlaylist) {
          setPlaylist(updatedPlaylist);
        }
      }
    };

    // Écouter les changements de localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement les changements (pour les changements dans le même onglet)
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [playlistId]);

  const handleVideoChange = (video) => {
    if (playlist) {
      const videoIndex = playlist.videos.findIndex(v => v.id === video.id);
      if (videoIndex !== -1) {

        const updatedPlaylist = {
          ...playlist,
          activeVideoIndex: videoIndex
        };
        
        const playlists = JSON.parse(localStorage.getItem('playlists') || '[]');
        const playlistIndex = playlists.findIndex(p => p.uuid === playlistId);
        if (playlistIndex !== -1) {
          playlists[playlistIndex] = updatedPlaylist;
          localStorage.setItem('playlists', JSON.stringify(playlists));
        }
        setPlaylist(updatedPlaylist);
        setActiveVideo(video);
      }
    }
  };

  return (
    <>
      <Header />
      <main className=" min-h-screen bg-dark-950 m-4">
        <div className="max-w-7xl mx-auto">
          <div id="back-navigation" className="mb-6 section-clickable">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} />
              <Link to="/playlists">Retour aux playlists</Link>
            </button>
          </div>

          {playlist && <PlaylistHeader playlist={playlist} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeVideo && (
              <VideoPlayer
                video={activeVideo}
                index={playlist.activeVideoIndex}
                totalVideos={playlist.totalVideos}
                setActiveVideo={handleVideoChange}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            )}
            {playlist && <VideoList playlist={playlist} setActiveVideo={handleVideoChange} setPlaylist={setPlaylist} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
