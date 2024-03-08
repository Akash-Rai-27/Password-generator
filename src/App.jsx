import { useState , useCallback ,useEffect ,useRef} from 'react'



function App() {

  

  const [length, setLength] = useState(8);

  const [numAll, setNumAll] = useState(false);

  const [chtAllowed , setchtAllowed] = useState(false);

  const[password , setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAll){
      str  += "0123456789"
    }
    if(chtAllowed){
      str  += "!@#$%^&*()_-+/?><][{}"
    }

    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)


  },[length, numAll, chtAllowed, setPassword ])

  const copyPassWordToClip = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,111)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length, numAll, chtAllowed, passwordGenerator]);

  document.querySelector('body').style.backgroundColor = "#222";
  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8  text-orange-500 bg-gray-600 h-96 '>
         <h1 className='text text-4xl text-center text-white mx-2 my-4 mt-20 '>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-10 px-6'>
            <input 
              type='text' 
              value={password} 
              className='outline-none w-full py-1 px-3 text-slate-900'
              placeholder='Password'
              readOnly 
                ref = {passwordRef}
              />
              {/* <button id = "btn"className='outline-none text-white px-3 py-0.5 shrink-0  hover:bg-orange-400 bg-blue-700' onClick={copyPassWordToClip}> Copy</button> */}
              <button id = "btn" className='outline-none text-white px-3 py-0.5 shrink-0  hover:bg-orange-400 bg-green-700 ' onClick= {()=>{
                copyPassWordToClip();
                document.querySelector("#btn").style.backgroundColor = "red";
              }}> Copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1 accent-orange-400 mx-6'>
                <input 
                  type='range'
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                    />
                <label className=' text-white'>Length: {length}</label>
              </div>
              <div className='flex items-center gap-x-1 accent-green-600'>
                <input 
                  type='checkbox'
                  defaultChecked = {numAll}
                  id='numberInput'
                  onChange={()=>{
                    setNumAll((prev) => !prev);
                  }}
                    />
                <label className=' text-white'>Number</label>
              </div>
              <div className='flex items-center gap-x-1 accent-green-600'>
                <input 
                  type='checkbox'
                  defaultChecked = {chtAllowed}
                  id='numberInput'
                  onChange={()=>{
                    setchtAllowed((prev) => !prev);
                  }}
                    />
                <label className=' text-white'>Characters</label>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
