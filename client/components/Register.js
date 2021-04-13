import React from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

    const formStyle = {
      maxWidth: `${500}px`,
      margin: "100px auto",
      display: "flex",
      flexDirection: "column",
    };

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
              style={formStyle}
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
              <TextField
                label="Name"
                placeholder="Name"
                value={name}
                variant="outlined"
                fullWidth
                onChange={this.fieldUpdate("name")}
              />
              {/* <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={this.fieldUpdate("name")}
              /> */}
              <br />
              {/* <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={this.fieldUpdate("email")}
              /> */}
              <TextField
                label="Email"
                placeholder="Email"
                type="email"
                value={email}
                variant="outlined"
                fullWidth
                onChange={this.fieldUpdate("email")}
              />
              <br />
              {/* <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.fieldUpdate("password")}
              /> */}
              <TextField
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                variant="outlined"
                fullWidth
                onChange={this.fieldUpdate("password")}
              />
              <br />
              {/* <button type="submit">Register</button> */}
              <Button variant="contained" color="primary">
                Register
              </Button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
