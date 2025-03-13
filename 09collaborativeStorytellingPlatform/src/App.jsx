import { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { fetchUserDataAndSessionData, loginUser, logoutUser } from "./store/authSlice";
import { getUserProfile } from "./store/userProfileSlice";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isLoading , setIsLoading] = useState(true)
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }  
  }, [isDarkMode]);
  useEffect(()  => {
    
    dispatch(fetchUserDataAndSessionData()).then((response) => {
     if (response.error) {
       console.log(response.error)
       setIsLoading(false)
     }
     if(response){
       dispatch(getUserProfile(response.payload.userData.$id)).then((response) => {
         if (response.error) {
           console.log(response.error)
           setIsLoading(false)
         }
       }).finally(() => {
         setIsLoading(false)
       })       
     }
    })
  },[])
  return !isLoading? (
    <div className='min-h-screen flex flex-col bg-white dark:bg-slate-950 dark:text-white text-black'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen w-full flex items-center justify-center bg-blue-950 text-3xl text-center text-white'>
      Loading...
    </div>
  )
}

export default App;
