import React from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

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
    const { title, body, message } = this.state;

    const formStyle = {
      maxWidth: `${500}px`,
      margin: "100px auto",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Helvetica",
    };

    return (
      <Mutation
        mutation={CREATE_POST}
        // if we error out we can set the message here
        onError={(err) => this.setState({ message: err.message })}
        // we need to make sure we update our cache once our new product is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll go to the index
        onCompleted={(data) => {
          const { title } = data.createPost;
          this.setState({
            message: `New post ${title} created successfully`,
          });
        }}
      >
        {(createPost, { data }) => (
          <div>
            <form
              onSubmit={(e) => this.handleSubmit(e, createPost)}
              style={formStyle}
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
              {/* <textarea
                onChange={this.fieldUpdate("body")}
                value={this.state.body}
                placeholder="body"
              /> */}
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Body"
                value={body}
                onChange={this.fieldUpdate("body")}
              />
              <br />
              <Button variant="contained" color="secondary" type="submit">
                Create Post
              </Button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreatePost;
