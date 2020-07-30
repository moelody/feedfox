import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import rssjson from "../utils/rssjson";
import { FeedContext } from "../context/FeedContext";
import FeedList from "../components/FeedList";
import Header from "../components/Header";
import NoFeeds from "../components/NoFeeds";

export default () => {
  const { tag } = useParams();
  const { userFeeds } = useContext(FeedContext);
  const [feeds, setFeeds] = useState([]);

  const matchedFeeds = userFeeds.filter((userFeed) =>
    userFeed.tags.includes(tag)
  );

  const urls = matchedFeeds.map((matchedFeed) => {
    return matchedFeed.url;
  });

  const getFeeds = async (url, index) => {
    const data = await rssjson(url);
    data.meta = matchedFeeds[index];
    setFeeds((feeds) => [...feeds, data]);
  };

  useEffect(() => {
    setFeeds([]);
    console.log("hi");
    urls.forEach((url, index) => getFeeds(url, index));
  }, [tag, userFeeds]);

  return (
    <div>
      <Header />
        <div className="mainview">
          {!urls.length ? (
            <NoFeeds text="No feeds exist for this tag, add a new one" />
          ) : (
            <FeedList feeds={feeds} />
          )}
      </div>
    </div>
  );
};
