import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a new user object
    const user = {
      username_or_email: usernameOrEmail,
      password: password,
    };

    // Send a POST request to the Django backend API
    axios.post('/login', user)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username_or_email">Username or Email:</label>
        <input type="text" id="username_or_email" name="username_or_email" value={usernameOrEmail} onChange={(event) => setUsernameOrEmail(event.target.value)} /><br/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br/>

        <input type="submit" value="Login"/>
      </form>
    </div>
  );
};

export default LoginPage;
