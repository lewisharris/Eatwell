import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: relative;
  margin: 10px auto;
`;
const SelectInput = styled.select`
  height: 50px;
  width: 250px;
  padding: 10px;
  border-radius: 10px;
  margin: 0px auto;
  background: ${props => props.theme.card};
  color: ${props => props.theme.textPrimary};
  border: 2px solid ${props => props.theme.primary};
  :focus {
    border: 2px solid ${props => props.theme.primary};
    background: ${props => props.theme.card};
  }
`;
const Label = styled.label`
  position: absolute;
  top: 0px;
  left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.primary};
  transform: translateY(-50%);
  background: ${props => props.theme.card};
  padding: 10px;
`;

export default function Select(props) {
  const { type, value, onChange, placeholder, name, options } = props;

  const renderedOptions = options.map(option => {
    return (
      <option key={option} value={option}>
        {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
      </option>
    );
  });

  return (
    <Container>
      <Label>{props.label}</Label>
      <SelectInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      >
        {renderedOptions}
      </SelectInput>
    </Container>
  );
}
