import React from "react";
import styled from "styled-components";

// Styling

const Container = styled.div`
  position: relative;
  margin: 10px auto;
`;

const FormInput = styled.input`
  transition: all 0.4s ease-in-out;
  height: 50px;
  width: 100%;
  min-width: 250px;
  max-width: 350px;
  padding: 10px;
  border-radius: 10px;
  background: ${props => props.theme.card};
  color: ${props => {
    if (props.inactive) {
      return props.theme.textSecondary;
    } else {
      return props.theme.primary;
    }
  }};
  border: 2px solid
    ${props => {
      if (props.inactive) {
        return props.theme.textSecondary;
      } else {
        return props.theme.primary;
      }
    }};
  :active,
  :focus {
    -webkit-box-shadow: 0px 0px 5px 0px ${props => props.theme.primary},
      inset 0px 0px 5px 0px ${props => props.theme.primary};
    -moz-box-shadow: 0px 0px 5px 0px ${props => props.theme.primary},
      inset 0px 0px 5px 0px ${props => props.theme.primary};
    box-shadow: 0px 0px 5px 0px ${props => props.theme.primary},
      inset 0px 0px 5px 0px ${props => props.theme.primary};
    border: 2px solid ${props => props.theme.primary};
    background: ${props => props.theme.card};
    outline: none;
    color: ${props => props.theme.textPrimary};
    + label {
      transition: all 0.2s ease-in-out;
      color: ${props => props.theme.background};
      background: ${props => props.theme.primary};

      -webkit-box-shadow: 0px 0px 5px 0px ${props => props.theme.primary};
      -moz-box-shadow: 0px 0px 5px 0px ${props => props.theme.primary};
      box-shadow: 0px 0px 5px 0px ${props => props.theme.primary};
    }
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${props => props.theme.card} inset;
    -webkit-text-fill-color: ${props => props.theme.textPrimary};
  }
`;

const Label = styled.label`
  position: absolute;
  border-radius: 10px;
  top: 0px;
  left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => {
    if (props.inactive) {
      return props.theme.textSecondary;
    } else {
      return props.theme.primary;
    }
  }};
  transform: translateY(-50%);
  background: ${props => props.theme.card};
  padding: 10px;
`;

// Component

export default function Input(props) {
  const { type, value, onChange, placeholder, name, inactive } = props;
  return (
    <Container>
      <FormInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        inactive={inactive}
      />
      <Label htmlFor={name} inactive={inactive}>
        {props.label}
      </Label>
    </Container>
  );
}
