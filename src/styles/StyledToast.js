import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export default styled(ToastContainer).attrs({
  toastClassName: "toast",
})`
  .toast {
    background-color: ${(props) => props.theme.accent};
    font-family: ${(props) => props.theme.font};
    letter-spacing: 0.6px;
    font-size: 1rem;
  }
`;
