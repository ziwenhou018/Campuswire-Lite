import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigate()

  const onClickLoginButton = async () => {
    try {
      const data = await axios.post('/account/login', { username, password })
      navigation('/')
    } catch (err) {
      alert('Sign in failed')
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
      <input type="button" value="Log In" onClick={onClickLoginButton} />
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

export default Login
