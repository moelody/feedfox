import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CloseIcon } from "./Icons";
import AddFeed from "./AddFeed";
import AddFeedJson from "./AddFeedJson";
import Tags from "./Tags";

const MenuNav = styled(motion.nav)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.bg};
  z-index: 99;
  padding: 1rem;

  svg.close-nav {
    fill: ${(props) => props.theme.accent};
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin: 1rem 0;
  }

  svg.close-nav:hover {
    fill: ${(props) => props.theme.red};
  }

  @media screen and (max-width: 530px) {
    justify-content: space-between;
  }
`;

const variants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const Nav = ({ navOpen, setNavOpen }) => {
  return (
    <MenuNav
      variants={variants}
      initial="closed"
      animate={navOpen ? "open" : "closed"}
      transition={{ damping: 300 }}
    >
      <ul>
        <AddFeed setNavOpen={setNavOpen} />
        <AddFeedJson setNavOpen={setNavOpen} />
        <Tags setNavOpen={setNavOpen} />
      </ul>
      <CloseIcon className="close-nav" onClick={() => setNavOpen(false)} />
    </MenuNav>
  );
};

export default Nav;
