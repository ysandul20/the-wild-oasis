import styled, { css } from "styled-components";

const Row = styled.div`
   display: flex;
   /* align-items: center; */
   ${(props) =>
      props.type === "horizontal" &&
      css`
         justify-content: space-between;
         gap: 8px;
      `}
   ${(props) =>
      props.type === "vertical" &&
      css`
         flex-direction: column;
      `}
`;
Row.defaultProps = { type: "horizontal" };
export default Row;
