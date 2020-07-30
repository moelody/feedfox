import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tags from "./components/Tags";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import ViewFeed from "./pages/ViewFeed";
import ViewByTag from "./pages/ViewByTag";
import ViewBox from "./components/ViewBox";
import AddFeed from "./components/AddFeed";
import AddFeedJson from "./components/AddFeedJson";
import Layout from "./styles/Layout";

import { SwitchProvider } from "./context/SwitchContext";
import { ViewProvider } from "./context/ViewContext";

const SideBar = styled.div`
  margin: 1rem 1rem;
  .sidebar {
    position: sticky;
    top: 30px;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default () => (
  <Router>
    <ViewProvider>
      <SwitchProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:feed" component={Feed} />
            <Route exact path="/tags/:tag" component={ViewByTag} />
            <Route exact path="/:feed/:feedTitle" component={ViewFeed} />
          </Switch>
          <SideBar>
            <div className="sidebar">
              <ViewBox />
              <AddFeed />
              <AddFeedJson />
              <Tags />
            </div>
          </SideBar>
        </Layout>
      </SwitchProvider>
    </ViewProvider>
  </Router>
);
