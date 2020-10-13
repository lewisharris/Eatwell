import styled from "styled-components";

const InputPages = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  background: ${props => props.theme.lighter};
  min-height: 100vh;
`;

export default InputPages;
