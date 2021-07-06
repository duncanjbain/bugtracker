/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import MDEditor from '@uiw/react-md-editor';
import {
  FormGroup,
  TextInput,
  InputLabel,
  SubmitButton,
  WarnButton,
  SuccessButton,
  DangerButton,
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
    $dateDue: String
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
      dateDue: $dateDue
    ) {
      id
    }
  }
`;

const DELETE_BUG = gql`
  mutation DeleteBug($bugId: ID!) {
    deleteExistingBug(bugId: $bugId) {
      id
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

const EditBugDetails = ({ bug }) => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dateDueState, setDateDueState] = useState(new Date(Date.now()));
  const [descriptionValueState, setDescriptionValueState] = useState('');
  const [deleteExistingBug] = useMutation(DELETE_BUG);
  const [updateExistingBug] = useMutation(UPDATE_EXISTING_BUG);
  const [getMembers, { data: dataMembers }] = useLazyQuery(
    GET_PROJECT_MEMBERS,
    {
      variables: { projectKey: bug.project.projectKey },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
    }
  );

  registerLocale('enGB', enGB);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      bugDateDue: dateDueState,
      descriptionValue: descriptionValueState,
    },
  });
  const handleDelete = async (bugId) => {
    try {
      await deleteExistingBug({ variables: { bugId } });
      addToast('Bug successfully deleted!', {
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
          {...register('key', { required: false })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="type">Bug type</InputLabel>
        <select id="type" {...register('type', { required: false })}>
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
          {...register('summary', { required: false })}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="description">Bug description</InputLabel>
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
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="dateDue">Due date</InputLabel>
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
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="priority">Priority</InputLabel>
        <select id="priority" {...register('priority', { required: false })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="assignee">Assignee</InputLabel>
        <select
          id="assignee"
          {...register('assignee', { required: true })}
          onClick={() =>
            getMembers({ variables: { projectKey: bug.project.projectKey } })
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
          {...register('author', { required: true })}
          onClick={() =>
            getMembers({ variables: { projectKey: bug.project.projectKey } })
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
      {!confirmDelete && (
        <WarnButton type="button" onClick={() => setConfirmDelete(true)}>
          Delete Bug
        </WarnButton>
      )}
      {confirmDelete && (
        <div>
          <p>Are you sure?</p>
          <DangerButton type="button" onClick={() => handleDelete(bug.id)}>
            Yes
          </DangerButton>
          <SuccessButton type="button" onClick={() => setConfirmDelete(false)}>
            No
          </SuccessButton>
        </div>
      )}
    </form>
  );
};

export default EditBugDetails;
