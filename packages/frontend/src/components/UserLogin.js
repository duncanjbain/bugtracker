import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { ReactComponent as BugFixLogo } from '../assets/svg/undraw_bug_fixing.svg';
import {
  SignupFormContainer,
  FormGroup,
  SubmitButton,
  TextInput,
  InputLabel,
} from '../ui/components/StyledFormComponents';

const LoginContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 0.75fr 1fr;
`;

const CallToAction = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 1rem;
`;

const CtaHeader = styled.h1`
  color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  font-weight: bold;
  font-size: 3.75rem;
  line-height: 1;
`;

const CtaSubHeader = styled.h2`
  color: ${(props) => props.theme.colors.dark};
  padding: 1rem;
`;

const StyledBugFixLogo = styled(BugFixLogo)`
  width: 100%;
  height: auto;
`;

const SIGNIN_USER = gql`
  mutation signinUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

const UserLogin = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const [signinUser] = useMutation(SIGNIN_USER);

  const onSubmit = async (formData) => {
    const { username, password } = formData;
    const {data} = await signinUser({ variables: { username, password } });
    await localStorage.setItem('token', data.signinUser.token);

  };

  return (
    <LoginContainer>
      <CallToAction>
        <CtaHeader>Bug Tracker</CtaHeader>
        <CtaSubHeader>Track, manage and squash those bugs!</CtaSubHeader>
        <StyledBugFixLogo />
      </CallToAction>
      <SignupFormContainer>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <TextInput
              id="Username"
              type="text"
              placeholder="Username"
              name="username"
              ref={register({ required: true})}
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

          <SubmitButton type="submit">Log In</SubmitButton>
        </form>
        <p>Don&apos;t have an account? Click here create one.</p>
      </SignupFormContainer>
    </LoginContainer>
  );
};

export default UserLogin;
