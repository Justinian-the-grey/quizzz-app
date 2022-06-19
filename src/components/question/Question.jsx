/* eslint-disable react/prop-types */
import './Question.css'

function Question(props) {
  const {
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
  } = props.question

  console.log(category, type, difficulty)

  const answers = [...incorrect_answers, correct_answer]

  function cleanAnswers(strs) {
    return strs
      .map((str) => str.replaceAll('&#039;', ' '))
      .map((str) => str.replaceAll('&quot;', '"'))
      .map((str) => str.replaceAll('&', ''))
      .map((str) => str.replaceAll('uml;', ''))
  }

  const checkedAnswers = cleanAnswers(answers)
  const checkedQuestion = question
    .replaceAll('&#039;', ' ')
    .replaceAll('&quot;', '"')
    .replaceAll('&', '')
    .replaceAll('uml;', '')

  return (
    <div className='question-container'>
      <p className='question'>{checkedQuestion}</p>
      <div className='answers'>
        {checkedAnswers.map((answer, index) => {
          return (
            <p key={index} className='answer'>
              {answer}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Question
