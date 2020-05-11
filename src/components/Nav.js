import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CloseIcon } from "./Icons";
import AddFeed from "./AddFeed";
import AddFeedJson from "./AddFeedJson";
import Tags from "./Tags";

const MenuNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.bg};
  z-index: 2;
  padding: 1rem;

  .close-nav {
    fill: ${(props) => props.theme.accent};
    cursor: pointer;
    width: 30px;
    height: 30px;
    margin: 0.2rem 0;
  }

  .close-nav:hover {
    fill: ${(props) => props.theme.red};
  }
`;

const variants = {
  open: { x: 0 },
  closed: { x: "-100%", transition: { delay: 0.3 } },
};

const ulVariants = {
  open: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      // staggerDirection: -1,
    },
  },
  closed: {},
};

const liVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: -20, opacity: 0 },
};

const Nav = ({ navOpen, setNavOpen }) => {
  return (
    <MenuNav
      variants={variants}
      initial="closed"
      animate={navOpen ? "open" : "closed"}
      transition={{ damping: 1000 }}
    >
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <AddFeed setNavOpen={setNavOpen} />
        </motion.li>
        <motion.li variants={liVariants}>
          <AddFeedJson />
        </motion.li>
        <motion.li className="li" variants={liVariants}>
          <Tags setNavOpen={setNavOpen} />
        </motion.li>
      </motion.ul>
      <CloseIcon className="close-nav" onClick={() => setNavOpen(false)} />
    </MenuNav>
  );
};

export default Nav;
