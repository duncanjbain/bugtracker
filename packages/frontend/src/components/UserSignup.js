import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../context/AuthContext';
import {
  SignupFormContainer,
  FormGroup,
  StyledForm,
  SubmitButton,
  TextInput,
  InputLabel,
  ValidationErrMessage,
} from '../ui/components/StyledForm';

const signupValidationSchema = yup.object().shape({
  name: yup.string().required('A name is required'),
  email: yup.string().email().required('An email address is required'),
  password: yup
    .string()
    .min(6, 'Password must be 6 characters')
    .required('A password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const UserSignup = () => {
  const { signUp } = useAuth();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(signupValidationSchema),
  });

  const onSubmit = async (data) => {
    const signup = await signUp(data);
    if (signup.errors) {
      setError('signUpError', {
        type: 'manual',
        message: signup.errors[0].message,
      });
      return;
    }
    history.push('/login');
  };
  return (
    <SignupFormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)} autocomplete="on">
        <fieldset style={{ width: '100%', border: 'none' }}>
          <legend>
            <StyledSignupFormLegend>Sign Up</StyledSignupFormLegend>
          </legend>
          <FormGroup>
            <InputLabel data-cy="name-label" htmlFor="name">
              Name
            </InputLabel>
            <TextInput
              id="name"
              type="text"
              data-cy="name-input"
              placeholder="Name"
              {...register('name', { required: true })}
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <ValidationErrMessage id="name-error" role="alert">
                {errors.name.message}
              </ValidationErrMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputLabel data-cy="email-label" htmlFor="email">
              Email Address
            </InputLabel>
            <TextInput
              id="email"
              type="text"
              data-cy="email-input"
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
          </FormGroup>
          <FormGroup>
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
          </FormGroup>
          <FormGroup>
            <InputLabel
              data-cy="confirmPassword-label"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </InputLabel>
            <TextInput
              id="confirmPassword"
              type="password"
              data-cy="confirmPassword-input"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
              aria-required="true"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <ValidationErrMessage id="confirmPassword-error" role="alert">
                {errors.confirmPassword.message}
              </ValidationErrMessage>
            )}
          </FormGroup>
        </fieldset>
        <SubmitButton data-cy="submit-register" type="submit">
          Sign Up
        </SubmitButton>
        {errors.signUpError && (
          <ValidationErrMessage id="signup-error" role="alert">
            {errors.signUpError.message}
          </ValidationErrMessage>
        )}
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Already have an account?{' '}
          <Link data-cy="login-link" to="/login">
            Log in!
          </Link>
        </p>
      </StyledForm>
    </SignupFormContainer>
  );
};

export default UserSignup;

export const StyledSignupFormLegend = styled.h2`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;
