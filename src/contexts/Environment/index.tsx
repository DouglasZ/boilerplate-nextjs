import React, { createContext, useContext } from 'react';
import { getEnv, ConfigInterface } from '../../../config';

export const EnvironmentContext = createContext({} as ConfigInterface);

export default function EnvironmentProvider({ children }) {
  return <EnvironmentContext.Provider value={getEnv()}>{children}</EnvironmentContext.Provider>;
}

export const useEnvironment = (): ConfigInterface => {
  return useContext(EnvironmentContext);
};
