import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import {
  SignupFormContainer,
  FormGroup,
  SubmitButton,
  TextInput,
  InputLabel,
  ValidationErrMessage,
  FormHeader,
} from '../ui/components/StyledForm';

const formValidationSchema = yup.object().shape({
  email: yup.string().email().required('Email address is required'),
  password: yup.string().required('Password is required'),
});

const UserLogin = () => {
  const { logIn } = useAuth();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formValidationSchema),
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    logIn(email, password);
  };

  return (
    <SignupFormContainer>
      <FormHeader>Log in.</FormHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            ref={register({ required: true })}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <ValidationErrMessage id="email-error" role="alert">
              {errors.email.message}
            </ValidationErrMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
            aria-required="true"
            aria-invalid={errors.password ? 'true' : 'false'}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <ValidationErrMessage id="password-error" role="alert">
              {errors.password.message}
            </ValidationErrMessage>
          )}
        </FormGroup>
        <SubmitButton type="submit">Log In</SubmitButton>
      </form>
      <p style={{ marginTop: '2rem' }}>
        Don&apos;t have an account yet?{' '}
        <StyledLink to="/signup/">Sign up</StyledLink>
      </p>
    </SignupFormContainer>
  );
};

export default UserLogin;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.dark};
    text-decoration: underline;
  }
`;
