import React, {useState} from 'react'
import {Signup , Login, PasswordReset, Button} from "./index"
import { IoCloseCircle } from "react-icons/io5";
function Auth({setAuthPopup}) {

    const [view , setView] = useState("login")

    const switchView = () => {
        switch (view) {
            case "login":
                return <Login setView={setView} isPopUp={true}/>

            case "signup":
                return <Signup setView={setView} isPopUp={true}/> 

            case "passwordReset":
                return <PasswordReset setView={setView} isPopUp={true}/>

            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 an">
          <div className="relative bg-white dark:bg-zinc-950 rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 animate-slide-in-from-top">
            <Button
              type="button"
              className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 bg-red-400 text-black rounded-full"
              bgColor="bg-red-400"
              textColor="text-black"
              onClick={() => setAuthPopup(false)}
              children={<IoCloseCircle size={30} />}
            />
            {switchView()}
          </div>
        </div>
      );
}

export default Auth