import React from 'react';
import { useAuth } from './AuthContext';

const UserContext = React.createContext();

const UserProvider = (props) => {
  const { data } = useAuth();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UserContext.Provider value={data ? data.getWhoAmI : null} {...props} />
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
