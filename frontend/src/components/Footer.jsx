export function Footer() {
    return (
        <footer
        id="footer"
        className="bg-dark-900 border-t border-dark-700/50 py-12 px-6 cursor-default-must"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                  <svg
                    className="svg-inline--fa fa-youtube text-white text-xl"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="youtube"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    ></path>
                  </svg>{" "}
                </div>
                <div>
                  <h4
                    className="text-xl font-bold text-white"
                 
                  >
                    TubeTrack
                  </h4>
                  <p className="text-sm text-gray-400" >
                    Suivez vos playlists YouTube
                  </p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md" >
                La solution simple et efficace pour suivre l'évolution de toutes
                vos playlists YouTube préférées en un seul endroit.
              </p>
            </div>

            <div>
              <h5
                className="text-white font-semibold mb-4"
             
              >
                Produit
              </h5>
              <ul className="space-y-2">
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    Fonctionnalités
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    Tarifs
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    Documentation
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h5
                className="text-white font-semibold mb-4"
             
              >
                Support
              </h5>
              <ul className="space-y-2">
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    Aide
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    Contact
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                 
                  >
                    FAQ
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-700/50 mt-12 pt-8 flex items-center justify-between">
            <p className="text-gray-400" >
              © 2024 TubeTrack. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <span
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
             
              >
                Politique de confidentialité
              </span>
              <span
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
             
              >
                Conditions d'utilisation
              </span>
            </div>
          </div>
        </div>
      </footer>
    )
}