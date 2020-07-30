import React from "react";
import { Link } from "react-router-dom";
import { LinkIcon } from "./Icons";
import { slugify } from "../utils";
import FeedList from "../styles/FeedList";
import RemoveFeed from "./RemoveFeed";

const Feed = ({ feed: { items, feed, meta } }) => {
  const slug = slugify(meta.title);

  return (
    <FeedList>
      <div>
        <div className="title-trash">
          <Link to={`/${slug}`}>
            <h3>{meta.title}</h3>
          </Link>
          <RemoveFeed title={meta.title} />
        </div>

        <Link to={`/${slug}`}>
          <p>
            {feed.description
              ? feed.description.substr(0, 70) + "..."
              : "No Description"}
          </p>
        </Link>
      </div>
      <a href={feed.link} target="_blank" rel="noopener noreferrer">
        <LinkIcon />
      </a>
    </FeedList>
  );
};

export default Feed;
