import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer id="footer"  className="bg-dark-900 border-t border-dark-700/50 py-12 px-6 cursor-default-must">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                <FontAwesomeIcon
                  className="text-white text-xl"
                  icon={faYoutube}
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">TubeTrack</h4>
                <p className="text-sm text-gray-400">
                  Suivez vos playlists YouTube
                </p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              La solution simple et efficace pour suivre l'évolution de toutes
              vos playlists YouTube préférées en un seul endroit.
            </p>
          </div>
        </div>

        <div className="border-t border-dark-700/50 mt-12 pt-8 flex items-center justify-between">
          <p className="text-gray-400">
            © 2025 TubeTrack. Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Politique de confidentialité
            </span>
            <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Conditions d'utilisation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
