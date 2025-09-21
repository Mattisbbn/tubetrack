import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage/Homepage'
import './app.css'
import { Playlists } from './pages/Playlists/Playlists';
import {ViewPlaylist} from './pages/Playlists/ViewPlaylist'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/playlists' element={<Playlists />}></Route>
         <Route path="/playlists/:playlistId" element={<ViewPlaylist />}></Route>
      </Routes>
    </>
  );
}

export default App;