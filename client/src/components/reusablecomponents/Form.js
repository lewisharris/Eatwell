import styled from "styled-components";

const Form = styled.form`
  background: ${props => props.theme.card};
  min-width: 300px;
  width: 80vw;
  min-height: 30vh;
  max-width: 350px;
  -webkit-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  padding: 30px 10px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
`;

export default Form;
