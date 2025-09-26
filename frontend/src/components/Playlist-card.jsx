import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import { Link } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('fr');

export function PlaylistCard({ playlist }) {
  return (
    <Link
      to={`/playlists/${playlist.uuid}`}
      className="bg-dark-800/50 backdrop-blur-lg rounded-2xl p-6 border border-dark-700/50 card-hover group section-clickable">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {playlist.channelName.charAt(0)}
          </div>
          <div>
            <p className="text-sm text-gray-400">{playlist.channelName}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors" title="Actualiser">
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>

      <h4 className="text-lg font-semibold text-white mb-2">{playlist.playlistName}</h4>
      <p className="text-gray-400 text-sm mb-4">{playlist.totalVideos} vidéos •</p>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progression</span>
          <span className="text-slate-400">{playlist.overallProgressPercentage || 0}%</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-2">
          <div
            className="bg-slate-500 h-2 rounded-full"
            style={{ width: `${playlist.overallProgressPercentage || 0}%` }}></div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">Actif</span>
        <span className="text-gray-500 text-xs">Mis à jour {dayjs(playlist.fetchedAt).fromNow()}</span>
      </div>
    </Link>
  );
}
