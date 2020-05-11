import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadIcon } from "./Icons";

const Wrapper = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const LoadJson = () => {
  return (
    <Wrapper href="https://drive.google.com/file/d/1io4cwvR35uoNI1qJF0ToueoiJFqwkZ6r/view">
      <LoadIcon />
      <span>Try Feed</span>
    </Wrapper>
  );
};

export default LoadJson;
