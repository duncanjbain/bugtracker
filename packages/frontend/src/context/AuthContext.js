import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const WHOAMI_QUERY = gql`
  query {
      getWhoAmI {
    _id
    username
  }
  }
`;

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signupUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const { loading, data, refetch } = useQuery(WHOAMI_QUERY);
  const [loginUser] = useMutation(LOGIN_USER_MUTATION);
  const [signupUser] = useMutation(SIGNUP_USER_MUTATION);

  const signin = async (username, password) =>
    loginUser({ variables: { username, password } }).then((res) => {
      if (res && res.data && res.data.loginUser && res.data.loginUser.token) {
        const { token } = res.data.loginUser;
        localStorage.setItem('AUTH_TOKEN', token);
        refetch();
      } else {
        throw Error('No token returned');
      }
      console.log(res)
      return res;
    });

  const signup = (firstName, lastName, username, email, password) =>
    signupUser({
      variables: { firstName, lastName, username, email, password },
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

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    refetch();
  };

  if (loading) {
    return <p>Loading!</p>;
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AuthContext.Provider value={{ data, signin, signup, logout }} {...props} />
  );
};

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth}