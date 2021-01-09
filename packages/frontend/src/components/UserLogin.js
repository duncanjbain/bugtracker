import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ReactComponent as BugFixLogo } from '../assets/svg/undraw_bug_fixing.svg';

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

const SignupFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FormGroup = styled.div`
  padding: 0.5rem;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  padding-right: 0.5rem;
`;

const SubmitButton = styled.button`
  align-self: center;
`;

const UserLogin = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <LoginContainer>
      <CallToAction>
        <CtaHeader>Bug Tracker</CtaHeader>
        <CtaSubHeader>Track, manage and squash those bugs!</CtaSubHeader>
        <StyledBugFixLogo />
      </CallToAction>
      <SignupFormContainer>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              name="First name"
              ref={register({ required: true, maxLength: 80 })}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              name="Last name"
              ref={register({ required: true, maxLength: 100 })}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <input
              id="password"
              type="text"
              placeholder="Password"
              name="Password"
              ref={register({ required: true })}
            />
          </FormGroup>

          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>
        <p>Already have an account? Click here to sign in.</p>
      </SignupFormContainer>
    </LoginContainer>
  );
};

export default UserLogin;
