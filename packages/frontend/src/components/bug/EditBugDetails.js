/* eslint-disable no-param-reassign */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MDEditor from '@uiw/react-md-editor';
import {
  FormGroup,
  TextInput,
  InputLabel,
  SubmitButton,
} from '../../ui/components/StyledForm';

const UPDATE_EXISTING_BUG = gql`
  mutation UpdateExistingBug(
    $bugId: ID!
    $key: String
    $summary: String
    $description: String
    $priority: String
    $author: ID
    $assignee: ID
    $project: ID
    $type: String
  ) {
    updateExistingBug(
      bugId: $bugId
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

const GET_PROJECT_MEMBERS = gql`
  query getProjectMembers($projectID: ID!) {
    getProjectMembers(projectID: $projectID) {
      id
      name
    }
  }
`;

const EditBugDetails = ({ bug }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { register, handleSubmit, control } = useForm();
  const [value, setValue] = React.useState(bug.description);

  const [updateExistingBug] = useMutation(UPDATE_EXISTING_BUG);
  const [getMembers, { data: dataMembers }] = useLazyQuery(
    GET_PROJECT_MEMBERS,
    {
      variables: { projectId: bug.project.id },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
    }
  );

  const onSubmit = async (formData) => {
    // stolen from https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript/24190282
    const falsyRemoved = Object.entries(formData).reduce(
      // eslint-disable-next-line no-return-assign
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );

    try {
      await updateExistingBug({
        variables: { bugId: bug.id, ...falsyRemoved },
      });
      addToast('Bug successfully updated!', {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <InputLabel htmlFor="key">Bug key</InputLabel>
        <TextInput
          id="key"
          type="text"
          placeholder={bug.key}
          name="key"
          ref={register({ required: false })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="type">Bug type</InputLabel>
        <select id="type" name="type" ref={register({ required: false })}>
          <option selected value="defect">
            Defect
          </option>
          <option value="enhancement">Enhancement</option>
        </select>
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="summary">Bug summary</InputLabel>
        <TextInput
          id="summary"
          type="text"
          placeholder={bug.summary}
          name="summary"
          ref={register({ required: false })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="description">Bug description</InputLabel>
        <Controller
          as={
            <MDEditor
              value={value}
              onChange={setValue}
              preview="edit"
              height="250"
              visiableDragbar="false"
            />
          }
          name="description"
          control={control}
          defaultValue={bug.description}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="priority">Priority</InputLabel>
        <select
          id="priority"
          name="priority"
          ref={register({ required: false })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="assignee">Assignee</InputLabel>
        <select
          id="assignee"
          name="assignee"
          ref={register({ required: true })}
          onClick={() =>
            getMembers({ variables: { projectID: bug.project.id } })
          }
        >
          <option key={bug.assignee.id} value={bug.assignee.id} selected>
            {bug.assignee.name}
          </option>
          {dataMembers &&
            dataMembers.getProjectMembers
              .filter((member) => member.name !== bug.assignee.name)
              .map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
        </select>
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="author">Author</InputLabel>
        <select
          id="author"
          name="author"
          ref={register({ required: true })}
          onClick={() =>
            getMembers({ variables: { projectID: bug.project.id } })
          }
        >
          <option key={bug.assignee.id} value={bug.assignee.id} selected>
            {bug.assignee.name}
          </option>
          {dataMembers &&
            dataMembers.getProjectMembers
              .filter((member) => member.name !== bug.assignee.name)
              .map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
        </select>
      </FormGroup>
      <SubmitButton type="submit">Update Bug</SubmitButton>
    </form>
  );
};

export default EditBugDetails;
