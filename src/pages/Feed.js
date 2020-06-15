import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedItem from "../components/FeedItem";
import { FeedContext } from "../context/FeedContext";
import { slugify } from "../utils";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const Feed = () => {
  const [items, setItems] = useState([]);
  const { feed } = useParams();
  const { userFeeds } = useContext(FeedContext);


  const match = userFeeds.find((userFeed) => {
    const title = slugify(userFeed.title);
    return title === feed;
  });


  const apiKey = process.env.REACT_APP_API_KEY;
  const getFeedItems = async () => {
    if (!match.url) return null;
    const {
      data: { items },
    } = await axios.get(
      `https://api.rss2json.com/v1/api.json?rss_url=${match.url}&api_key=${apiKey}&count=25`
    );
    setItems(items);
  };

  useEffect(() => {
    getFeedItems();
  }, []);

  return (
    <div>
      <Header />
      {match.url ? (
        items.map((item) => <FeedItem key={item.title} item={item} />)
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Feed;
