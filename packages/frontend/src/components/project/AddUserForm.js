/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
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

const AddUserForm = ({ projectMembers }) => {
  const [isListShown, setListShown] = useState(false);
  const [isShowAddButton, setShowAddButton] = useState(false);
  const [getAllUsers, { data }] = useLazyQuery(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });
  const handleUserList = () => {
    getAllUsers();
    setListShown(true);
  };

  return (
    <>
      <SmallSubmitButton onClick={() => handleUserList()} type="button">
        Add User
      </SmallSubmitButton>
      <AddUserFormContainer>
        <StyledUserForm>
          {isListShown && data ? (
            <label>
              Select User
              <select
                name="userSelect"
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
