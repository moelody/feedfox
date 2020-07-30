import React from "react";
import styled from "styled-components";
import Player from "../components/Player";
import { getTwitterImg, getRedditImg, getYtId } from "../utils";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import Content from "../styles/Content";
import Button from "../styles/Button";
import { LeftArrow, MagnetIcon } from "../components/Icons";

const Wrapper = styled.div`
  margin: 1rem 0;
  width: 95%;

  h3 {
    margin-bottom: 0.3rem;
    color: ${(props) => props.theme.dark};
    font-weight: 500;
  }

  img.reddit-img,
  img.twitter-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin: 1rem 0;
    box-shadow: ${(props) => props.theme.bs1};
  }

  iframe {
    margin: 1rem 0;
    box-shadow: ${(props) => props.theme.bs1};
  }
`;

export default ({ location: { item } }) => {
  const redditFeed = item && item.link.includes("www.reddit.com");
  let redditImg = "";
  if (redditFeed) {
    redditImg = getRedditImg(item.description);
  }

  const ytFeed = item && item.link.includes("youtube.com");
  let ytId = "";
  if (ytFeed) {
    ytId = getYtId(item.guid);
  }

  const pixivFeed = item && item.link.includes("pixiv.net");

  const twitterFeed = item && item.guid && item.guid.includes("twitter.com");
  let twitterImg = "";
  if (twitterFeed) {
    twitterImg = getTwitterImg(item.description);
  }

  const torrentFeed =
    item &&
    item.enclosure &&
    item.enclosure.link &&
    item.enclosure.link.includes("magnet");

  return (
    <div>
      <Header />
      <div className="mainview">
        {!item ? (
          <NotFound />
        ) : (
          <Wrapper>
            {!twitterFeed && <h3>{item.title.replace(/&amp;?/, "&")}</h3>}
  
            {redditImg && (
              <img className="reddit-img" src={redditImg} alt="reddit" />
            )}
  
            {twitterImg && (
              <img className="twitter-img" src={twitterImg} alt="twitter" />
            )}
  
            {pixivFeed && (
              item.thumbnail.map((url) =>
                <img className="pixiv-img" src={url} alt="pixiv" width="30%"/>
              )
            )}
  
            {item.enclosure &&
              item.enclosure.type &&
              item.enclosure.type === "audio/mpeg" && (
                <Player url={item.enclosure.link} />
              )}
  
            <Content
              className="content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
  
            {torrentFeed && (
              <Button>
                <a href={item.enclosure && item.enclosure.link}>
                  Download <MagnetIcon />
                </a>
              </Button>
            )}
  
            {ytId && (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                frameBorder="0"
                width="100%"
                height="400px"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            )}
            {ytId && (
              <Button>
                <a href={item.link}>
                  View on YouTube <LeftArrow />
                </a>
              </Button>
            )}
          </Wrapper>
        )}
      </div>
    </div>
  );
};
