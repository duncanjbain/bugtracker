import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../components/tags.css';
import { useUser } from '../context/UserContext';
import SingleColumnFlex from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { FormGroup, TextInput, InputLabel } from '../ui/components/StyledForm';
import LoadingSpinner from '../ui/components/LoadingSpinner';

// eslint-disable-next-line no-unused-vars
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
  const [getMembers, { data: dataMembers }] = useLazyQuery(GET_PROJECT_MEMBERS);
  const [createBug] = useMutation(CREATE_NEW_BUG);
  const { register, handleSubmit, control } = useForm();

  // eslint-disable-next-line no-unused-vars
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
    } = formData;

    try {
      await createBug({
        // eslint-disable-next-line no-underscore-dangle
        variables: {
          key: bugKey,
          summary: bugSummary,
          description: bugDescription,
          priority: bugPriority,
          author: bugAuthor,
          assignee: bugAssignedUser,
          project: projectName,
          type: bugType,
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

  const [value, setValue] = useState('**Hello world!!!**');
  const [selectedTab, setSelectedTab] = useState('write');
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
              <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(<ReactMarkdown source={markdown} />)
                }
              />
            }
            name="bugDescription"
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
        <button style={{ margin: '0.5rem' }} type="submit">
          Create
        </button>
      </form>
    </SingleColumnFlex>
  );
};

export default CreateBug;
