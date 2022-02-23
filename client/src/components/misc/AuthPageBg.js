import styled from "styled-components";

const AuthPageBg = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: relative;
  background: ${props => props.theme.background};
`;

export default AuthPageBg;
