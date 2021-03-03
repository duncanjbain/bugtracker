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
  transition: all 250ms ease 0s;
  margin-bottom: 1rem;
  &:hover {
    background: rgb(43, 108, 176);
  }
  &:focus {
    outline: 1px solid black;
  }
`;

export const FormGroup = styled.div`
  justify-content: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  height: 6rem;
`;

export const SignupFormContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: 1.5rem;
  font-weight: 400;
  padding-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TextInput = styled.input`
  padding: 0.5rem;
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
  font-size: 1.2rem;
`;
