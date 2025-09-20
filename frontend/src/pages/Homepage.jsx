import { useState } from "react";

import { Header } from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faYoutube,faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { PlaylistCard } from "../components/Playlist-card";
import { Footer } from "../components/Footer";
import axios from "axios";



export function Homepage() {
  const [playlistLink, setPlaylistLink] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!playlistLink.includes("list=")) {
      alert("Veuillez entrer un lien de playlist YouTube valide contenant le paramètre 'list='");
      return;
    }
    
    const playlistIdMatch = playlistLink.match(/[?&]list=([^&]+)/);
    
    if (playlistIdMatch && playlistIdMatch[1]) {
      const playlistId = playlistIdMatch[1];
      axios.get(`http://localhost:3001/api/playlist/${playlistId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la playlist:", error);
      });
      
      
    } else {
      alert("Impossible d'extraire l'ID de la playlist. Vérifiez le format du lien.");
    }
  };
  return (
    <div className="bg-dark-950 text-gray-100 min-h-screen">
      <Header />

      <section id="hero-section" className="relative py-20 px-6 overflow-hidden h-[600px] flex items-center cursor-default-must">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-dark-900 to-gray-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-slate-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gray-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
           
            >
              Suivez l'évolution de vos{" "}
              <span className="text-slate-300"> playlists YouTube</span>
            </h2>
          </div>

          <div
            id="main-form-card"
            className="bg-dark-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-dark-700/50 shadow-2xl max-w-2xl mx-auto card-hover section-clickable"
          >
            <div className="mb-6">
              <h3
                className="text-2xl font-semibold text-white mb-2"
             
              >
                Commencer le suivi
              </h3>
              <p className="text-gray-400" >
                Collez le lien de votre playlist YouTube pour commencer
              </p>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faYoutube} />
                </div>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/playlist?list=..."
                  className="w-full bg-dark-700/50 border border-dark-600 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  value={playlistLink}
                  onChange={(e) => setPlaylistLink(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                onClick={handleSubmit}
              >
                <span >Commencer le suivi</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section
        id="saved-playlists"
        className="py-16 px-6 bg-dark-900/30 cursor-default-must"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3
                className="text-3xl font-bold text-white mb-2"
             
              >
                Mes Playlists Suivies
              </h3>
              <p className="text-gray-400" >
                Gérez et consultez toutes vos playlists en cours de suivi
              </p>
            </div>
            <button className="bg-dark-700/50 hover:bg-dark-700 text-white px-6 py-3 rounded-xl border border-dark-600 transition-colors flex items-center space-x-2">
              <svg
                className="svg-inline--fa fa-plus"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="plus"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                ></path>
              </svg>{" "}
              <span >Nouvelle playlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaylistCard percentage={23} status="Actif" />
          
          </div>

          <div className="text-center mt-12">
            <button
              className="bg-dark-700/50 hover:bg-dark-700 text-white px-8 py-3 rounded-xl border border-dark-600 transition-colors"
           
            >
              Voir toutes les playlists
            </button>
          </div>
        </div>
      </section>




{/*       
      <section id="cta-section" className="py-20 px-6 cursor-default-must">
        <div className="max-w-4xl mx-auto text-center">
          <h3
            className="text-4xl font-bold text-white mb-6"
         
          >
            Prêt à commencer ?
          </h3>
          <p className="text-xl text-gray-400 mb-8" >
            Rejoignez des milliers d'utilisateurs qui suivent déjà leurs
            playlists YouTube avec TubeTrack.
          </p>
          <button
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
         
          >
            Commencer maintenant
          </button>
        </div>
      </section> */}


      <Footer />
    </div>
  );
}
