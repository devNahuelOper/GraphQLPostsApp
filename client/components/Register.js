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

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    console.log(data);
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn },
    });
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
          this.props.history.push("/");
        }}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {(registerUser) => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerUser({
                  variables: {
                    name,
                    email,
                    password,
                  },
                });
              }}
            >
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={this.fieldUpdate("name")}
              />
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={this.fieldUpdate("email")}
              />
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.fieldUpdate("password")}
              />
              <br />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
