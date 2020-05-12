import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useParams, Link } from "react-router-dom";
import FeedCard from "../styles/FeedCard";
import { slugifyTitle, timeSince } from "../utils";
import { LinkIcon } from "../components/Icons";

const FeedItem = ({ item }) => {
  // drag to dismiss functionality
  const [feedCardActive, setFeedCardActive] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const { feed } = useParams();
  const titleSlug = slugifyTitle(item.title);

  let title = item.title && item.title.replace(/&amp;?/, "&");
  const author =
    item.author && item.author.replace(/&amp;?/, "&").split("-")[0];

  // for twitter feed items
  if (item.guid && item.guid.includes("twitter.com")) {
    title = title.substr(0, 50) + "...";
  }

  return (
    <AnimatePresence>
      {feedCardActive && (
        <motion.div
          exit={{ height: 0, opacity: 0, overflow: "hidden" }}
          transition={{ opacity: { duration: 0 } }}
        >
          <FeedCard
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x, opacity }}
            onDragEnd={(event, info) => {
              if (Math.abs(info.offset.x) > 100) {
                setFeedCardActive(false);
              }
            }}
          >
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
          </FeedCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedItem;
