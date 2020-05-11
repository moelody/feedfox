import React, { useContext } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AddFileIcon } from "./Icons";
import { FeedContext } from "../context/FeedContext";

const Wrapper = styled.div`
  margin: 1.5rem 0;

  label {
    display: flex;
    cursor: pointer;
  }

  h3 {
    margin: 0 0.6rem;
  }

  input {
    display: none;
  }

  svg {
    fill: ${(props) => props.theme.accent};
  }
`;

export default ({ setNavOpen }) => {
  const { setUserFeeds } = useContext(FeedContext);

  const onChange = (e) => {
    const fr = new FileReader();

    fr.addEventListener("load", () => {
      try {
        const userFeeds = JSON.parse(fr.result);
        const type = Object.prototype.toString.call(userFeeds);
        console.log(type);

        // update the context and close the nav if on mobile
        if (type !== "[object Array]")
          return toast.error("The JSON structure failed to match 😭");

        setUserFeeds(userFeeds);
        if (setNavOpen) {
          setNavOpen(false);
        }
      } catch (err) {
        return toast.error("The file is not valid JSON 😭");
      }
    });
    fr.readAsText(e.target.files[0]);
  };

  return (
    <Wrapper>
      <label htmlFor="file-icon">
        <AddFileIcon />
        <h3>Import Json</h3>
      </label>
      <input id="file-icon" type="file" onChange={onChange} required={true} />
    </Wrapper>
  );
};
