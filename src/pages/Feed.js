import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedItem from "../components/FeedItem";
import { FeedContext } from "../context/FeedContext";
import { slugify } from "../utils";
import Header from "../components/Header";

const Feed = () => {
  const [items, setItems] = useState([]);
  const { feed } = useParams();
  const { userFeeds } = useContext(FeedContext);

  const match = userFeeds.filter((userFeed) => {
    const title = slugify(userFeed.title);
    return title === feed;
  });

  const apiKey = process.env.REACT_APP_API_KEY;
  const getFeedItems = async () => {
    const {
      data: { items },
    } = await axios.get(
      `http://api.rss2json.com/v1/api.json?rss_url=${match[0].url}&api_key=${apiKey}&count=25`
    );
    setItems(items);
  };

  useEffect(() => {
    if (!match.length) return null;
    getFeedItems();
  }, []);

  return (
    <div>
      <Header />
      {items && items.length
        ? items.map((item) => <FeedItem key={item.title} item={item} />)
        : null}
    </div>
  );
};

export default Feed;
