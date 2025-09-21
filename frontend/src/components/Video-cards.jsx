import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





export function VideoCard({ video, videoNumber , totalVideos }) {
    return (
        <div className="flex items-start space-x-3 p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 video-hover cursor-pointer">
        <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
         
            <img  src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-full object-cover" />
            </div>
        </div>

        
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" >{video.snippet.title}</h4>
            <p className="text-xs text-gray-400 mb-1" >{videoNumber}/{totalVideos} • 45:32</p>
            {/* <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full" >En cours</span> */}

         
        </div>
    </div>
    )
}