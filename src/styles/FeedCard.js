import styled from "styled-components";

export default styled.div`
  // float: left;
  display: flex;
  // vertical-align: top;
  justify-content: space-between;
  align-items: center;
  // margin: 1rem 0;
  background: ${(props) => props.theme.black};
  padding: 1rem;
  box-shadow: ${(props) => props.theme.bs1};
  border-radius: 4px;
  // width: 33%;
  // height: 450px;
  break-inside: avoid; //避免在主体框中插入任何中断（页面，列或区域）。
  cursor: pointer;
  margin-right: 3px;
  margin-bottom: 10px;

  img {
    max-width: 100%;
  }

  p,
  span {
    color: ${(props) => props.theme.light};
  }

  svg {
    fill: ${(props) => props.theme.accent};
  }

  div.title-trash {
    display: flex;

    svg {
      height: 18px;
      width: 18px;
      margin-left: 0.5rem;
      position: relative;
      top: 6px;
      fill: ${(props) => props.theme.light};
    }

    svg:hover {
      fill: ${(props) => props.theme.red};
    }
  }

  div.feed-info {
    display: flex;

    span {
      padding-right: 0.5rem;
    }
  }

  @media screen and (max-width: 530px) {
    width: 100%;
    margin-right: 0px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
