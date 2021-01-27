import React from 'react';
import { useForm } from 'react-hook-form';
import {
  SignupFormContainer,
  FormGroup,
  SubmitButton,
  TextInput,
  InputLabel,
} from '../ui/components/StyledForm';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const { signin } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();

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
    </SignupFormContainer>
  );
};

export default UserLogin;
