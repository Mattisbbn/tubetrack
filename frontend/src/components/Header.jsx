export function Header() {
    return (
        <header id="header" className="bg-dark-900/80 backdrop-blur-lg border-b border-dark-700/50 sticky top-0 z-50 cursor-default-must">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                        <svg className="svg-inline--fa fa-youtube text-white text-xl" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>                </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white" >TubeTrack</h1>
                        <p className="text-sm text-gray-400" >Suivez vos playlists YouTube</p>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer" >Accueil</span>
                    <span className="text-gray-300 hover:text-white transition-colors cursor-pointer" >Mes Playlists</span>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-full font-medium transition-colors" >
                        Connexion
                    </button>
                </nav>
                <button className="md:hidden text-gray-300">
                    <svg className="svg-inline--fa fa-bars text-xl" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path></svg>            </button>
            </div>
        </div>
    </header>
    )
}