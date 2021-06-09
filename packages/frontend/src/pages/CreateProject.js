import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SingleColumnFlex } from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import {
  FormGroup,
  TextInput,
  InputLabel,
  SubmitButton,
  ValidationErrMessage,
} from '../ui/components/StyledForm';

const CREATE_PROJECT = gql`
  mutation CreateProject($projectKey: String!, $projectName: String!) {
    createProject(projectKey: $projectKey, projectName: $projectName) {
      id
      projectName
    }
  }
`;

const createProjectValidationSchema = yup.object().shape({
  projectName: yup.string().required('A project name is required'),
  projectKey: yup.string().required('A project key is required'),
});

const CreateProject = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(createProjectValidationSchema),
  });
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
            {...register('projectName', { required: true })}
            aria-required="true"
            aria-invalid={errors.projectName ? 'true' : 'false'}
            className={errors.projectName ? 'error' : ''}
          />
          {errors.projectName && (
            <ValidationErrMessage id="projectName-error" role="alert">
              {errors.projectName.message}
            </ValidationErrMessage>
          )}
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="projectKey">Project key</InputLabel>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Enter a project key"
            {...register('projectKey', { required: true })}
          />
          {errors.projectKey && (
            <ValidationErrMessage id="projectKey-error" role="alert">
              {errors.projectKey.message}
            </ValidationErrMessage>
          )}
        </FormGroup>
        <SubmitButton type="submit">Create project</SubmitButton>
      </form>
    </SingleColumnFlex>
  );
};

export default CreateProject;
