import React from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={(data) => {
          console.log(data);
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
        }}
      >
        {(registerUser) => (
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              registerUser({
                variables: {
                  name,
                  email,
                  password
                }
              })
            }}>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={this.update("name")}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={this.update("email")}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.update("password")}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
