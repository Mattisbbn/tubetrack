export function PlaylistCard({ percentage }) {
    return (
        <div id="playlist-card-1" className="bg-dark-800/50 backdrop-blur-lg rounded-2xl p-6 border border-dark-700/50 card-hover group section-clickable">
    
        <h4
          className="text-lg font-semibold text-white mb-2"
       
        >
          Musique Électronique 2024
        </h4>
        <p className="text-gray-400 text-sm mb-4" >
          127 vidéos • 3 nouvelles cette semaine
        </p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400" >
              Progression
            </span>
            <span className="text-slate-400" >
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-2">
            <div className="bg-slate-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <span
            className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full"
         
          >
            Actif
          </span>
          <span className="text-gray-500 text-xs" >
            Mis à jour il y a 2h
          </span>
        </div>
      </div>
    )
}