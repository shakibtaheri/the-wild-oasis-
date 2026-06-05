import styled, { css } from "styled-components";

// Syntax Highliting by {css} function
const test = css`
  text-align: center;
`;

// since this a react component we start with uppercase
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: ${10 > 5 ? "30px" : "5px"};
      font-weight: 600;
      ${test}
    `}
`;

export default Heading;
