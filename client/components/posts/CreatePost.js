import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Colors from "../Colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { CREATE_POST } from "../../graphql/mutations";
import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  query fetchPosts {
    posts {
      id
      title
      body
    }
  }
`;

class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      message: "",
      messageType: "success",
    };
  }

  fieldUpdate(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  // we need to remember to update our cache directly with our new product
  updateCache(cache, { data }) {
    let posts;
    try {
      // if we've already fetched the posts then we can read the
      // query here
      posts = cache.readQuery({ query: FETCH_POSTS });
    } catch (err) {
      return;
    }
    // if we had previously fetched products we'll add our new product to our cache
    if (posts) {
      let postArray = posts.posts;
      let newPost = data.newPost;
      cache.writeQuery({
        query: FETCH_POSTS,
        data: { products: postArray.concat(newPost) },
      });
    }
  }

  handleSubmit(e, createPost) {
    e.preventDefault();
    // we'll handle the author in our resolver
    createPost({
      variables: {
        title: this.state.title,
        body: this.state.body,
      },
    });
  }

  render() {
    const { title, body, message, messageType } = this.state;

    const theme = createMuiTheme({
      palette: {
        primary: {
          light: Colors.customShade("lightBlue", 300),
          main: Colors.lightBlueAccent,
          dark: Colors.customShade("lightBlue", 700),
        },
      },
    });

    return (
      <Mutation
        mutation={CREATE_POST}
        // if we error out we can set the message here
        onError={(err) =>
          this.setState({ message: err.message, messageType: "error" })
        }
        // we need to make sure we update our cache once our new product is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll go to the index
        onCompleted={(data) => {
          const { title } = data.createPost;
          this.setState({
            message: `New post ${title} created successfully`,
            messageType: "success",
          });
        }}
      >
        {(createPost, { data }) => (
          <div className="form__wrap createPost__wrap">
            <form
              id="createPostForm"
              onSubmit={(e) => this.handleSubmit(e, createPost)}
              // style={formStyle}
            >
              <TextField
                label="Title"
                placeholder="Title"
                value={title}
                variant="outlined"
                fullWidth
                onChange={this.fieldUpdate("title")}
              />
              <br />
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Body"
                value={body}
                onChange={this.fieldUpdate("body")}
              />
              <br />
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" color="primary" type="submit">
                  Create Post
                </Button>
              </MuiThemeProvider>
            </form>
            <p className={messageType}>{message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;
