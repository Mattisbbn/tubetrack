import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



export function Header() {
    return (
        <header id="header" className="bg-dark-900/80 backdrop-blur-lg border-b border-dark-700/50 sticky top-0 z-50 cursor-default-must">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <Link to='/' className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                        <FontAwesomeIcon className="text-white text-xl" icon={faYoutube}/>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white" >TubeTrack</h1>
                        <p className="text-sm text-gray-400" >Suivez vos playlists YouTube</p>
                    </div>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to='/playlists' className="text-gray-300 hover:text-white transition-colors cursor-pointer" >Mes Playlists</Link>
                    {/* <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-medium transition-colors" >
                        Connexion
                    </button> */}
                </nav>
                <button className="md:hidden text-gray-300">
                  <FontAwesomeIcon icon={faBars}/>
                </button>
            </div>
        </div>
    </header>
    )
}