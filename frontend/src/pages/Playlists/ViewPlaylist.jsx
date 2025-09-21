import { faArrowLeft, faBackwardStep, faCheck, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components/Header";
import { PlaylistHeader } from "../../components/Playlist-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VideoCard } from "../../components/Video-cards";


export function ViewPlaylist(){

    const [playlist, setPlaylist] = useState(null);
    const { playlistId } = useParams();
    useEffect(() => {
        const playlistItems = localStorage.getItem("playlists");
        if(playlistItems){
            setPlaylist(JSON.parse(playlistItems).find(playlist => playlist.uuid === playlistId));
        }
    }, [playlistId]);




    return(
        <>
        <Header/>
        <main className=" min-h-screen bg-dark-950 m-4">
            <div className="max-w-7xl mx-auto">
        <div id="back-navigation" className="mb-6 section-clickable">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
               
                <FontAwesomeIcon icon={faArrowLeft} />
                <Link to='/playlists' >Retour aux playlists</Link>
            </button>
        </div>

        {
            playlist && <PlaylistHeader playlist={playlist} />
        }

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div id="video-player-section" className="lg:col-span-2 section-clickable">
                <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl border border-dark-700/50 overflow-hidden">
                    <div className="aspect-video bg-black relative">
                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="">
                        </iframe>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2" >Electronic Vibes Mix 2024 - Deep House Session</h3>
                        <p className="text-gray-400 mb-4" >Vidéo 23 sur 127 • Ajoutée il y a 2 jours</p>
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

            <div id="video-list-section" className="lg:col-span-1 section-clickable">
                <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl border border-dark-700/50 h-[800px] overflow-hidden">
                    <div id="progress-section" className="p-4 border-b border-dark-700/50 section-clickable">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white" >Progression</h3>
                            <span className="text-slate-400 font-medium text-sm" >87%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2 mb-3">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-lg font-bold text-emerald-400" >110</div>
                                <div className="text-xs text-gray-400" >Vues</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-blue-400" >17</div>
                                <div className="text-xs text-gray-400" >Restantes</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-purple-400" >127</div>
                                <div className="text-xs text-gray-400" >Total</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white" >Liste des vidéos</h3>
                            <select className="bg-dark-700/50 border border-dark-600 rounded-xl px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500">
                                <option>Toutes</option>
                                <option>Non vues</option>
                                <option>Vues</option>
                            </select>
                        </div>

                        <div id="videos-list" className="space-y-3 overflow-y-auto scrollbar-hide section-clickable" style={{ height: '550px' }}>
                          {
                            playlist && playlist.videos
                              .sort((a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt))
                              .map((video) => (
                                <VideoCard key={video.id} video={video} videoNumber={playlist.videos.indexOf(video) + 1} totalVideos={playlist.totalVideos} />
                              ))
                          }

                            {/* <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-play text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg><!-- <i className="fa-solid fa-play text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" >Deep House Summer Hits</h4>
                                    <p className="text-xs text-gray-400 mb-1" >24/127 • 38:15</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-check text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg><!-- <i className="fa-solid fa-check text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-400 line-clamp-2 mb-1" >Techno Beats Collection</h4>
                                    <p className="text-xs text-gray-500 mb-1" >22/127 • 42:08</p>
                                    <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-0.5 rounded-full" >Vue</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-play text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg><!-- <i className="fa-solid fa-play text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" >Progressive House Journey</h4>
                                    <p className="text-xs text-gray-400 mb-1" >25/127 • 51:22</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-check text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg><!-- <i className="fa-solid fa-check text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-400 line-clamp-2 mb-1" >Ambient Electronic Sounds</h4>
                                    <p className="text-xs text-gray-500 mb-1" >21/127 • 36:45</p>
                                    <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-0.5 rounded-full" >Vue</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-play text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg><!-- <i className="fa-solid fa-play text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" >Synthwave Retro Mix</h4>
                                    <p className="text-xs text-gray-400 mb-1" >26/127 • 47:18</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-teal-500 to-cyan-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-check text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg><!-- <i className="fa-solid fa-check text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-400 line-clamp-2 mb-1" >Melodic Dubstep Hits</h4>
                                    <p className="text-xs text-gray-500 mb-1" >20/127 • 39:52</p>
                                    <span className="bg-gray-500/20 text-gray-400 text-xs px-2 py-0.5 rounded-full" >Vue</span>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-dark-700/30 video-hover cursor-pointer">
                                <div className="w-20 h-12 bg-dark-700 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="svg-inline--fa fa-play text-white text-sm" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg><!-- <i className="fa-solid fa-play text-white text-sm"></i> Font Awesome fontawesome.com -->
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" >Future Bass Anthems</h4>
                                    <p className="text-xs text-gray-400 mb-1" >27/127 • 44:33</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
        </main>
        </>
    )
}