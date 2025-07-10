// components/CodePanel/styles.ts
import styled from 'styled-components';

export const Panel = styled.div`
  grid-area: code;
  background-color: #1a202c;
  padding: 20px;
  border-radius: 8px;
  color: white;

  h3 {
    margin-bottom: 1rem;
  }
`;

export const CodeOutput = styled.pre`
  background-color: #2d3748;
  padding: 1rem;
  border-radius: 0.5rem;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: #a0aec0;
`;

export const CopyButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #4299e1;
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #3182ce;
  }
`;