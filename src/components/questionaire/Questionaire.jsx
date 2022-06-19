import './Questionaire.css'
import Question from '../question/Question'
import { useState, useEffect } from 'react'

function Questionaire() {
  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState([])
  const url = 'https://opentdb.com/api.php?amount=5'

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setQuestions(data.results)
    }

    fetchQuestions()
  }, [])

  return (
    <div className='questionaire-container'>
      {questions.map((questionData, index) => (
        <Question key={index} question={questionData} />
      ))}
      <button className='start-button check'>Check Answers</button>
    </div>
  )
}

export default Questionaire
