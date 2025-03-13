import { useState } from 'react'

function App() {
  const [color, setColor] = useState("olive")

  return (
    <>
    <div className="w-full h-screen duration-200" style={{backgroundColor: color}}></div>
    <div className="fixed flex flex-warp justify-center bottom-12 inset-x-12 px-2"> <div className="flex flex-wrap gap-3 justify-center  bg-white shadow-lg px-3 py-2 rounded-3xl " >
      <button className="outline-none px-4 py-4 bg-red-600 text-white rounded-3xl" onClick={() => setColor("red")}>Red</button>
      <button className="outline-none px-4 py-4 bg-blue-600 text-white rounded-3xl" onClick={() => setColor("blue")} >blue</button>
      <button className="outline-none px-4 py-4 bg-green-600  text-white rounded-3xl" onClick={() => setColor("green")} >green</button>
      <button className="outline-none px-4 py-4 bg-black text-white rounded-3xl" onClick={() => setColor("black")} >black</button>
      </div>
    </div>
    </>
  )
}

export default App
