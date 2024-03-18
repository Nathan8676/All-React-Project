import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "Piyush",
    age: 18
  }

  return (
   <>
    <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4 '> tailwind test</h1>
    <Card  username="Piyush" age="23" />
    <Card username="vishu" age="21" />
   </>
  )
}

export default App
