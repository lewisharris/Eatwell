import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  max-width: 75%;
  @media (max-height: 700px) {
    margin: 5px auto;
  }
`;
const P = styled.p`
  color: ${props => props.theme.primary};
  font-size: 12px;
  font-weight: 700;
  margin: 5px auto;
  line-height: 1.5;
`;

const H5 = styled.h5`
  color: ${props => props.theme.primary};
  font-size: 18px;
  font-weight: 700;
`;

export default function WelcomeMessage(props) {
  const remainingCalories = props.leftCal;
  const [name, setName] = useState("");

  const formatName = () => {
    if (props.name) {
      setName(`${props.name.charAt(0).toUpperCase()}${props.name.slice(1)}`);
    }
  };

  useEffect(() => {
    formatName();
  }, [props.name]);

  return (
    <>
      {remainingCalories > 0 ? (
        <Container>
          <H5>{`Hi ${name},`}</H5>
          <P>
            Its looking like you're on track to stick to your plan today. Keep
            it up!
          </P>
        </Container>
      ) : (
        <Container>
          <H5>{`Uh-oh ${name},`}</H5>
          <P>
            it looks like you've gone over your calories for the day. Try to
            stay under your target in future to achieve your goals.
          </P>
        </Container>
      )}
    </>
  );
}
