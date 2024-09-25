// Login.js
import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Handle login form submission
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          // Redirect to Home page upon successful login
          this.props.history.push("/home");
        }
      })
      .catch((error) => {
        this.setState({ error: "Error logging in" });
      });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <br />
          <button type="submit">Login</button>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
        </form>
        <p>
          Don't have an account? <a href="/signup">Create an account</a>
        </p>
      </div>
    );
  }
}

export default Login;
