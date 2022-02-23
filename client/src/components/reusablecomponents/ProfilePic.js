import React from "react";
import styled from "styled-components";
import FaceIcon from "@material-ui/icons/Face";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Icon: {
    width: "100%",
    height: "100%",
    color: "white"
  }
});

const Container = styled.div`
  width: 100px;
  height: 100px;
  background: gray;
  border-radius: 100px;
  margin: 10px auto;
`;
export default function ProfilePic() {
  const classes = useStyles();
  return (
    <Container>
      <FaceIcon className={classes.Icon} />
    </Container>
  );
}
