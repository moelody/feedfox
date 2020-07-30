import React , { useContext }from "react";
import { useParams, Link } from "react-router-dom";
import FeedList from "../styles/FeedList";
import FeedCard from "../styles/FeedCard";
import { slugifyTitle, timeSince } from "../utils";
import { LinkIcon } from "../components/Icons";

import { ViewContext } from "../context/ViewContext";
import { SwitchContext } from "../context/SwitchContext";

const FeedItem = ({ item }) => {
  const { feed } = useParams();
  const titleSlug = slugifyTitle(item.title);

  const { view } = useContext(ViewContext);
  const { dispatch } = useContext(SwitchContext);

  let title = item.title && item.title.replace(/&amp;?/, "&");
  const author = item.author && item.author.replace(/&amp;?/, "&").split("-")[0];

  // for pixiv feed items
  const pixivFeed = item && item.link.includes("pixiv.net");

  // for twitter feed items
  if (item.guid && item.guid.includes("twitter.com")) {
    title = title.substr(0, 50) + "...";
  }

  if (view === "Zmage") {
    return (
      <FeedList onMouseOver={() => dispatch({type: 'change', urls: item.thumbnail})} onClick={() => dispatch({type: 'change', urls: item.thumbnail})}>
        <div>
          <Link
            to={{
              pathname: `${feed}/${titleSlug}`,
              item,
            }}
          >
            <h3>{title}</h3>
          </Link>

          <div className="feed-info">
            {item.author && <span>{author}</span>}
            {item.author && <span>·</span>}
            <span>{timeSince(item.pubDate)} ago</span>
          </div>
        </div>

        <a href={item.link} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
        </a>
      </FeedList>
    );
  } else {
    return (
      <FeedCard onMouseOver={() => dispatch({type: 'change', urls: item.thumbnail})} onClick={() => dispatch({type: 'change', urls: item.thumbnail})}>
        <div>
          <Link
            to={{
              pathname: `${feed}/${titleSlug}`,
              item,
            }}
          >
            <h3>{title}</h3>
          </Link>

          <div className="feed-info">
            {item.author && <span>{author}</span>}
            {item.author && <span>·</span>}
            <span>{timeSince(item.pubDate)} ago</span>
          </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {pixivFeed && (
                // item.thumbnail.map((url) =>
                //   <img className="card-img" src={url} alt="card" width="30%"/>
                // )
                <img className="card-img" src={item.thumbnail[0]} alt="card"/>
              )}
            </a>
        </div>
      </FeedCard>
    );
  }

};

export default FeedItem;
