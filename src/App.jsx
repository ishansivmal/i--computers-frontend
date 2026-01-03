import { useState } from 'react'

import './App.css'
import ProductCard from './components/product-card'

function App() {
  const [count, setCount] = useState(0)

  return (<>

  <ProductCard name = "laptop 1" price = "1200$" img = "https://picsum.photos/id/1/200/300"/> 
  <ProductCard name = "laptop 2" price = "1300$" img = "https://picsum.photos/id/2/200/300"/> 
  <ProductCard name = "laptop 3" price = "1400$" img = "https://picsum.photos/id/3/200/300"/> 
  </>)
 
}

export default App
