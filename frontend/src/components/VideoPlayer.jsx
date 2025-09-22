import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faCheck, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";


export function VideoPlayer({ video, videoNumber, totalVideos }){
    const playerRef = useRef(null);
    const saveTimerRef = useRef(null);

    const videoId = video?.snippet?.resourceId?.videoId;
    const playlistId = video?.snippet?.playlistId;

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
                    onReady: (event) => {
                        startLoggingTimer();
                    },
                    onStateChange: () => {
                        // noop
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

        return () => {
            stopLoggingTimer();
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch {}
                playerRef.current = null;
            }
        };
    
    }, [videoId]);

  

    function startLoggingTimer() {
        stopLoggingTimer();
        saveTimerRef.current = window.setInterval(() => {
            const player = playerRef.current;
            if (!player || typeof player.getCurrentTime !== 'function') return;
            const current = Number(player.getCurrentTime() || 0);
            const duration = Number(player.getDuration() || 0);
            if (duration > 0) {
                const percent = (current / duration) * 100;
                updateVideoProgressInLocalStorage(playlistId, videoId, percent);
            }
        }, 100);
    }

    function stopLoggingTimer() {
        if (saveTimerRef.current) {
            window.clearInterval(saveTimerRef.current);
            saveTimerRef.current = null;
        }
    }

    function updateVideoProgressInLocalStorage(currentPlaylistId, currentVideoId, percent) {
        if (!currentPlaylistId || !currentVideoId) return;
        try {
            const raw = localStorage.getItem('playlists');
            if (!raw) return;
            const playlists = JSON.parse(raw);
            if (!Array.isArray(playlists)) return;

            const playlistIndex = playlists.findIndex(p => p?.playlistId === currentPlaylistId);
            if (playlistIndex === -1) return;
            const playlist = playlists[playlistIndex];
            if (!Array.isArray(playlist?.videos)) return;

            const videoIndex = playlist.videos.findIndex(v =>
                (v?.contentDetails?.videoId || v?.snippet?.resourceId?.videoId) === currentVideoId
            );
            if (videoIndex === -1) return;

            playlist.videos[videoIndex] = {
                ...playlist.videos[videoIndex],
                progressionPercentage: percent
            };

            playlists[playlistIndex] = playlist;
            localStorage.setItem('playlists', JSON.stringify(playlists));
        } catch {}
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