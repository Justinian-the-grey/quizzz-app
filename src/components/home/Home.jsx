import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <h1 className='title'>Quizzz</h1>
      <p className='description'>
        Select your category and difficulty and press the Start button to begin
        the Quiz. The question may be either pairs of right or wrong or multiple
        choice
      </p>
      <button className='start-button'>Start quiz</button>
    </div>
  )
}

export default Home
