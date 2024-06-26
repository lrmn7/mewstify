import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavbarHome } from './components'
import { ArtistDetails, Home, Login, PlaylistDetails, Recently, SearchDetails, Top, TrackDetails } from './pages'
import { useCurrentUser } from './hooks'
import getCurrentUser from './api/getCurrentUser'

function App() {
  const { setCurrentUser } = useCurrentUser()

  useEffect(() => {
    fetchGetCurrentUser()
  }, [])

  async function fetchGetCurrentUser() {
    try {
      const response = await getCurrentUser()
      setCurrentUser(response)
    } catch (error) {
      console.error('Error fetching current user:', error)
    }
  }

  return (
    <>
      <NavbarHome />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/top' element={<Top />} />
        <Route path='/recently' element={<Recently />} />
        <Route path='/track'>
          <Route path=':id' element={<TrackDetails />} />
        </Route>
        <Route path='/artist'>
          <Route path=':id' element={<ArtistDetails />} />
        </Route>
        <Route path='/playlist'>
          <Route path=':id' element={<PlaylistDetails />} />
        </Route>
        <Route paath='/search'>
          <Route path=':query' element={<SearchDetails />} />
        </Route>
        <Route path='*' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
