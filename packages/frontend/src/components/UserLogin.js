import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SignupFormContainer,
  FormGroup,
  SubmitButton,
  TextInput,
  InputLabel,
  ValidationErrMessage,
  FormHeader,
} from '../ui/components/StyledForm';
import { useAuth } from '../context/AuthContext';

const formValidationSchema = yup.object().shape({
  username: yup.string().required('A username is required'),
  password: yup.string().required('A password is required'),
});

const UserLogin = () => {
  const { signin } = useAuth();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formValidationSchema),
  });

  const onSubmit = async (formData) => {
    const { username, password } = formData;
    signin(username, password);
  };

  return (
    <SignupFormContainer>
      <main style={{ padding: '1rem' }}>
        <FormHeader>Log In</FormHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              ref={register({ required: true })}
              aria-required="true"
              aria-invalid={errors.username ? 'true' : 'false'}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <ValidationErrMessage id="username-error" role="alert">
                {errors.username.message}
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
      </main>
    </SignupFormContainer>
  );
};

export default UserLogin;
