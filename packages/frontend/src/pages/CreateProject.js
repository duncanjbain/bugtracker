import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import SingleColumnFlex from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { FormGroup, TextInput, InputLabel } from '../ui/components/StyledForm';

const CREATE_PROJECT = gql`
  mutation CreateProject($projectKey: String!, $projectName: String!) {
    createProject(projectKey: $projectKey, projectName: $projectName) {
      id
      projectName
    }
  }
`;

const CreateProject = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [createProject] = useMutation(CREATE_PROJECT);

  const onSubmit = async (formData) => {
    const { projectKey, projectName } = formData;

    try {
      await createProject({
        variables: { projectKey, projectName },
      });
      addToast('Project created!', {
        autoDismiss: true,
        appearance: 'success',
      });
      history.push('/dashboard');
    } catch (error) {
      addToast('A project with this key already exists!', {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  };

  return (
    <SingleColumnFlex>
      <CardHeader>
        <CardTitle>Create a new project</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <InputLabel htmlFor="projectName">Project name</InputLabel>
          <TextInput
            id="projectName"
            type="text"
            placeholder="Enter a project name"
            name="projectName"
            ref={register({ required: true })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="projectKey">Project key</InputLabel>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Enter a project key"
            name="projectKey"
            ref={register({ required: true })}
          />
        </FormGroup>
        <button style={{ margin: '0.5rem' }} type="submit">
          Create
        </button>
      </form>
    </SingleColumnFlex>
  );
};

export default CreateProject;
