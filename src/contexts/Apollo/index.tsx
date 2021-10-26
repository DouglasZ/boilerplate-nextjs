import React from 'react';

import { ApolloProvider } from '@apollo/client';

import { client } from './client';

const Apollo = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
