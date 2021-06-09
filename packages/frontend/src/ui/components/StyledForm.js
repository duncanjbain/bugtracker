import styled from 'styled-components';

export const FormHeader = styled.h2`
  margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  border-radius: 0.4rem;
  height: 2.5rem;
  background: ${(props) => props.theme.colors.link};
  color: white;
  outline: none;
  border: none;
  appearance: none;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 250ms ease 0s;
  &:hover {
    background: rgb(43, 108, 176);
  }
  &:focus {
    outline: 1px solid black;
  }
`;

export const SmallSubmitButton = styled(SubmitButton)`
  width: auto;
  margin-bottom: 0;
  height: auto;
`;

export const DangerButton = styled(SubmitButton)`
  background: ${(props) => props.theme.colors.danger};
  color: white;
  &:hover {
    background: hsl(348, 100%, 51%);
  }
`;

export const WarnButton = styled(SubmitButton)`
  background: ${(props) => props.theme.colors.warning};
  color: black;
  &:hover {
    background: hsl(48, 100%, 47%);
  }
`;

export const SuccessButton = styled(SubmitButton)`
  background: ${(props) => props.theme.colors.success};
  color: white;
  &:hover {
    background: hsl(141, 53%, 43%);
  }
`;

export const SmallSuccessButton = styled(SmallSubmitButton)`
  background: ${(props) => props.theme.colors.success};
  color: white;
  &:hover {
    background: hsl(141, 53%, 43%);
  }
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  @media (${(props) => props.theme.media.lg}) {
    width: 80%;
  }
`;

export const FormGroup = styled.fieldset`
  justify-content: start;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
  min-height: 5rem;
  border: 0;
  padding: 0;
  margin: 0;
`;

export const LoginFormGroup = styled.fieldset`
  justify-content: start;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
  min-height: 7rem;
  border: 0;
  padding: 0;
  margin: 0;
`;

export const SignupFormContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-weight: 400;
  padding-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TextInput = styled.input`
  padding: 0.25rem;
  width: 100%;
  border: 2px solid ${(props) => props.theme.colors.dark};
  border-radius: 4px;
  line-height: 1;
  transition: 180ms box-shadow ease-in-out;
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px hsla(171, 100%, 41%, 0.8);
  }
  &.error {
    border: 2px solid ${(props) => props.theme.colors.danger};
    &:focus {
      box-shadow: 0 0 0 3px hsla(348, 100%, 61%, 0.8);
    }
  }
`;

export const ValidationErrMessage = styled.span`
  color: ${(props) => props.theme.colors.danger};
  margin: 0.5rem;
`;
