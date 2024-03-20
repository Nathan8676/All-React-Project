import { useState, useCallback, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  
  //useref 
  const passwordRef =useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|:;\"'<>,.?/";
    
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
    setCopied(false)
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  
  const handelCopy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
    }).catch((error) => {
      console.error('Failed to copy:', error);
      setCopied(false);
    });
  }, [password, passwordRef]);

  const refreshPassword = useCallback(() => {
    passwordGenerator()
  },[])
  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md px-4 rounded-xl my-8 text-orange-600 bg-gray-700">
        <h1 className="text-center text-4xl">Password generator</h1>
      </div>

      <div className="mb-4 flex shadow rounded-lg overflow-hidden">
        <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button className='bg-blue-600 text-xl px-3 py-3'
        onClick={handelCopy} >{copied ? 'copied' : 'copy'}</button>
        <button className='bg-blue-600 text-xl px-3 py-3'
        onClick={refreshPassword} >Refresh</button>
      </div>

      <div className='flex items-center gap-x-2'>
        <input 
          type="range" 
          min={5}
          max={101}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          className='cursor-pointer'
        />
        <label> Length: {length}</label>

        <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {setNumberAllowed((prev) => !prev);}}
        />
        <label htmlFor="numberInput">Number</label>

        <input 
          type="checkbox"
          defaultChecked={charAllowed}
          id='charInput'
          onChange={() => {setCharAllowed((prev) => !prev);}}
        />
        <label htmlFor="charInput">Characters</label>
      </div>
    </>
  );
}

export default App;
