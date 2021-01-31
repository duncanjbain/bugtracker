/* eslint-disable no-param-reassign */
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useUser } from '../context/UserContext';
import { FormGroup, TextInput, InputLabel } from '../ui/components/StyledForm';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';

const GET_PROFILE = gql`
  query Profile {
    getWhoAmI {
      firstName
      lastName
      email
      username
      joinDate
      siteRole
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $_id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
    }
  }
`;

const UserProfile = () => {
  const user = useUser();
  const { register, handleSubmit } = useForm();
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
      // eslint-disable-next-line no-underscore-dangle
      variables: { _id: user._id, ...falsyRemoved },
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <ProfileContainer>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <FormGroup>
          <InputLabel htmlFor="firstName">First name</InputLabel>
          <TextInput
            id="firstName"
            type="text"
            placeholder={data.getWhoAmI.firstName}
            autocomplete="given-name"
            name="firstName"
            ref={register({ required: false })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="lastName">Last name</InputLabel>
          <TextInput
            id="lastName"
            type="text"
            placeholder={data.getWhoAmI.lastName}
            autocomplete="family-name"
            name="lastName"
            ref={register({ required: false })}
          />
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
          />
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
          />
        </FormGroup>
        <UpdateButton style={{ padding: '0.5rem' }} type="submit">
          Update
        </UpdateButton>
      </form>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.section`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-top: 5px solid ${(props) => props.theme.colors.primary};
  color: #4a4a4a;
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
`;

const UpdateButton = styled.button`
  margin: 0.5rem;
`;
