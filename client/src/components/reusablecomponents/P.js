import styled from "styled-components";

const P = styled.p`
  color: ${props => props.theme.textSecondary};
  text-align: left;
  margin: 5px 10px;
  font-weight: 600;
  font-size: ${props => (props.large ? "16px" : "12px")};
`;

export default P;
