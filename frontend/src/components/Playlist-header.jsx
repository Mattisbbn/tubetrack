import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEllipsisV } from "@fortawesome/free-solid-svg-icons";


export function PlaylistHeader({ playlist }) {
    return (
        <div id="playlist-header" className="mb-8 section-clickable">
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" >
                    {playlist.channelName.charAt(0)}
                </div>
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2" >{playlist.playlistName}</h2>
                    <p className="text-gray-400 mb-2" >Par {playlist.channelName} • {playlist.totalVideos} vidéos</p>
                 
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors">
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors">
                   <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>
        </div>
    </div>
    )
}