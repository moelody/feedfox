import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { LoadIcon } from "./Icons";

const Wrapper = styled.h3`
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const LoadJson = () => {
  return (
    <Wrapper>
      <a href="https://drive.google.com/file/d/1NH6UsKu6xEoK_A3dsvV94b4k_jF7CXiN/view">
        <LoadIcon />
        <span>Try Feed</span>
      </a>
    </Wrapper>
  );
};

export default LoadJson;
