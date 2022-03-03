import React from "react";
import styled from "styled-components";

import InfometrixCard from "../images/InfometrixCard.svg";
import InfometrixLogo from "../images/infometrixDarkCompact.svg";
import SoundklipsCard from "../images/SoundklipsCard.svg";
import SoundklipsLogo from "../images/SKLogoFullNotLevel.svg";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  height: auto;
  padding: 0 0px;
  // border: 1px solid blue;
  // background-color: white;
  // border-radius: 5px;
`;

const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  // border-bottom: 1px solid lightgrey;
  width: 100%;
  height: auto;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // border: 1px solid green;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  padding: 15px 0;

  img {
    height: 75px;
    width: auto;
  }
`;

const ProjectCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 1px solid brown;
  flex: 1;
  flex-shrink; 0;
  // min-width: 100%; 
  // width: 100%;
  // max-width: 400px;
  height: auto;
  padding: 0 0 0px 0;
  border-radius: 5px;
  border: 2px solid rgba(0,0,0,.1); 
  box-shadow: 1px 1px 10px 1px rgba(0,0,0,.1);
  // transform: scale(.99); 
  transition: ease-in-out 250ms;
  

  &:hover {
    border: 2px solid rgba(0,0,0,.1); 
    box-shadow: 5px 5px 10px 2px rgba(0,0,0,.11);
    // transform: scale(1);
    // backface-visibility: hidden;
    // transform: translateZ(0);
    // -webkit-font-smoothing: subpixel-antialiased;
  }

  &:active {
    border: 0px solid rgba(0,0,0,.1); 
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,.11);
  }
  
  &:hover .card-header {
    border-image: linear-gradient(
        to left,
        rgb(97, 196, 62, 1),
        rgb(97, 196, 62, .5),
        rgb(97, 196, 62, .7)
      )
      3;

    // img {
    //   filter: grayscale(0%);
    // }
  }

  // &:hover .project-card {
  //   img {
  //     filter: grayscale(0%);
  //   }
  }
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  flex-1; 
  // width: 100%;
  max-width: 100%;
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // width: 100%;
  // max-width: 150px;
  flex: 1;
  height: auto;
  border-bottom: 3px solid;
  padding: 5px 0;
  transition: ease-in-out;

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
    width: auto;
    // filter: grayscale(100%);
  }
`;

const ProjectCard = styled.div`
  display: flex;
  // flex-direction: row;
  // justify-content: start;
  // align-items: start;
  // border: 1px solid yellow;
  width: 400px;
  min-width: 288px;
  // max-width: 100%;
  height: 250px;
  min-height: 250px;
  max-height: 350px;
  border-radius: 5px;
  min-height: 250px;
  // background-image: url(${InfometrixCard});
  // background-position: center;
  // background-size: cover;
  // background-repeat: no-repeat;

  img {
    height: auto;
    width: 100%;
    min-width: 100%;
    // border-radius: 15px;
    // filter: grayscale(100%);
  }

  @media only screen and (max-width: 480px) {
    width: 288px;
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
  flex-shrink: 1;
  min-width: 288px;
  max-width: 550px;
  height: auto;
  padding: 20px 15px;

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
                    <img src={InfometrixCard} alt="infometrix card"></img>
                  </ProjectCard>
                </CardHeaderWrapper>
              </ProjectCardWrapper>
            </a>
            <ProjectText>
              <p>
                <strong>Infometrix</strong> is a data analytics/visualization
                website. It provides dashboards on topics within public health
                and the economy.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Difficulties:</strong> AWS EC2, and RDS
                  </p>
                </li>

                <li>
                  <p>
                    <strong>Solution:</strong> AWS EC2, and RDS
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Web Stack:</strong> AWS EC2, and RDS
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
              href="http://www.infometrix.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ProjectCardWrapper>
                <CardHeaderWrapper className="card-header-wrap">
                  <ProjectHeader className="card-header">
                    <div>
                      <img src={SoundklipsLogo} alt="infometrix"></img>
                    </div>
                  </ProjectHeader>
                  <ProjectCard className="project-card">
                    <img src={SoundklipsCard} alt="infometrix card"></img>
                  </ProjectCard>
                </CardHeaderWrapper>
              </ProjectCardWrapper>
            </a>
            <ProjectText>
              <p>
                <strong>Infometrix</strong> is a data analytics/visualization
                website. It provides dashboards on topics within public health
                and the economy.
              </p>
              <ul>
                <li>
                  <p>
                    <strong>Difficulties:</strong> AWS EC2, and RDS
                  </p>
                </li>

                <li>
                  <p>
                    <strong>Solution:</strong> AWS EC2, and RDS
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Web Stack:</strong> Google Cloud Platform
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
