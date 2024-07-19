import { useEffect } from 'react'
import { Header, Footer } from './components/index'
import { useSelector} from 'react-redux'
import { Outlet } from 'react-router-dom'

function App() {
  const auth = useSelector((state) => state.auth)
  const isLoading = auth.loading
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])
  
  
  return !isLoading ? (
    <>
    <div className='min-h-screen flex flex-wrap content-between bg-gray-300 dark:bg-slate-950 dark:text-white
    text-black text-center text-3xl'>
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
