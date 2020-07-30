import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import rssjson from "../utils/rssjson";
import { useParams } from "react-router-dom";
import FeedItem from "../components/FeedItem";
import { FeedContext } from "../context/FeedContext";
import { slugify } from "../utils";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

import { ViewContext } from "../context/ViewContext";

const Feed = () => {
  const [items, setItems] = useState([]);
  const { feed } = useParams();
  const { userFeeds } = useContext(FeedContext);
  const { view } = useContext(ViewContext);

  const MainView = styled.div`
    {
      ${view === "Zmage" ? "": "column-count: 3;"} //多列的列数
    }
    @media screen and (max-width: 1000px) {
      ${view === "Zmage" ? "": "column-count: 1;"} //多列的列数
    }
  `;

  const match = userFeeds.find((userFeed) => {
    const title = slugify(userFeed.title);
    return title === feed;
  });

  const getFeedItems = async () => {
    if (!match.url) return null;
    const { items } = await rssjson(match.url);
    setItems(items);
  };

  useEffect(() => {
    getFeedItems();
  }, []);

  return (
    <div>
      <Header />
      <MainView className="mainview">
        {match.url ? (
          items.map((item, index) => <FeedItem key={index + item.title} item={item} />)
        ) : (
          <NotFound />
        )}
      </MainView>
    </div>
  );
};

export default Feed;
