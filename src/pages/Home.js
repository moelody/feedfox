import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FeedContext } from "../context/FeedContext";
import FeedList from "../components/FeedList";
import Header from "../components/Header";
import NoFeeds from "../components/NoFeeds";

const Home = () => {
  const { userFeeds } = useContext(FeedContext);
  const [feeds, setFeeds] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const urls = userFeeds.map(
    (userFeed) =>
      `https://api.rss2json.com/v1/api.json?rss_url=${userFeed.url}&api_key=${apiKey}&count=25`
  );

  const getFeeds = async (url, index) => {
    const { data } = await axios.get(url);
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
      {!urls.length ? (
        <NoFeeds text="Add feeds to consume your content" />
      ) : (
        <FeedList feeds={feeds} />
      )}
    </div>
  );
};

export default Home;
