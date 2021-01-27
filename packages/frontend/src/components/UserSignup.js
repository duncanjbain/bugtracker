import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import {
  SignupFormContainer,
  FormGroup,
  SubmitButton,
  TextInput,
  InputLabel,
} from '../ui/components/StyledForm';

const ADD_USER = gql`
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
      user {
        email
      }
      token
    }
  }
`;

const UserLogin = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const [addUser] = useMutation(ADD_USER);
  const onSubmit = async (data) => {
    const { firstName, lastName, username, email, password } = data;
    await addUser({
      variables: { firstName, lastName, username, email, password },
    });
    history.push('/login');
  };
  return (
    <SignupFormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <TextInput
            id="firstName"
            type="text"
            placeholder="First name"
            name="firstName"
            ref={register({ required: true, maxLength: 80 })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Last name"
            name="lastName"
            ref={register({ required: true, maxLength: 100 })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            ref={register({ required: true, maxLength: 100 })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <TextInput
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="text"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
        </FormGroup>

        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
      <p>
        Already have an account? Click <Link to="/login">here</Link> to log in.
      </p>
    </SignupFormContainer>
  );
};

export default UserLogin;
