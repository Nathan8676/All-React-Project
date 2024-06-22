import { useState, useEffect } from 'react'
import { Header, Footer } from './components/index'
import { useDispatch} from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from './Store/authSlice'
import AuthService from './appwrite/auth'


function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        } 
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-blue-950
    text-white text-center text-3xl'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    
    </div>
    </>
  ) : (
    <div className=' min-h-screen w-full block bg-blue-950 text-3xl text-center text-white '>Loading...</div>

  )
}

export default App
