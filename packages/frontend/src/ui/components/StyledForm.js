import styled from 'styled-components';

export const FormHeader = styled.h2`
  margin-bottom: 2rem;
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
  user-select: none;
  cursor: pointer;
  transition: all 250ms ease 0s;
  &:hover {
    background: rgb(43, 108, 176);
  }
`;

export const FormGroup = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const SignupFormContainer = styled.div`
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

export const ValidationErrMessage = styled.div`
  color: ${(props) => props.theme.colors.danger};
  font-size: 1.5rem;
`;
