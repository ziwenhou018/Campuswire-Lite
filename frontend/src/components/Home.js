import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [username, setUsername] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currQuestion, setCurrQuestion] = useState({ _id: '' })

  const navigation = useNavigate()

  const logout = async () => {
    axios.post('/account/logout').then(() => {
      navigation('/login')
    })
  }

  const checkLoggedIn = async () => {
    const { data } = await axios.get('/account/isLoggedIn')
    setUsername(data)
  }

  const fetchQuestions = async () => {
    const { data } = await axios.get('/api/questions/')
    setQuestions(data)
  }

  const onQuestionClick = question => {
    if (question._id === currQuestion._id) {
      setCurrQuestion({ _id: '' })
    } else {
      setCurrQuestion(question)
    }
  }

  useEffect(() => checkLoggedIn(), [])

  useEffect(() => fetchQuestions(), [])

  return (
    <div>
      <div>
        {username ? (
          <div>
            <div>{username}</div>
            <input type="button" value="Log out" onClick={logout} />
          </div>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
      <div>
        {questions.map(question => (
          <div>
            <input
              key={question._id}
              type="button"
              value={question.questionText}
              onClick={() => onQuestionClick(question)}
            />
          </div>
        ))}
      </div>
      <div>{currQuestion._id ? <div>{currQuestion._id}</div> : null}</div>
    </div>
  )
}

export default Home
