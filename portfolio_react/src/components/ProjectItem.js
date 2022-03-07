import React from "react";
import styled from "styled-components";
// Images
import InfometrixCard from "../images/InfometrixCard.svg";
import InfometrixLogo from "../images/infometrixDarkCompact.svg";
import SoundklipsCard from "../images/SoundklipsCard.svg";
import SoundklipsLogo from "../images/SKLogoFullNotLevel.svg";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;
  width: 100%;
  padding: 0 0px;
  flex-wrap: no-wrap;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  flex-1;
  flex-wrap: wrap;
  padding: 50px 0;

  @media only screen and (max-width: 932px) {
    justify-content: center;
    align-items: center;
  }
`;

const ProjectCardWrapper = styled.div`
  display: flex;
  min-width: 288px;
  height: auto;
  min-height: 360px;
  max-height: 360px;

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

  &:hover .code-btn {
    display: flex;
    // opacity: 1;
    transition: ease-in-out 500ms; 
  }

  .code-btn {
    position: absolute;
    display: none; 
    bottom: 5px;
    right: 5px;  
    justify-self: start;
    align-self: center;
    // opacity: 0; 
    justify-content: center;
    align-items; center; 
    padding: 8px;
    color: white;
    background-color:#f6773d;
    border-radius: 5px;
    font-weight: 700;
    font-size: .7em;   
    cursor: pointer;
    transition: ease-in-out 350ms; 
    border: 2px solid #f6773d;
    width: 75px;  

    a {
      color: white;  
    }

    &:hover {
      color: #f6773d;
      background-color: white;
      border: 2px solid #f6773d;
      transform: scale(0.99);
      a {
        color:#f6773d 
      } 
    }  
  }

  @media only screen and (max-width: 550px) {
    margin: 0;
  }
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    max-width: 250px;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
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
    min-width: 500px;
  }

  @media only screen and (max-width: 525px) {
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
  flex: 1;
  flex-shrink: 0;
  min-width: 300px;
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
                  <div><a href="https://github.com/JaredMabus?tab=repositories" 
          target="_blank"
          rel="noopener noreferrer"><div className="code-btn">Code</div></a></div>
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
                    <strong>Solution:</strong> Created more more robust ETL pipeline
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
            <div>
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
                <div><a href="https://github.com/soundklips" 
          target="_blank"
          rel="noopener noreferrer"><div className="code-btn">Code</div></a></div>
              </ProjectCardWrapper>
            </a>
            </div>
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
                    <strong>Solution:</strong> Created RestfulAPI to extract an
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
