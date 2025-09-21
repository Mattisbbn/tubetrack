import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Hero } from "./Hero";
import { Playlists } from "./Playlists";

export function Homepage() {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const playlistItems = localStorage.getItem("playlists");
    if(playlistItems){
      setPlaylists(JSON.parse(playlistItems));
    }
  }, []);
  

  return (
    <div className="bg-dark-950 text-gray-100 min-h-screen">
      <Header />
      <Hero setPlaylists={setPlaylists} />
      <Playlists playlists={playlists} />




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
