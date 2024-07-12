import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  color: #1c4c5b;
  display: inline-block;
  width: 40px;
  height: 40px;

  &,
  &:after {
    box-sizing: border-box;
  }

  &:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 50%;
    border: 3.2px solid currentColor;
    border-color: currentColor transparent currentColor transparent;
    animation: ${spin} 0.6s linear infinite;
  }
`;

export default Spinner;
