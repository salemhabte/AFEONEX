import { useState } from 'react'
import Weather from './weather'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Weather/>
    </>
  )
}

export default App
