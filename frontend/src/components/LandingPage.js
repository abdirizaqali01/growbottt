import React, { Component } from "react";
import LoginPage from "./Login";
import SignUpPage from "./SignUp";
import ChatPage from "./Chat.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={
          <div className="container">
              <h1 className="heading">Welcome to our growbot</h1>
              <p>Please sign in or create an account</p>
              <div className="button-container">
                <Link to="/login">
                  <button className="login-btn">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="signup-btn">Sign up</button>
                </Link>
              </div>
            </div>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    );
  }
}
