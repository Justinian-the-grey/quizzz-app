import './App.css'
import Home from './components/home/Home'
import Questionaire from './components/questionaire/Questionaire'
import { useState } from 'react'

function App() {
  //const start1 = false
  const [start, setStart] = useState(false)
  const [url, setUrl] = useState('')

  function startQuiz(newUrl) {
    setStart(true)
    console.log('url number: ' + newUrl)
    if (newUrl !== '0')
      setUrl(`https://opentdb.com/api.php?amount=5&category=${newUrl}`)
    else setUrl('https://opentdb.com/api.php?amount=5')
  }

  function getHome() {
    setStart(false)
  }

  return (
    <div className='App'>
      {!start && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 190'>
          <path
            fill='#4d5b9e'
            fillOpacity='1'
            d='M0,32L40,64C80,96,160,160,240,160C320,160,400,96,480,80C560,64,640,96,720,96C800,96,880,64,960,80C1040,96,1120,160,1200,181.3C1280,203,1360,181,1400,170.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z'
          ></path>
        </svg>
      )}
      <div className='conatiner'>
        {start ? (
          <Questionaire checkStart={start} url={url} getHome={getHome} />
        ) : (
          <Home start={startQuiz} />
        )}
      </div>
    </div>
  )
}

export default App
