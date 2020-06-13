import React, { useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FeedContext } from "../context/FeedContext";
import useInput from "../hooks/useInput";
import { AddIcon } from "./Icons";

const Wrapper = styled.div`
  padding: 1rem;
  box-shadow: ${(props) => props.theme.bs1};
  background: ${(props) => props.theme.black};
  width: 390px;
  margin: 1rem 0;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    display: block;
    margin-bottom: 0.4rem;
    padding: 0.2rem;
    background: inherit;
    border: none;
    font-family: ${(props) => props.theme.font};
    font-size: 1rem;
    color: ${(props) => props.theme.color};
  }

  input::placeholder {
    color: ${(props) => props.theme.light};
    letter-spacing: 0.6px;
  }

  button {
    background: none;
    border: none;
  }

  svg {
    fill: ${(props) => props.theme.accent};
  }

  @media screen and (max-width: 400px) {
    width: 98%;

    form {
      display: block;
    }

    svg {
      margin-top: 1rem;
    }
  }
`;

const AddFeed = ({ setNavOpen }) => {
  const title = useInput("");
  const url = useInput("");
  const tags = useInput("");
  const { userFeeds, setUserFeeds } = useContext(FeedContext);

  const handleAddFeed = async (e) => {
    e.preventDefault();

    if (!title.value || !url.value)
      return toast.error("You need to enter the title and url");

    let tagList = tags.value ? tags.value.split(",") : [];
    tagList = tagList.map((tag) => tag.trim());

    // make sure the title and url is present already
    const match = userFeeds.filter(
      (userFeed) =>
        userFeed.title.includes(title.value.trim()) ||
        userFeed.url.includes(url.value.trim())
    );
    if (match.length)
      return toast.error("The title or url is already present");

    // notify the user if the url is not valid rss
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const res = await axios.get(
        `https://api.rss2json.com/v1/api.json?rss_url=${url.value.trim()}&api_key=${apiKey}&count=25`
      );
    } catch (err) {
      return toast.error("The url is not valid rss 😭");
    }

    setUserFeeds((userFeeds) => [
      ...userFeeds,
      {
        title: title.value.trim(),
        url: url.value.trim(),
        tags: tagList,
      },
    ]);

    title.setValue("");
    url.setValue("");
    tags.setValue("");

    if (setNavOpen) {
      setNavOpen(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleAddFeed}>
        <div>
          <input
            type="text"
            placeholder="Prisma"
            value={title.value}
            onChange={title.onChange}
          />
          <input
            type="text"
            placeholder="https://www.prisma.io/blog/rss.xml"
            value={url.value}
            onChange={url.onChange}
          />
          <input
            type="text"
            placeholder="GraphQL, Blogs"
            value={tags.value}
            onChange={tags.onChange}
          />
        </div>
        <button>
          <AddIcon type="submit" />
        </button>
      </form>
    </Wrapper>
  );
};

export default AddFeed;
