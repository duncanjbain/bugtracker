import React from 'react';
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
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(signupValidationSchema),
  });

  const onSubmit = async (data) => {
    const signup = signUp(data);
    if (signup.errors) {
      setError('signUpError', {
        type: 'manual',
        message: signup.errors[0].message,
      });
    }
    history.push('/login');
  };
  return (
    <SignupFormContainer>
      <h2>Sign Up</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)} autocomplete="on">
        <FormGroup>
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            ref={register({ required: true })}
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
          <InputLabel htmlFor="email">Email Address</InputLabel>
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
        <FormGroup>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <TextInput
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            ref={register({ required: true })}
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
        <SubmitButton type="submit">Sign Up</SubmitButton>
        {errors.signUpError && (
          <ValidationErrMessage id="signup-error" role="alert">
            {errors.signUpError.message}
          </ValidationErrMessage>
        )}
        <p style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Already have an account? Click <Link to="/login">here</Link> to log
          in.
        </p>
      </StyledForm>
    </SignupFormContainer>
  );
};

export default UserSignup;
