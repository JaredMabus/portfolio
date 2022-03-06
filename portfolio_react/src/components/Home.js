import React from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
// Components
import Nav from "./Nav";
import Project from "./Project";
// Images/Icons
import ProfilePic from "../images/ProfilePic.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SectionSplitBG from "../images/SectionSplit.svg";
// import SectionSplitBG from "../images/SectionSplitCurved.svg";

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  min-width: 100%;
  //   padding: 0 10%;

  background-image: linear-gradient(
    165deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
  );

  @media only screen and (max-width: 630px) {
    // padding: 0 2% 0 2%;
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
  margin: 0 0 25px 0;
  padding: 150px 0 0px 0;
  //   background-color: rgba(255, 119, 61, 0.07);

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
      //   height: 15px;
      padding: 1px 0 0 3px;
      margin: 0 0 0 2px;
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
  padding: 20px;
  //   background-color: rgba(255, 119, 61, 0.07);
  //   border-radius: 20px;

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

const ReturnToTop = styled.div`
  display: flex;
  //   justify-self: center;
  //   align-self: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  //   font-size: 4em;

  svg {
    height: 50px;
    width: 75px;
  }

  .scroll-top-btn {
    display: flex;
    //   justify-self: center;
    //   align-self: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #f6773d;
    }
  }
`;

const SectionSplit = styled.div`
  height: 250px;
  max-width: 100%;
  margin-right: 150px;
  width: 100vw;
  background-image: url(${SectionSplitBG});
  background-position: left;
  background-size: cover;
  background-repeat: no-repeat;
  x-overflow: hidden;
  border-radius: 50p;
  margin: 150px 0 0 0;

  img {
    max-width: 100%;
  }
`;

const Home = () => {
  const accessibilityScroll = (id) => {
    const section = document.querySelector(`#${id}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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

            <ScrollLink
              to="projects"
              spy={true}
              smooth={true}
              duration={1000}
              tabIndex="0"
              onKeyDown={(e) => {
                e.key === "Enter" && accessibilityScroll("projects");
              }}
            >
              <div className="project-btn">
                Projects <ArrowForwardIosIcon />
              </div>
            </ScrollLink>
          </InfoText>
          <div id="prof-img">
            <img src={ProfilePic} alt="profile" />
          </div>
        </InfoContainer>
        <SectionSplit>{/* <img src={SectionSplitBG}></img> */}</SectionSplit>
        <Project />
        <ReturnToTop>
          <div
            className="scroll-top-btn"
            onClick={() => scroll.scrollToTop()}
            tabIndex="0"
            onKeyDown={(e) => {
              e.key === "Enter" && accessibilityScroll("top-nav");
            }}
          >
            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
            <p>Return to top</p>
          </div>
        </ReturnToTop>
      </HomePage>
    </>
  );
};

export default Home;
