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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <fieldset style={{ width: '100%', border: 'none' }}>
          <legend>
            <StyledLoginFormLegend>Log In</StyledLoginFormLegend>
          </legend>
          <LoginFormGroup>
            <InputLabel data-cy="email-label" htmlFor="email">
              Email
            </InputLabel>
            <TextInput
              id="email"
              type="text"
              placeholder="Email"
              {...register('email', { required: true })}
              aria-required="true"
              data-cy="email-input"
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
            <InputLabel data-cy="password-label" htmlFor="password">
              Password
            </InputLabel>
            <TextInput
              id="password"
              type="password"
              data-cy="password-input"
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
        </fieldset>
        <SubmitButton type="submit" data-cy="submit-login">
          Log In
        </SubmitButton>
        {errors.loginError && (
          <ValidationErrMessage id="login-error" role="alert">
            {errors.loginError.message}
          </ValidationErrMessage>
        )}
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Don&apos;t have an account yet?{' '}
          <StyledLink data-cy="signup-link" to="/signup/">
            Sign up
          </StyledLink>
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

export const StyledLoginFormLegend = styled.h2`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;
