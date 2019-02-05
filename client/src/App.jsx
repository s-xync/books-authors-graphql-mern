import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import BookList from "./components/BookList";

// apollo client setup
const client = new ApolloClient({
  url: "/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Hi!</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
