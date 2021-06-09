/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import {
  SmallSubmitButton,
  SmallSuccessButton,
} from '../../ui/components/StyledForm';

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      name
      memberOfProjects {
        projectKey
        projectName
      }
    }
  }
`;

const ADD_USER_TO_PROJECT = gql`
  mutation AddUserToProject($projectKey: String!, $userId: ID!) {
    addUserToProject(projectKey: $projectKey, userId: $userId) {
      projectName
    }
  }
`;

const AddUserForm = ({ projectMembers, projectKey, refetch }) => {
  const { addToast } = useToasts();
  const [isListShown, setListShown] = useState(false);
  const [isShowAddButton, setShowAddButton] = useState(false);

  const { register, handleSubmit } = useForm();

  const [getAllUsers, { data }] = useLazyQuery(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  const [addUserToProject] = useMutation(ADD_USER_TO_PROJECT);
  const handleUserList = () => {
    getAllUsers();
    setListShown(true);
  };

  const onSubmit = async (formData) => {
    try {
      await addUserToProject({
        variables: {
          userId: formData.userSelect,
          projectKey,
        },
      });
      addToast('User successfully added!', {
        autoDismiss: true,
        appearance: 'success',
      });
      refetch();
    } catch (error) {
      addToast(`Oh no! ${error}`, {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  };

  return (
    <>
      <SmallSubmitButton onClick={() => handleUserList()} type="button">
        Add User
      </SmallSubmitButton>
      <AddUserFormContainer>
        <StyledUserForm onSubmit={handleSubmit(onSubmit)}>
          {isListShown && data ? (
            <label>
              Select User
              <select
                {...register('userSelect', { required: true })}
                id="userSelect"
                onChange={() => setShowAddButton(true)}
              >
                <option value="" disabled selected>
                  Select User
                </option>
                {data.getAllUsers
                  .filter((allUser) =>
                    projectMembers.every(
                      (projectMember) =>
                        !projectMember.name.includes(allUser.name)
                    )
                  )
                  .map((filteredUser) => (
                    <option key={filteredUser.id} value={filteredUser.id}>
                      {filteredUser.name}
                    </option>
                  ))}
              </select>
            </label>
          ) : null}
          {isShowAddButton ? (
            <SmallSuccessButton type="submit">Add</SmallSuccessButton>
          ) : null}
        </StyledUserForm>
      </AddUserFormContainer>
    </>
  );
};

export default AddUserForm;

const AddUserFormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledUserForm = styled.form`
  display: flex;
  flex-direction: row;
`;
