import styled from "styled-components";

const P = styled.p`
  color: ${props => props.theme.textSecondary};
  text-align: left;
  margin: 5px 10px;
  font-weight: 600;
  font-size: ${props => (props.large ? "16px" : "12px")};
  font-style: ${props => (props.italic ? "italic" : "none")};
  padding: ${props => (props.indent ? "0px 20px" : "0")};
`;

export default P;
