/* eslint-disable indent */
/* eslint-disable react/prop-types */
import './Questionaire.css'
import Question from '../question/Question'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

function Questionaire(props) {
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [checkReplay, setCheckReplay] = useState(false)
  const url = props.url

  function shuffleAnswers(answer) {
    var i, j, temp

    for (i = answer.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * i)
      temp = answer[i]
      answer[i] = answer[j]
      answer[j] = temp
    }
    return answer
  }

  function createNewQuestions(oldQuestions) {
    return oldQuestions.map((oldQuestion) => {
      const wrongAnswers = oldQuestion.incorrect_answers.map((ans) => {
        return {
          id: nanoid(),
          text: ans,
          isClicked: false,
          isRight: false,
        }
      })
      const rightAnswer = {
        id: nanoid(),
        text: oldQuestion.correct_answer,
        isClicked: false,
        isRight: true,
      }

      let newAnswers = []

      if (oldQuestion.type === 'boolean') {
        if (rightAnswer.text === 'True') {
          newAnswers = [rightAnswer, ...wrongAnswers]
        } else {
          newAnswers = [...wrongAnswers, rightAnswer]
        }
      } else {
        newAnswers = shuffleAnswers([...wrongAnswers, rightAnswer])
      }

      return {
        id: nanoid(),
        isAnswered: false,
        text: oldQuestion.question,
        answers: newAnswers,
      }
    })
  }

  function checkAnswerClicked(qId, aId) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        const checkedAnswers = prevQuestion.answers
        let checkedAnswer
        for (let i = 0; i < checkedAnswers.length; i++) {
          if (checkedAnswers[i].isClicked) {
            checkedAnswer = checkedAnswers[i]
          }
        }
        if (prevQuestion.isAnswered && checkedAnswer.id !== aId) {
          return prevQuestion
        }
        return prevQuestion.id === qId
          ? {
              ...prevQuestion,
              isAnswered: !prevQuestion.isAnswered,
              answers: prevQuestion.answers.map((prevAnswer) => {
                return prevAnswer.id === aId
                  ? {
                      ...prevAnswer,
                      isClicked: !prevAnswer.isClicked,
                      prevAnswer,
                    }
                  : prevAnswer
              }),
            }
          : prevQuestion
      })
    })
  }

  function handleCheckedAnswers() {
    const allQuestionedAnswered = questions.every(
      (question) => question.isAnswered
    )
    if (allQuestionedAnswered) {
      questions.forEach((question) => {
        const answers = question.answers
        answers.forEach((answer) => {
          if (answer.isClicked && answer.isRight) {
            setScore((prevScore) => prevScore + 1)
          }
        })
      })

      setIsFinished(true)
    } else {
      alert(
        'Please answer all questions before proceeding with answer validation'
      )
    }
  }

  function handleReplay() {
    setIsFinished(false)
    setScore(0)
    setCheckReplay((prev) => !prev)
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setQuestions(createNewQuestions(data.results))
    }

    fetchQuestions()
  }, [props.checkStart, checkReplay])

  return (
    <div className='questionaire-container'>
      {questions.map((questionData) => (
        <Question
          key={questionData.id}
          question={questionData}
          checkAnswerClicked={checkAnswerClicked}
          isFinished={isFinished}
        />
      ))}
      {isFinished ? (
        <div className='score-container'>
          <p className='score'>
            You scored {score}/{questions.length} correct answers
          </p>
          <button className='start-button check' onClick={handleReplay}>
            Play Again
          </button>
          <button
            className='start-button check'
            onClick={() => props.getHome()}
          >
            Go Back
          </button>
        </div>
      ) : (
        <button className='start-button check' onClick={handleCheckedAnswers}>
          Check Answers
        </button>
      )}
    </div>
  )
}

export default Questionaire
