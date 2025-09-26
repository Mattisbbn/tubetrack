import { Header } from '../../components/Header';
import { PlaylistCard } from '../../components/Playlist-card';
import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer';

export function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const playlistItems = localStorage.getItem('playlists');
    if (playlistItems) {
      setPlaylists(JSON.parse(playlistItems));
    }
  }, []);

  return (
    <>
      <div className="bg-dark-950 text-gray-100 min-h-dvh flex flex-col">
        <Header />
        <main className="flex-1">
          <section id="playlists-main" className="py-8 px-6 cursor-default-must    relative">
            <div className="max-w-7xl mx-auto">
              <div id="page-header" className="mb-8 cursor-default-must section-clickable">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">Mes Playlists</h2>
                    <p className="text-gray-400">Gérez et suivez toutes vos playlists YouTube</p>
                  </div>
                </div>

                <div id="stats-bar" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 section-clickable">
                  <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-4 border border-dark-700/50">
                    <div className="text-2xl font-bold text-white">{playlists.length}</div>
                    <div className="text-sm text-gray-400">Playlists suivies</div>
                  </div>
                  <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-4 border border-dark-700/50">
                    <div className="text-2xl font-bold text-emerald-400">
                      {playlists.filter((playlist) => playlist.status === 'active').length}
                    </div>
                    <div className="text-sm text-gray-400">Actives</div>
                  </div>
                  <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-4 border border-dark-700/50">
                    <div className="text-2xl font-bold text-blue-400">
                      {playlists.reduce((acc, playlist) => acc + playlist.totalVideos, 0)}
                    </div>
                    <div className="text-sm text-gray-400">Vidéos</div>
                  </div>
                  {/* <div className="bg-dark-800/50 backdrop-blur-lg rounded-xl p-4 border border-dark-700/50">
                    <div className="text-2xl font-bold text-purple-400" >1,247</div>
                    <div className="text-sm text-gray-400" >Total vidéos</div>
                </div> */}
                </div>

                <div
                  id="filters-section"
                  className="flex flex-wrap items-center justify-between gap-4 mb-8 section-clickable">
                  <div className="flex items-center space-x-4">
                    <select className="bg-dark-700/50 border border-dark-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500">
                      <option>Toutes les playlists</option>
                      <option>Actives</option>
                      <option>Terminées</option>
                      <option>En pause</option>
                    </select>
                    <select className="bg-dark-700/50 border border-dark-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-slate-500">
                      <option>Trier par date</option>
                      <option>Trier par nom</option>
                      <option>Trier par activité</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-dark-700/50 hover:bg-dark-700 text-white p-2 rounded-xl border border-dark-600 transition-colors">
                      <svg
                        className="svg-inline--fa fa-table-cells-large"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="table-cells-large"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg="">
                        <path
                          fill="currentColor"
                          d="M448 96V224H288V96H448zm0 192V416H288V288H448zM224 224H64V96H224V224zM64 288H224V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path>
                      </svg>{' '}
                      <i className="fa-solid fa-th-large"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white p-2 rounded-xl transition-colors">
                      <svg
                        className="svg-inline--fa fa-list"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="list"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        data-fa-i2svg="">
                        <path
                          fill="currentColor"
                          d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"></path>
                      </svg>{' '}
                      <i className="fa-solid fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div
                id="playlists-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 cursor-default-must section-clickable">
                {playlists.map((playlist) => (
                  <PlaylistCard key={playlist.playlistId} percentage={23} status="Actif" playlist={playlist} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
