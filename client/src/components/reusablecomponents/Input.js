import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: relative;
  margin: 10px auto;
  width: 100%;
`;
const FormInput = styled.input`
  height: 50px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.primary};
  :focus {
    border: 1px solid ${props => props.theme.primary};
  }
`;
const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 10px;
  font-size: 10px;
  color: ${props => props.theme.primary};
  transform: translateY(-50%);
  background: white;
  padding: 10px;
`;

export default function Input(props) {
  const { type, value, onChange, placeholder, name } = props;
  return (
    <Container>
      <Label>{props.label}</Label>
      <FormInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </Container>
  );
}
