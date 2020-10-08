import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: relative;
  margin: 10px auto;
`;
const FormInput = styled.input`
  height: 40px;
  border: 1px solid black;
  :focus {
    border: 1px solid ${props => props.theme.primary};
  }
`;
const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 10px;
  font-size: 8px;
  transform: translateY(-50%);
  background: white;
  padding: 10px;
`;

export default function Input(props) {
  const { type, value, onChange, placeholder } = props;
  return (
    <Container>
      <Label>{props.label}</Label>
      <FormInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Container>
  );
}
