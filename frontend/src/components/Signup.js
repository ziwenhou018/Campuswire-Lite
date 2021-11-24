import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigate()

  const onClickSignUpButton = async () => {
    try {
      const data = await axios.post('/account/signup', { username, password })
      navigation('/')
    } catch (err) {
      alert('Sign up failed')
    }
  }

  return (
    <div>
      <input
        type="text"
        onChange={e => setUsername(e.target.value)}
        value={username}
        placeholder="Username..."
      />
      <input
        type="text"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder="Password..."
      />
      <input type="button" value="Sign Up" onClick={onClickSignUpButton} />
      <Link to="/login">Log In</Link>
    </div>
  )
}

export default Signup
