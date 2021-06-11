import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import {
  SignupFormContainer,
  StyledForm,
  LoginFormGroup,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formValidationSchema),
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;
    const login = await logIn(email, password);
    if (login.errors) {
      setError('loginError', {
        type: 'manual',
        message: login.errors[0].message,
      });
    }
  };

  return (
    <SignupFormContainer>
      <FormHeader>Log in.</FormHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <LoginFormGroup>
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextInput
            id="email"
            type="text"
            placeholder="Email"
            {...register('email', { required: true })}
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <ValidationErrMessage id="email-error" role="alert">
              {errors.email.message}
            </ValidationErrMessage>
          )}
        </LoginFormGroup>
        <LoginFormGroup>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
            aria-required="true"
            aria-invalid={errors.password ? 'true' : 'false'}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <ValidationErrMessage id="password-error" role="alert">
              {errors.password.message}
            </ValidationErrMessage>
          )}
        </LoginFormGroup>
        <SubmitButton type="submit">Log In</SubmitButton>
        {errors.loginError && (
          <ValidationErrMessage id="login-error" role="alert">
            {errors.loginError.message}
          </ValidationErrMessage>
        )}
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Don&apos;t have an account yet?{' '}
          <StyledLink to="/signup/">Sign up</StyledLink>
        </p>
      </StyledForm>
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
