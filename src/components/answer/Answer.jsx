/* eslint-disable react/prop-types */
import './Answer.css'

function Answer(props) {
  const { questionId, answer, checkAnswerClicked } = props
  const isFinished = props.isFinished

  let answerColor = answer.isClicked
    ? { backgroundColor: '#D6DBF5' }
    : { backgroundColor: '#F5F7FB' }

  if (isFinished) {
    answer.isClicked
    if (answer.isRight) {
      answerColor = { backgroundColor: '#94D7A2' }
    } else if (answer.isClicked && !answer.isRight) {
      answerColor = { backgroundColor: '#F8BCBC' }
    } else if (!answer.isClicked) {
      answerColor = { backgroundColor: '#F5F7FB' }
    }
  }

  return (
    <div
      onClick={() => checkAnswerClicked(questionId, answer.id)}
      className='answer'
      style={answerColor}
    >
      {answer.text}
    </div>
  )
}

export default Answer
