import React from "react";
import styled from "styled-components";

import InfometrixCard from "../images/InfometrixCard.svg";
import InfometrixLogo from "../images/infometrixDarkCompact.svg";
import SoundklipsCard from "../images/SoundklipsCard.svg";
import SoundklipsLogo from "../images/SKLogoFullNotLevel.svg";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  height: auto;
  padding: 0 0px;
  flex-wrap: no-wrap;
  // margin: 0 5px;
  // border: 1px solid blue;
  // background-color: white;
  // border-radius: 5px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: start;
  // align-items: start;
  // border-bottom: 1px solid lightgrey;
  width: 100%;
  height: auto;
  max-height: ;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  // border: 1px solid green;
  flex-1;
  // width: 100%;
  height: auto;
  flex-wrap: wrap;
  padding: 50px 0;

  @media only screen and (max-width: 932px) {
    justify-content: center;
    align-items: center;
  }
`;

const ProjectCardWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // border: 1px solid brown;
  // flex: 1;
  // flex-shrink: 1;
  // width: 100%;
  min-width: 288px;
  // max-width: 450px;
  height: auto;
  min-height: 360px;
  max-height: 360px;
  // padding: 500px 0;
  margin: 0 auto;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  transform: scale(0.99);
  transition: ease-in-out 250ms;

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 1px 5px 10px 5px rgba(0, 0, 0, 0.13);
    transform: scale(1);
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  &:active {
    border: 0px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.11);
  }

  &:hover .card-header {
    border-image: linear-gradient(
        to left,
        rgb(97, 196, 62, 1),
        rgb(97, 196, 62, 0.5),
        rgb(97, 196, 62, 0.7)
      )
      3;
  }

  &:hover .card-image-bg {
    opacity: 1;
  }

  @media only screen and (max-width: 550px) {
    margin: 0;
  }
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  // width: 450px;
  // min-width: 288px;
  // max-width: 400px;
  width: 100%;
  height: auto;
  // max-height: 375px;
  // border: 1px solid red;

  @media only screen and (max-width: 550px) {
    width: 100%;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // flex: 1;
  width: 100%;
  // max-width: 150px;
  height: auto;
  border-bottom: 3px solid;
  padding: 5px 0;
  transition: ease-in-out 500ms;
  padding: 20px 0;

  border-image: linear-gradient(
      to right,
      rgb(54, 68, 79, 0.1) 25%,
      rgb(54, 68, 79, 0.1) 25%,
      rgb(54, 68, 79, 0.2) 25%,
      rgb(54, 68, 79, 0.2) 25%
    )
    4;

  img {
    transition: filter ease-in-out 350ms;
    height: 60px;
    // height: auto;
    // width: 100%;
    max-width: 250px;
    // filter: grayscale(100%);
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  // border: 1px solid yellow;
  // flex: 1;
  width: 100%;
  // width: 450px;
  // min-width: 325px;
  // max-width: 450px;
  height: 250px;
  min-height: 250px;
  max-height: 350px;
  border-radius: 5px;

  .card-image-bg {
    transition: ease-in-out 500ms;
    width: 100%;
    max-width: 100%;
    height: 100%;
    opacity: 0.9;
  }

  @media only screen and (max-width: 934px) {
    // width: 288px;
    min-width: 100%;
    min-width: 500px;
  }
  @media only screen and (max-width: 525px) {
    // width: 288px;
    min-width: 350px;
  }
`;

const ProjectText = styled.div`
  display: flex;
  font-size: 1.2em;
  font-weight: 400;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  // border: 1px solid red;
  flex: 1;
  flex-shrink: 0;
  // width: 550px;
  min-width: 300px;
  // min-width: 550px;
  max-width: 800px;
  height: auto;
  padding: 10px 15px;

  ul {
    padding: 20px 0 0 30px;
  }

  li {
    padding: 15px 0 0 0px;
  }

  p {
    color: rgb(100, 100, 100, 1);
  }

  strong {
    color: ${(props) => props.theme.fontColor};
  }

  @media only screen and (max-width: 550px) {
    width: 288px;
  }
`;

const ProjectItem = () => {
  return (
    <>
      <ProjectContainer>
        <ProjectWrapper>
          <ProjectContent>
            <a
              href="http://www.infometrix.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProjectCardWrapper>
                <CardHeaderWrapper className="card-header-wrap">
                  <ProjectHeader className="card-header">
                    <div>
                      <img src={InfometrixLogo} alt="infometrix"></img>
                    </div>
                  </ProjectHeader>

                  <ProjectCard className="project-card">
                    {/* <img src={InfometrixCard} alt="infometrix card"></img> */}
                    <div
                      className="card-image-bg"
                      style={{
                        backgroundImage: `url("${InfometrixCard}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </ProjectCard>
                </CardHeaderWrapper>
              </ProjectCardWrapper>
            </a>
            <ProjectText>
              <p>
                <strong>Infometrix</strong> is a data analytics and
                visualization website. It provides dashboards on topics
                regarding public health and the economy. It was my first project
                using React and I learned a lot about state management and the
                component life lifecycle.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Features:</strong> Tableau and Power BI dashboards,
                    responsive web design, and a web-scrapping data pipeline
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Web Stack:</strong> React, Flask, MySQL,
                    mysql-connector, and NGINX
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cloud:</strong> AWS RDS and EC2
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Challenge:</strong> Scrapping web data with
                    inconsistent update times
                  </p>
                </li>

                <li>
                  <p>
                    <strong>Solution:</strong> Created more robust ETL scripts
                    when extracting from data source
                  </p>
                </li>
              </ul>
            </ProjectText>
          </ProjectContent>
        </ProjectWrapper>
      </ProjectContainer>
      <ProjectContainer>
        <ProjectWrapper>
          <ProjectContent>
            <a
              href="https://soundklips.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProjectCardWrapper>
                <CardHeaderWrapper className="card-header-wrap">
                  <ProjectHeader className="card-header">
                    <img src={SoundklipsLogo} alt="infometrix"></img>
                  </ProjectHeader>
                  <ProjectCard className="project-card">
                    <div
                      className="card-image-bg"
                      style={{
                        backgroundImage: `url("${SoundklipsCard}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </ProjectCard>
                </CardHeaderWrapper>
              </ProjectCardWrapper>
            </a>
            <ProjectText>
              <p>
                <strong>Soundklips</strong> is an audio sample sharing and
                management website. This project aims to provide a platform for
                musicians, audio engineers, producers, and sound designers to
                share audio files with one another. It's a work in progress and
                I plan on adding new features over time.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Features:</strong> Uploading files and editing audio
                    file meta data, user sign up and login, audio waveform
                    display, and dark/light theme
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Web Stack:</strong> React, Flask, Docker,
                    PostgreSQL, and SQLAlchemy
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Cloud:</strong> GC SQL, GC Storage, GC Run, and GC
                    Build
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Challenge:</strong> Displaying audio wave forms
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Solution:</strong> Created RestfulAPI to extract
                    audio file's peak meta data and rendered the audio peaks
                    using React waveform module
                  </p>
                </li>
              </ul>
            </ProjectText>
          </ProjectContent>
        </ProjectWrapper>
      </ProjectContainer>
    </>
  );
};

export default ProjectItem;
