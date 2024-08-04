import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
function App() {
  const auth = useSelector((state) => state.auth);
  const isLoading = auth.loading.fetchingData;
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }  
  }, [isDarkMode]);
  return !isLoading ? (
    <div className='min-h-screen flex flex-col bg-gray-300 dark:bg-slate-950 dark:text-white text-black'>
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
