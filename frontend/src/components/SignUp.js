import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRetype, setPasswordRetype] = useState('');
  const [region, setRegion] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordRetype) {
      alert("Passwords do not match");
      return;
    }

    // Create a new user object
    const user = {
      username,
      email,
      password,
      region,
    };

    // Send a POST request to the Django backend API
    axios.post('/signup', user)
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
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} /><br/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br/>

        <label htmlFor="password_retype">Retype Password:</label>
        <input type="password" id="password_retype" name="password_retype" value={passwordRetype} onChange={(event) => setPasswordRetype(event.target.value)} /><br/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} /><br/>

        <label htmlFor="region">Region:</label>
        <select id="region" name="region" value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="north-america">North America</option>
          <option value="south-america">South America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="africa">Africa</option>
          <option value="australia">Australia</option>
        </select><br/>

        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  );
};

export default SignUpPage;
