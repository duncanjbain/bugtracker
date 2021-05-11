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
  query getProjectMembers($projectID: ID!) {
    getProjectMembers(projectID: $projectID) {
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

  // eslint-disable-next-line no-unused-vars
  const [dateDueState, setDateDueState] = useState(new Date(Date.now()));
  const [getMembers, { data: dataMembers }] = useLazyQuery(GET_PROJECT_MEMBERS);
  const [createBug] = useMutation(CREATE_NEW_BUG);
  const { register, handleSubmit, control, setValue } = useForm();
  const [descriptionValue, setDescriptionValue] = React.useState('');

  registerLocale('enGB', enGB); // register it with the name you want

  const onSubmit = async (formData) => {
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
      await createBug({
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
    });
    setDateDueState(dateChange);
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
        <FormGroup>
          <InputLabel htmlFor="projectName">Project name</InputLabel>
          <select
            id="projectName"
            name="projectName"
            ref={register({ required: true })}
            onChange={(event) =>
              getMembers({ variables: { projectID: event.target.value } })
            }
          >
            <option value="" selected>
              Choose a project
            </option>
            {data &&
              data.getUserProjects.map((project) => (
                <option key={project.id} value={project.id}>
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
            name="bugKey"
            ref={register({ required: true })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugType">Bug type</InputLabel>
          <select
            id="bugType"
            name="bugType"
            ref={register({ required: true })}
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
            placeholder="Enter a short summary of the bug"
            name="bugSummary"
            ref={register({ required: true })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugDescription">Bug description</InputLabel>
          <Controller
            as={
              <MDEditor
                value={descriptionValue}
                onChange={setDescriptionValue}
                preview="edit"
                height="250"
                visiableDragbar="false"
              />
            }
            name="bugDescription"
            control={control}
            defaultValue=""
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugDateDue">Due date</InputLabel>
          <Controller
            render={() => (
              <DatePicker
                selected={dateDueState}
                value={dateDueState}
                onChange={handleDateChange}
                placeholderText="Select date"
                locale="enGB"
                dateFormat="dd/MM/yyyy"
                todayButton="Today"
              />
            )}
            name="bugDateDue"
            control={control}
            defaultValue=""
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugPriority">Priority</InputLabel>
          <select
            id="bugPriority"
            name="bugPriority"
            ref={register({ required: true })}
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
            name="bugAssignedUser"
            ref={register({ required: true })}
          >
            <option value="" disabled selected hidden>
              Assign person
            </option>
            {dataMembers ? (
              dataMembers.getProjectMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))
            ) : (
              <option value="" disabled selected hidden>
                Choose a project
              </option>
            )}
          </select>
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugAuthor">Author</InputLabel>
          <select
            id="bugAuthor"
            name="bugAuthor"
            ref={register({ required: true })}
          >
            {dataMembers ? (
              dataMembers.getProjectMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))
            ) : (
              <option value="" disabled selected hidden>
                Choose a project
              </option>
            )}
          </select>
        </FormGroup>
        <SubmitButton type="submit">Create bug</SubmitButton>
      </form>
    </SingleColumnFlex>
  );
};

export default CreateBug;
