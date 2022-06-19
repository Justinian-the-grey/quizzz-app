/* eslint-disable react/prop-types */
import './Question.css'
import Answer from '../answer/Answer'

function Question(props) {
  const { text, answers, id } = props.question
  const checkAnswerClicked = props.checkAnswerClicked
  const isFinished = props.isFinished

  function cleanAnswers(oldAnswers) {
    return oldAnswers.map((oldAnswer) => {
      return {
        ...oldAnswer,
        text: customReplaceAll(oldAnswer.text),
      }
    })
  }

  const checkedAnswers = cleanAnswers(answers)
  const checkedQuestion = customReplaceAll(text)

  function customReplaceAll(str) {
    return str
      .replaceAll('&#039;', ' ')
      .replaceAll('&quot;', '"')
      .replaceAll('&', '')
      .replaceAll('uml;', '')
      .replaceAll('lt;', '<')
      .replaceAll('gt;', '>')
  }

  return (
    <div className='question-container'>
      <p className='question'>{checkedQuestion}</p>
      <div className='answers'>
        {checkedAnswers.map((answerData) => {
          return (
            <Answer
              key={answerData.id}
              questionId={id}
              answer={answerData}
              checkAnswerClicked={checkAnswerClicked}
              isFinished={isFinished}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Question
