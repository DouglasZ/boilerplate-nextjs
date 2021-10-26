import packageJson from './package.json';

export interface ConfigInterface {
  name: string;
  env: 'development' | 'production' | 'localhost';
  frontHostname: string;
  backHostname: string;
  graphqlUri: string;
  graphqlWs: string;
  version: string;
}

const configLocal: ConfigInterface = {
  name: 'LOCALHOST',
  env: 'localhost',
  frontHostname: 'http://192.168.15.172:3000',
  backHostname: 'http://localhost:6969',
  graphqlUri: 'http://localhost:6969/graphql',
  graphqlWs: 'ws://localhost:6969/graphql',
  version: packageJson.version,
};

export const getEnv = (): ConfigInterface => {
  switch (location.host) {
    case 'localhost:3000':
      return configLocal;
    default:
      return configLocal;
  }
};
