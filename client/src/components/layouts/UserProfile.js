import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProfilePic from "../reusablecomponents/ProfilePic";
import UserContext from "../../context/userContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${props => props.theme.card};
  min-width: 300px;
  width: 80vw;
  max-width: 350px;
  border-radius: 10px;
  -webkit-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 3px 3px 5px -1px rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin: 10px auto;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  min-width: 40%;
  hyphens: auto;
`;

const Heading = styled.h4`
  font-size: 24px;
  color: ${props => props.theme.primary};
  margin: 5px 0px;
`;

const P = styled.p`
  color: ${props => props.theme.textPrimary};
  font-size: 10px;
  margin: 5px 0px;
  font-weight: 600;
`;

export default function UserProfile(props) {
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState("");

  async function getUsername() {
    const name = await userData.user.username;
    await setUsername(name);
  }

  useEffect(() => {
    getUsername();
  }, [userData]);

  const { weight, height, calories } = props;
  return (
    <Container>
      <Details>
        <Heading>
          {username !== ""
            ? `${username.charAt(0).toUpperCase()}${username.slice(1)}`
            : username}
        </Heading>
        <P>Height:{height ? ` ${height}cm` : " "}</P>
        <P>Weight:{weight ? ` ${weight}Kg` : " "}</P>
        <P>Calories:{calories ? ` ${calories}Kcal` : " "}</P>
      </Details>
      <ProfilePic />
    </Container>
  );
}
