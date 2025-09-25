import { formatSeconds } from '../utils/formatSeconds';

export function VideoCard({ video, index, totalVideos, setActiveVideo, isActive }) {
  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-xl border ${
        video.status === "not_seen" ? 'bg-gray-800/20  border-gray-700/30' :
        video.status === "seen" ? 'bg-purple-600/20  border-purple-500/30' :
        'bg-blue-400/20  border-blue-400/60'}
        cursor-pointer relative`}
      onClick={() => {
        setActiveVideo(video);
      }}>
      {isActive && (
        <div className={`absolute top-1/2 right-2 w-2 h-2 ${video.status === "not_seen" ? 'bg-gray-500' : video.status === "seen" ? 'bg-purple-500' : 'bg-blue-500'} rounded-full z-10 transform -translate-y-1/2`}></div>
      )}
      <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white line-clamp-2 mb-1">{video.snippet.title}</h4>
        <p className="text-xs text-gray-400 mb-1">
          {index + 1}/{totalVideos} • {formatSeconds(video.durationSeconds)}
        </p>
        {/* <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full" >En cours</span> */}
      </div>
    </div>
  );
}
