import React from "react";
import "../../styles/header/_backDrop.scss";
const BackDrop = props => {
  return <div className = "backdrop"
  onClick = {
    props.click
  }
  />;
};

export default BackDrop;