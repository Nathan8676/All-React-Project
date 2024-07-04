import { useEffect } from 'react'
import { Header, Footer } from './components/index'
import { useSelector} from 'react-redux'
import { Outlet } from 'react-router-dom'

function App() {
  const auth = useSelector((state) => state.auth)
  const isLoading = auth.loading
  useEffect(() => {
    // currentUserDataLoader()
  }, [])

  return !isLoading ? (
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

/* export const currentUserDataLoader = function() {
  const dispatch = useDispatch()
  dispatch(fetchUserData()).then((data) => {
    if(data){
      dispatch(loginUser(data))
    }else{
      dispatch(logoutUser())
    }
   }
  )
} */