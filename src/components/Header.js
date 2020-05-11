import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ToggleTheme from "./ToggleTheme";
import ChangeAccent from "./ChangeAccent";
import Nav from "./Nav";
import { NavIcon } from "./Icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  h1 {
    color: ${(props) => props.theme.accent};
    font-weight: 500;
    margin-right: 0.8rem;
  }

  svg.nav {
    display: none;
    fill: ${(props) => props.theme.color};
    margin-right: 0.6rem;
    cursor: pointer;
  }

  svg {
    margin: 0 0.4rem;
  }

  @media screen and (max-width: 530px) {
    svg.nav {
      display: block;
    }
  }
`;

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
      <Wrapper>
        <NavIcon className="nav" onClick={() => setNavOpen(true)} />
        <Link to="/">
          <h1>FeedFox</h1>
        </Link>
        <ToggleTheme />
        <ChangeAccent />
      </Wrapper>
    </>
  );
};

export default Header;
