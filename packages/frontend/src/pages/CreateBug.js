import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, gql } from '@apollo/client';
import ReactMde from 'react-mde';
import ReactMarkdown from "react-markdown"
import 'react-mde/lib/styles/css/react-mde-all.css';
import SingleColumnFlex from '../ui/components/PageContainers';
import { CardTitle, CardHeader } from '../ui/components/StyledDashboardCard';
import { FormGroup, TextInput, InputLabel } from '../ui/components/StyledForm';

// eslint-disable-next-line no-unused-vars
const GET_USER_PROJECTS = gql`
  query getUserProjects($userID: String!) {
    getUserProjects(userID: $userID) {
      _id
      projectName
      projectKey
    }
  }
`;

const CreateBug = () => {
  const { register, handleSubmit, control } = useForm();

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (formData) => {
    console.log(formData);
  };
  const [value, setValue] = useState('**Hello world!!!**');
  const [selectedTab, setSelectedTab] = useState('write');

  return (
    <SingleColumnFlex>
      <CardHeader>
        <CardTitle>Create a new bug</CardTitle>
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
          <InputLabel htmlFor="bugType">Bug type</InputLabel>
          <select
            id="bugType"
            name="bugType"
            ref={register({ required: true })}
          >
            <option value="Defect">Defect</option>
            <option value="Enhancement">Enhancement</option>
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
            <option value="id1">Low</option>
            <option value="id2">Medium</option>
            <option value="id3">High</option>
          </select>
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugLabels">Labels</InputLabel>
          <TextInput
            id="bugLabels"
            type="text"
            placeholder="Enter labels"
            name="bugLabels"
            ref={register({ required: true })}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugAssignedUser">Assignee</InputLabel>
          <select
            id="bugAssignedUser"
            name="bugAssignedUser"
            ref={register({ required: true })}
          >
            <option value="id1">Duncan Bain</option>
            <option value="id2">Bain Duncan</option>
          </select>
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor="bugAuthor">Author</InputLabel>
          <select
            id="bugAuthor"
            name="bugAuthor"
            ref={register({ required: true })}
          >
            <option value="id1">Duncan Bain</option>
            <option value="id2">Bain Duncan</option>
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
