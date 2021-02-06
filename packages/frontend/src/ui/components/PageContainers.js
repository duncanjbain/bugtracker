import styled from 'styled-components';

const SingleColumnFlex = styled.section`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-top: 5px solid ${(props) => props.theme.colors.primary};
  color: #4a4a4a;
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
`;

export default SingleColumnFlex