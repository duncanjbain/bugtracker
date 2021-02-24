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
      <h2>Log In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextInput
            id="Username"
            type="text"
            placeholder="Username"
            name="username"
            ref={register({ required: true })}
          />
          {errors.username && <p>{errors.username.message}</p>}
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
          {errors.password && <p>{errors.password.message}</p>}
        </FormGroup>

        <SubmitButton type="submit">Log In</SubmitButton>
      </form>
    </SignupFormContainer>
  );
};

export default UserLogin;
