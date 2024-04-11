import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from './axios'
function App() {
  const [response, setResponse] = useState('')

  React.useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const {data} = await axios.get('/test');
      setResponse(data.message)
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])
  return (
    <>
      <p>Server Response: {response}</p>
      <div>Hello</div>
    </>
  )
}

export default App
