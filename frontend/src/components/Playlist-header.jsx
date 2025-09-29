import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export function PlaylistHeader({ playlist }) {
  const navigate = useNavigate();

  return (
    <div id="playlist-header" className="mb-8 section-clickable">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
            {playlist.channelName.charAt(0)}
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{playlist.playlistName}</h2>
            <p className="text-gray-400 mb-2">
              Par {playlist.channelName} • {playlist.totalVideos} vidéos • {dayjs.duration(playlist.totalDurationSeconds * 1000).format('HH:mm:ss')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors" >
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button> */}
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <button
            className="bg-red-500/70 hover:bg-red-500/90 text-white px-4 py-2 rounded-xl transition-colors"
            onClick={() => {
              const playlists = JSON.parse(localStorage.getItem('playlists'));
              const newPlaylists = playlists.filter((p) => p.playlistId !== playlist.playlistId);
              localStorage.setItem('playlists', JSON.stringify(newPlaylists));

              navigate('/playlists');
            }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
