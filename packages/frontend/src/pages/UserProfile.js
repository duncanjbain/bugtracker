/* eslint-disable no-param-reassign */
import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '../context/UserContext';
import {
  FormGroup,
  TextInput,
  InputLabel,
  ValidationErrMessage,
  SubmitButton,
} from '../ui/components/StyledForm';
import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const GET_PROFILE = gql`
  query Profile {
    getWhoAmI {
      name
      email
      joinDate
      siteRole
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $id: ID!
    $name: String
    $email: String
    $password: String
  ) {
    updateUser(id: $id, name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const profileValidationSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  newPassword: yup
    .string()
    .matches(/^(|.{6,})$/, 'Password must be 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const UserProfile = () => {
  const user = useUser();
  const { addToast } = useToasts();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(profileValidationSchema),
  });
  const { loading, data } = useQuery(GET_PROFILE);
  const [updateUser] = useMutation(UPDATE_PROFILE);

  const onSubmit = async (formData) => {
    // stolen from https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript/24190282
    const falsyRemoved = Object.entries(formData).reduce(
      // eslint-disable-next-line no-return-assign
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );

    await updateUser({
      variables: { id: user.id, ...falsyRemoved },
    });
    addToast('Profile updated Successfully', {
      autoDismiss: true,
      appearance: 'success',
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <SingleColumnFlex>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <FormGroup>
            <InputLabel htmlFor="name">Name</InputLabel>
            <TextInput
              id="name"
              type="text"
              placeholder={data.getWhoAmI.name}
              autocomplete="given-name"
              name="name"
              ref={register({ required: false })}
              aria-required="false"
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
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextInput
              id="email"
              type="email"
              placeholder={data.getWhoAmI.email}
              autocomplete="email"
              name="email"
              ref={register({ required: false })}
              aria-required="false"
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
            <InputLabel htmlFor="newPassword">Password</InputLabel>
            <TextInput
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              autocomplete="new-password"
              name="newPassword"
              ref={register({ required: false })}
              aria-required="false"
              aria-invalid={errors.password ? 'true' : 'false'}
              className={errors.password ? 'error' : ''}
            />
            {errors.newPassword && (
              <ValidationErrMessage id="newPassword-error" role="alert">
                {errors.newPassword.message}
              </ValidationErrMessage>
            )}
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              autocomplete="new-password"
              name="confirmPassword"
              ref={register({ required: false })}
              aria-required="false"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <ValidationErrMessage id="confirmPassword-error" role="alert">
                {errors.confirmPassword.message}
              </ValidationErrMessage>
            )}
          </FormGroup>
          <SubmitButton style={{ padding: '0.5rem' }} type="submit">
            Update
          </SubmitButton>
        </form>
      </SingleColumnFlex>
    </>
  );
};

export default UserProfile;
