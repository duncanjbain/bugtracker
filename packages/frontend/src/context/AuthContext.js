import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const WHOAMI_QUERY = gql`
  query {
    getWhoAmI {
      id
      email
    }
  }
`;

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const { loading, data, refetch } = useQuery(WHOAMI_QUERY, {
    errorPolicy: 'all',
  });
  const [loginUser] = useMutation(LOGIN_USER_MUTATION, { errorPolicy: 'all' });
  const [signupUser] = useMutation(SIGNUP_USER_MUTATION, {
    errorPolicy: 'all',
  });

  const logIn = async (email, password) =>
    loginUser({ variables: { email, password } }).then((res) => {
      if (res && res.data && res.data.loginUser && res.data.loginUser.token) {
        const { token } = res.data.loginUser;
        localStorage.setItem('AUTH_TOKEN', token);
        refetch();
      }
      return res;
    });

  const signUp = ({ name, email, password }) =>
    signupUser({
      variables: { name, email, password },
    }).then((res) => {
      if (res && res.data && res.data.signup && res.data.signup.token) {
        const { token } = res.data.signup;
        localStorage.setItem('AUTH_TOKEN', token);
        refetch();
      } else {
        throw Error('No token returned');
      }
      return res;
    });

  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    history.push('/');
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AuthContext.Provider value={{ data, logIn, signUp, logout }} {...props} />
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
