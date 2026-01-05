import { useState } from 'react'

import './App.css'
import ProductCard from './components/product-card'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (<>
 <div className="w-[600px] h-[600px] bg-gray-600 relative border-2 relative ">
      <div className="bg-amber-300 w-[500px] h-[500px] flex flex-col justify-center items-center  ">
            <div className='w-[100px] h-[100px] bg-blue-500 fixed left-[550px] top-[300px]'>

            </div>
            <div className='w-[100px] h-[100px] bg-red-500 absolute bottom-[100px] right-[100px]'>

            </div>
            <div className='w-[100px] h-[100px] bg-pink-500'>


            </div>
            <div className='w-[100px] h-[100px] bg-green-500'>

            </div>
      </div>
 </div>
  </>)
 
}

export default App
