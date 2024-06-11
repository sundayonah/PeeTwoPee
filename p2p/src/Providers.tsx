import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./state/store";
import theme from "./theme";
import getLibrary from "./utils/getLibrary";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import { NetworkContextName } from "./constants/index";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import ListsUpdater from "./state/lists/updater";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
function Updaters() {
  return (
    <>
      <ListsUpdater />
    </>
  ); 
}

const Web3ReactProviderReloaded = createWeb3ReactRoot(NetworkContextName);

const httpLink = createHttpLink({
   // uri: 'http://localhost:5000/api',
  uri: "https://p2p-back-end.herokuapp.com/api",
});

//ws conn
const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://p2p-back-end.herokuapp.com/api",
  })
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("authToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});


const AppProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactProviderReloaded getLibrary={getLibrary}>
        {/* @ts-ignore */}
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Updaters />
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </Provider>
        </ApolloProvider>
      </Web3ReactProviderReloaded>
    </Web3ReactProvider>
  );
};

export default AppProvider;