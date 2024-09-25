import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Handle signup form submission
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          // Redirect to Login page upon successful signup
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        this.setState({ error: "Error signing up" });
      });
  };

  render() {
    return (
      <div>
        <h2>Signup</h2>
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
          <button type="submit">Signup</button>
          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    );
  }
}

export default Signup;
