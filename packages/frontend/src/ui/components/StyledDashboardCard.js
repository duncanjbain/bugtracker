import styled from 'styled-components';

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  border-top: 5px solid ${(props) => props.theme.colors.primary};
  color: #4a4a4a;
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  @media (${(props) => props.theme.media.lg}) {
    margin: 1rem auto 1rem auto;
    width: 95vw;
  }
`;

export const CardTitle = styled.h3`
  font-weight: 600;
`;
