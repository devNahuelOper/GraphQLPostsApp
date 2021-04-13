import React from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Colors from "./Colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
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
    const { name, email, password, showPassword } = this.state;

    const formStyle = {
      maxWidth: `${500}px`,
      margin: "100px auto",
      display: "flex",
      flexDirection: "column",
    };

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: Colors.customShade('blueGrey', 300),
          main: Colors.customShade('blueGrey', 500),
          dark: Colors.customShade("blueGrey",700)
        },
      },
    });
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
              <br />
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
              <TextField
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                variant="outlined"
                fullWidth
                onChange={this.fieldUpdate("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle Password Visibility"
                        onClick={this.toggleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <MuiThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </MuiThemeProvider>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
