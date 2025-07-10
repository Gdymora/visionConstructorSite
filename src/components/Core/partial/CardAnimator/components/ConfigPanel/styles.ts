// components/ConfigPanel/styles.ts
import styled from 'styled-components';

export const Panel = styled.div`
  background-color: rgba(45, 55, 72, 0.9);
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  max-height: 70vh;
  overflow-y: auto;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;

  h4 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export const RangeInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #1a202c;
  color: white;
  border: 1px solid #4a5568;
  border-radius: 0.25rem;
`;

export const ColorInput = styled.input`
  margin: 0.5rem 0;
  padding: 0;
  width: 50px;
  height: 25px;
`;

export const ValueSpan = styled.span`
  margin-left: 0.5rem;
`;

export const AnimateButton = styled.button`
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