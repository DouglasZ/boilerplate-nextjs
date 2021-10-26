import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { getEnv } from '../../../config';
import i18n from 'i18next';

const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;
const locale = navigator && navigator.language;

const headers = {
  'App-Client-Name': 'boom-client',
  'App-Client-Version': 0.1,
  'Time-Zone': `${timezoneOffset}`,
  'Accept-Language': locale,
};

let countWs = 0;

const getApolloLink = () => {
  const { graphqlWs, graphqlUri } = getEnv();
  const token = '';
  const userid = '';
  const username = '';

  const authLink = setContext((_, { ...context }) => {
    return {
      headers: {
        authorization: token,
        userid: userid,
        username: username,
      },
      ...context,
    };
  });

  const httpLink = new HttpLink({
    uri: graphqlUri,
    credentials: 'same-origin',
    headers: {
      ...headers,
      authorization: token,
      userid: userid,
      username: username,
    },
  });

  const wsClient = new SubscriptionClient(graphqlWs, {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      return {
        ...headers,
        authorization: token,
        userid: userid,
        username: username,
      };
    },
  });

  wsClient.onConnected(() => {
    console.log('conectado.');
  });
  wsClient.onReconnecting(() => {
    console.log('reconectando.');
    toast.dismiss();
  });
  wsClient.onReconnected(() => {
    console.log('reconectado.');
    if (countWs > 2) {
      toast.info(i18n.t('message.reconnectedServer'), {
        toastId: 'onReconnected',
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
      countWs = 0;
    }
  });
  wsClient.onDisconnected(() => {
    console.log('desconectado.');
    if (token) {
      if (countWs > 2) {
        toast.error(i18n.t('message.connectionServerLost'), {
          toastId: 'onDisconnected',
          autoClose: 5000,
          pauseOnFocusLoss: false,
        });
      }
      countWs++;
    }
  });

  const wsLink = new WebSocketLink(wsClient);

  const httpError = onError(({ graphQLErrors }) => {
    if (!graphQLErrors) return;
    const error = graphQLErrors[0].extensions;
    const code = error.exception ? error.exception.status : error.response ? error.response.statusCode : '';
    if (code === 401) {
      window.location.href = '/error/' + code;
    } else if (code === 400) {
      const message = error.exception
        ? error.exception.response.message
        : error.response
        ? error.response.message
        : 'Error: ' + code;
      toast.error(message, { toastId: 'errorCode400' });
    }
  });

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    authLink.concat(wsLink),
    authLink.concat(httpError.concat(httpLink)),
  );
};

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {},
  }),
  link: getApolloLink(),
});
