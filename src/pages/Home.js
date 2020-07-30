import React, { useState, useEffect, useContext } from "react";
import rssjson from "../utils/rssjson";
import { FeedContext } from "../context/FeedContext";
import FeedList from "../components/FeedList";
import Header from "../components/Header";
import NoFeeds from "../components/NoFeeds";

const Home = () => {
  const { userFeeds } = useContext(FeedContext);
  const [feeds, setFeeds] = useState([]);

  const urls = userFeeds.map(
    (userFeed) => userFeed.url
  );

  const getFeeds = async (url, index) => {
    const data = await rssjson(url);
    data.meta = userFeeds[index];
    setFeeds((feeds) => [...feeds, data]);
  };
  
  useEffect(() => {
    setFeeds([]);
    urls.forEach((url, index) => getFeeds(url, index));
    localStorage.setItem("userFeeds", JSON.stringify(userFeeds));
  }, [userFeeds]);

  return (
    <div>
      <Header />
      <div className="mainview">
        {!urls.length ? (
          <NoFeeds text="Add feeds to consume your content" />
        ) : (
          <FeedList feeds={feeds} />
        )}
      </div>
    </div>
  );
};

export default Home;
