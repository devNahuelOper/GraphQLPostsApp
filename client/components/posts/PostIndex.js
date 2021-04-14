import React from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  query fetchPosts {
    posts {
      id
      title
      body
      author {
        name
        email
      }
    }
  }
`;

const App = () => {
  return (
    <Query query={FETCH_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          <ul className="post-index">
            {data.posts.map((post) => (
              <li key={post.id} className="post">
                <h2>{post.title}
                 {post.author && <h6 className="post-author">{post.author.name}</h6>}
                </h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default App;
