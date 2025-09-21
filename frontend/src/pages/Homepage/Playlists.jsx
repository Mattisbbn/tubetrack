import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlaylistCard } from "../../components/Playlist-card";

export function Playlists({playlists}){
    return (

             <section id="saved-playlists" className="py-16 px-6 bg-dark-900/30 cursor-default-must">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Mes Playlists Suivies
              </h3>
              <p className="text-gray-400" >
                Gérez et consultez toutes vos playlists en cours de suivi
              </p>
            </div>
            <button className="bg-dark-700/50 hover:bg-dark-700 text-white px-6 py-3 rounded-xl border border-dark-600 transition-colors flex items-center space-x-2">
              <FontAwesomeIcon icon={faPlus}/>
              <span >Nouvelle playlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.playlistId} percentage={23} status="Actif" playlist={playlist} />
            ))}
         
          
          </div>

          <div className="text-center mt-12">
            <button className="bg-dark-700/50 hover:bg-dark-700 text-white px-8 py-3 rounded-xl border border-dark-600 transition-colors">
              Voir toutes les playlists
            </button>
          </div>
        </div>
      </section>
    )
}