import styled from 'styled-components';

export const SubmitButton = styled.button`
  align-self: center;
`;

export const FormGroup = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: column;
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
