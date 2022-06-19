/* eslint-disable react/prop-types */
import './Home.css'
import { useState, useEffect } from 'react'

function Home(props) {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({
    id: 0,
    name: 'any',
  })
  const categoriesUrl = 'https://opentdb.com/api_category.php'

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(categoriesUrl)
      const data = await response.json()
      setCategories(data.trivia_categories)
    }

    fetchCategories()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setCategory({
      [name]: value,
    })
  }

  return (
    <div className='home-container'>
      <h1 className='title'>Quizzz</h1>
      <p className='description'>
        Select your category and difficulty and press the Start button to begin
        the Quiz. The question may be either pairs of right or wrong or multiple
        choice
      </p>
      <div className='category-selection'>
        <label className='category-label' htmlFor='category'>
          Select a category
        </label>
        <select
          id='category'
          value={category.id}
          onChange={handleChange}
          name='id'
        >
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            )
          })}
        </select>
      </div>
      <button className='start-button' onClick={() => props.start(category.id)}>
        Start quiz
      </button>
    </div>
  )
}

export default Home
