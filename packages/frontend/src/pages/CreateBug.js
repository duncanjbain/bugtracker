/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MDEditor from '@uiw/react-md-editor';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from '../context/UserContext';
import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import {
  FormGroup,
  TextInput,
  InputLabel,
  SubmitButton,
} from '../ui/components/StyledForm';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const GET_USER_PROJECTS = gql`
  query getUserProjects($userID: ID!) {
    getUserProjects(userID: $userID) {
      id
      projectName
      projectKey
    }
  }
`;

const GET_PROJECT_MEMBERS = gql`
  query getProjectMembers($projectKey: String!) {
    getProjectMembers(projectKey: $projectKey) {
      id
      name
    }
  }
`;

const CREATE_NEW_BUG = gql`
  mutation createBug(
    $key: String!
    $summary: String!
    $description: String!
    $priority: String!
    $author: ID!
    $assignee: ID!
    $project: ID!
    $type: String!
    $dateDue: String!
  ) {
    createBug(
      key: $key
      summary: $summary
      description: $description
      priority: $priority
      author: $author
      assignee: $assignee
      project: $project
      type: $type
      dateDue: $dateDue
    ) {
      id
    }
  }
`;

const CreateBug = () => {
  const user = useUser();
  const history = useHistory();
  const { addToast } = useToasts();
  const { data, loading } = useQuery(GET_USER_PROJECTS, {
    variables: { userID: user.id },
  });

  const [dateDueState, setDateDueState] = useState(new Date(Date.now()));
  const [descriptionValueState, setDescriptionValueState] = useState('');
  const [getMembers, { data: dataMembers }] = useLazyQuery(GET_PROJECT_MEMBERS);
  const [createBug] = useMutation(CREATE_NEW_BUG);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      bugDateDue: dateDueState,
      descriptionValue: descriptionValueState,
    },
  });

  registerLocale('enGB', enGB);
  const onSubmit = (formData) => {
    const {
      bugKey,
      projectName,
      bugType,
      bugSummary,
      bugDescription,
      bugPriority,
      bugAssignedUser,
      bugAuthor,
      bugDateDue,
    } = formData;
    try {
      createBug({
        variables: {
          key: bugKey,
          summary: bugSummary,
          description: bugDescription,
          priority: bugPriority,
          author: bugAuthor,
          assignee: bugAssignedUser,
          project: projectName,
          type: bugType,
          dateDue: bugDateDue,
        },
      });
      addToast('Bug successfully created!', {
        autoDismiss: true,
        appearance: 'success',
      });
      history.push('/dashboard');
    } catch (error) {
      addToast(`Oh no! ${error}`, {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  };

  const handleDateChange = (dateChange) => {
    setValue('bugDateDue', dateChange, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setDateDueState(dateChange);
  };

  const handleDescriptionChange = (descriptionChange) => {
    setValue('bugDescription', descriptionChange, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setDescriptionValueState(descriptionChange);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SingleColumnFlex>
      <CardHeader>
        <CardTitle>Create a new bug</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset style={{ marginBottom: '0.5rem' }}>
          <legend>Bug Details</legend>
          <FormGroup>
            <InputLabel htmlFor="projectName">Project name</InputLabel>
            <select
              id="projectName"
              {...register('projectName', { required: true })}
              onChange={(event) =>
                getMembers({ variables: { projectKey: event.target.value } })
              }
              data-cy="projectName-select"
            >
              <option value="" selected>
                Choose a project
              </option>
              {data &&
                data.getUserProjects.map((project) => (
                  <option key={project.projectKey} value={project.projectKey}>
                    {project.projectName}
                  </option>
                ))}
            </select>
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugKey">Bug key</InputLabel>
            <TextInput
              id="bugKey"
              type="text"
              placeholder="Bug key"
              data-cy="bugKey-input"
              {...register('bugKey', { required: true })}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugType">Bug type</InputLabel>
            <select
              data-cy="bugType-select"
              id="bugType"
              {...register('bugType', { required: true })}
            >
              <option selected value="defect">
                Defect
              </option>
              <option value="enhancement">Enhancement</option>
            </select>
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugSummary">Bug summary</InputLabel>
            <TextInput
              id="bugSummary"
              type="text"
              data-cy="bugSummary-textInput"
              placeholder="Enter a short summary of the bug"
              {...register('bugSummary', { required: true })}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugDescription">Bug description</InputLabel>
            <Controller
              render={({ field: { value } }) => (
                <MDEditor
                  value={value}
                  onChange={(event) => handleDescriptionChange(event)}
                  preview="edit"
                  height="250"
                  visiableDragbar="false"
                />
              )}
              data-cy="bugDescription-textInput"
              name="bugDescription"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugDateDue">Due date</InputLabel>
            <Controller
              render={({ field: { value } }) => (
                <DatePicker
                  selected={dateDueState}
                  value={value}
                  onChange={(event) => handleDateChange(event)}
                  placeholderText="Select date"
                  locale="enGB"
                  dateFormat="dd/MM/yyyy"
                  todayButton="Today"
                />
              )}
              data-cy="bugDateDue-selector"
              name="bugDateDue"
              control={control}
              rules={{ required: true }}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugPriority">Priority</InputLabel>
            <select
              id="bugPriority"
              {...register('bugPriority', { required: true })}
              data-cy="bugPriority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugAssignedUser">Assignee</InputLabel>
            <select
              id="bugAssignedUser"
              data-cy="bugAssignedUser-select"
              {...register('bugAssignedUser', { required: true })}
            >
              <option value="" disabled selected>
                Bug Assignee
              </option>
              {dataMembers &&
                dataMembers.getProjectMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
            </select>
          </FormGroup>
          <FormGroup>
            <InputLabel htmlFor="bugAuthor">Author</InputLabel>
            <select
              data-cy="bugAuthor-select"
              id="bugAuthor"
              {...register('bugAuthor', { required: true })}
            >
              <option value="" disabled selected>
                Bug Author
              </option>
              {dataMembers &&
                dataMembers.getProjectMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
            </select>
          </FormGroup>
        </fieldset>
        <SubmitButton data-cy="createBug-submit" type="submit">
          Create bug
        </SubmitButton>
      </form>
    </SingleColumnFlex>
  );
};

export default CreateBug;
