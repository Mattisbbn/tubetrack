import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../../components/Header";
import { PlaylistHeader } from "../../components/Playlist-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { VideoList } from "../../components/VideoList";
import { VideoPlayer } from "../../components/VideoPlayer";

export function ViewPlaylist(){

    const [playlist, setPlaylist] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const { playlistId } = useParams();
    useEffect(() => {
        const playlistItems = localStorage.getItem("playlists");
        if(playlistItems){
            setPlaylist(JSON.parse(playlistItems).find(playlist => playlist.uuid === playlistId));
        }
    }, [playlistId]);
    useEffect(() => {
        if(playlist){
            setActiveVideo(playlist.videos[playlist.activeVideoIndex]);
        }
    }, [playlist]);




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
        { activeVideo && <VideoPlayer video={activeVideo} videoNumber={playlist.activeVideoIndex + 1} totalVideos={playlist.totalVideos} />}

          {playlist && <VideoList playlist={playlist} />	}
        </div>
    </div>
            
        </main>
        </>
    )
}