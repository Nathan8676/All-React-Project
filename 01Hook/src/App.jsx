import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [counter, setCounter] = useState(10)

 /*  const checkingValue = () => {
    if(counter === 0){
      return false;
    }else if(counter === 20){
      return true;
    }else{
      return;
    } */
  
  
  const addValue = () =>{
    
   if(counter === 20 ){
    return;
   }else{
        counter = counter + 1 
        setCounter(counter)
        console.log(counter)
   }
  }
  const removeValue = () => {
    
   if(counter === 0){
    return;
   }else{
     counter = counter -1
     setCounter(counter)
     console.log(counter)
   }
  }
  return (
    <>
    <h1>Starting Project</h1>
    <h2>Counter value: {counter} </h2>

    <button
    onClick={addValue}
    >Add value {counter=== 20 ? 20 : counter +1}</button>
    <br />
    <button
    onClick={removeValue}
    >Remove value {counter === 0 ? 0 : counter - 1} </button>
    <p>footer: {counter}</p>
    </>
  )
}

export default App
