import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faCheck, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";


export function VideoPlayer({ video, videoNumber, totalVideos }){
    const playerRef = useRef(null);
    const saveTimerRef = useRef(null);

    const videoId = video?.snippet?.resourceId?.videoId;
    const playlistId = video?.snippet?.playlistId;

    function getSavedWatchedTimeSeconds(){
        try {
            const playlists = localStorage.getItem('playlists');
            if(!playlists) return 0;
            const playlistsArray = JSON.parse(playlists);
            const playlist = playlistsArray.find(p => p.playlistId === playlistId);
            if(!playlist) return 0;
            const item = playlist.videos?.[videoNumber - 1];
            const seconds = Number(item?.watchedTimeSeconds || 0);
            return Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
        } catch {
            return 0;
        }
    }

    useEffect(() => {
        if (!videoId) return;

        function createPlayer() {
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch {}
            }

            playerRef.current = new window.YT.Player(`yt-player-${videoId}`, {
                videoId,
                host: 'https://www.youtube-nocookie.com',
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    enablejsapi: 1,
                    playsinline: 1,
                },
                events: {
                    onReady: (e) => {
                        const savedSeconds = getSavedWatchedTimeSeconds();
                        if (savedSeconds > 0) {
                            try { e.target.seekTo(savedSeconds, true); } catch {}
                        }
                    },
                    onStateChange: (e) => {
                    
                        if(e.data === 1) {
                            startLoggingTimer();
                        }
                        if(e.data === 2) {
                            stopLoggingTimer();
                        }
                     
                    }
                }
            });
        }

        if (!window.YT || !window.YT.Player) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = function() {
                if (typeof prev === 'function') prev();
                createPlayer();
            };
        } else {
            createPlayer();
        }
        return
    
    }, [videoId]);

  

    function startLoggingTimer() {
        stopLoggingTimer();
        saveTimerRef.current = window.setInterval(() => {
            const player = playerRef.current;
            const watchedTimeSeconds = Number(player.getCurrentTime() || 0);
            const duration = Number(player.getDuration() || 0);
            if (duration > 0) {
                const watchedTimePercentage = (watchedTimeSeconds / duration) * 100;
                saveProgress(watchedTimePercentage, watchedTimeSeconds);
                
            }
        }, 500);
    }

    function stopLoggingTimer() {
        if (saveTimerRef.current) {
            window.clearInterval(saveTimerRef.current);
            saveTimerRef.current = null;
        }
    }

    function saveProgress(watchedTimePercentage, watchedTimeSeconds){
        const playlists = localStorage.getItem('playlists');
        if(playlists){
            const playlistsArray = JSON.parse(playlists);
            const playlist = playlistsArray.find(playlist => playlist.playlistId === playlistId);
            if(playlist){
                playlist.videos[videoNumber - 1].watchedTimePercentage = watchedTimePercentage;
                playlist.videos[videoNumber - 1].watchedTimeSeconds = watchedTimeSeconds;
                localStorage.setItem('playlists', JSON.stringify(playlistsArray));
            }
        }
    }
 


    return (
        <div id="video-player-section" className="lg:col-span-2 section-clickable">
                <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl border border-dark-700/50 overflow-hidden">
                    <div className="aspect-video bg-black relative">
                        <div id={`yt-player-${videoId}`} className="w-full h-full"></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2" >{video?.snippet?.title}</h3>
                        <p className="text-gray-400 mb-4" >Vidéo {videoNumber} sur {totalVideos} • Ajoutée {dayjs(video?.snippet?.publishedAt).fromNow()}</p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faBackwardStep} />
                                    <span >Précédente</span>
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faCheck} />
                                    <span >Marquer comme vue</span>
                                </button>
                                <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center space-x-2">
                                    <span >Suivante</span>
                                    <FontAwesomeIcon icon={faForwardStep} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}