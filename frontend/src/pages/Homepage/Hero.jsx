
import axios from "axios";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export function Hero({setPlaylists, playlists}){
  const [playlistLink, setPlaylistLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!playlistLink.includes("list=")) {
      alert("Veuillez entrer un lien de playlist YouTube valide contenant le paramètre 'list='");
      return;
    }

    if(playlists.some(playlist => playlist.playlistId === playlistLink.match(/[?&]list=([^&]+)/)[1])){
      alert("Cette playlist est déjà suivie");
      return;
    }
    
    const playlistIdMatch = playlistLink.match(/[?&]list=([^&]+)/);
    if (playlistIdMatch && playlistIdMatch[1]) {
      const playlistId = playlistIdMatch[1];
      axios.get(`http://localhost:3001/api/playlist/${playlistId}`)
      .then(response => {
        const existingPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]");

        if(existingPlaylists.some(playlist => playlist.playlistId === playlistId)){
          alert("Cette playlist est déjà suivie");
          return;
        }
        
       
        const updatedPlaylists = [...existingPlaylists, response.data];
        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
        
       
        setPlaylists(updatedPlaylists);
        
      })
      .catch(err => {
        const msg = err?.response?.data?.error || err?.message || "Erreur réseau";
        alert(`Échec du chargement de la playlist: ${msg}`);
      });
      
      
    } else {
      alert("Impossible d'extraire l'ID de la playlist. Vérifiez le format du lien.");
    }
  };

  return(


    <section id="hero-section" className="relative py-20 px-6 overflow-hidden h-[600px] flex items-center cursor-default-must  bg-gradient-to-br from-slate-900/20 via-dark-900 to-gray-900/20">
   

        <div className="relative max-w-4xl mx-auto text-center">
      
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-8" >
              Suivez l'évolution de vos
              <span className="text-slate-300"> playlists YouTube</span>
            </h2>
     

          <div id="main-form-card" className="bg-dark-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-dark-700/50 shadow-2xl max-w-2xl mx-auto card-hover section-clickable">
     
              <p className="text-gray-400 mb-6" >
                Collez le lien de votre playlist YouTube pour commencer
              </p>
 

            <form className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faYoutube} />
                </div>
                <input type="url" placeholder="https://www.youtube.com/playlist?list=..." className="w-full bg-dark-700/50 border border-dark-600 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all" value={playlistLink} onChange={(e) => setPlaylistLink(e.target.value)}/>
              </div>

              <button type="submit" className=" cursor-pointer w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl" onClick={handleSubmit}>
                Commencer le suivi
              </button>
            </form>
          </div>
        </div>
      </section>

    )
}