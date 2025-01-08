import { useState } from 'react'
import BotScriptLoader from './Bot'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BotScriptLoader/>
    </>
  )
}

export default App
