import styled from "styled-components";

const InputPages = styled.div`
  width: 100vw;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background: ${props => props.theme.lighter};
`;

export default InputPages;
