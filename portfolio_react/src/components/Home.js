import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
// Components
import Nav from "./Nav";
import Project from "./Project";
// Images/Icons
import blob from "../images/ProfilePic.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  min-width: 100%;
  padding: 0 10%;

  background-image: linear-gradient(
    165deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
  );

  @media only screen and (max-width: 630px) {
    padding: 0 2% 0 2%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  //   min-width: 500px;
  //   max-width: 500px;
  height: auto;
  margin: 0 0 150px 0;
  padding: 150px 0 0px 0;

  img {
    min-width: 340px;
    max-width: 100%;
    height: auto;
  }

  .project-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-radius: 5px;
    cursor: pointer;
    height: 20px;
    min-width: 175px;
    max-width: 175px;
    padding: 20px 10px 20px 20px;
    margin: 20px 0 0 0;
    color: ${(props) => props.theme.fontColor};
    border: 2px solid #f6773d;
    background-color: white;
    box-shadow: inset 0 0 0 0 #f6773d;
    transition: ease-in-out 250ms;

    &:hover {
      box-shadow: inset 175px 0 0 0 #f6773d;
      color: white;
    }

    &:active {
      box-shadow: inset 175px 0 0 0 rgba(246, 119, 61, 0.5);
    }

    svg {
      height: 15px;
      padding: 3px 0 0 0;
    }
  }

  @media only screen and (max-width: 630px) {
    padding: 50px 5px 0 7px;
    // margin: 0 0 50px 0;
    img {
      margin: 20px 0 0 0;
    }
  }
`;

const InfoText = styled.div`
  display: row;
  flex-direction: column;
  min-width: 350px;
  max-width: 450px;
  margin: 0 0px 0 0;
  padding: 5px;

  h1 {
    font-size: 3.5em;
  }

  h3 {
    font-size: 1.5em;
    padding: 5px 0 0 0;
    font-weight: 400;
  }

  p {
    font-size: 1.2em;
    margin: 20px 0;
  }
`;

const Home = () => {
  return (
    <>
      <Nav />
      <HomePage>
        <InfoContainer>
          <InfoText>
            <h1 id="top">Hi, I'm Jared</h1>
            <hr></hr>
            <h3> Web Developer | Data Analyst</h3>
            <p>Below are some of my recent projects I've been working on.</p>
            <div className="project-btn">
              <ScrollLink
                to="projects"
                spy={true}
                smooth={true}
                duration={1000}
              >
                Projects <ArrowForwardIosIcon />
              </ScrollLink>
            </div>
          </InfoText>
          <div id="prof-img">
            <img src={blob} alt="profile" />
          </div>
        </InfoContainer>
        <Project />
      </HomePage>
    </>
  );
};

export default Home;
