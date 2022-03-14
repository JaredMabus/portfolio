import React from "react";
import styled from "styled-components";
import ProjectItem from "./ProjectItem";

const ProjectSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  height: auto;
  // padding: 0 10%;
  // margin: 275px 0 50px 0;
  // margin: 0 auto;

  h1 {
    font-size: 4em;
    margin: 0 0 25px 0;
  }

  @media only screen and (max-width: 630px) {
    padding: 0 2%;
    width: 95%;
  }
`;

const Project = () => {
  return (
    <>
      <ProjectSection>
        <h1 id="projects">Projects</h1>
        <ProjectItem />
      </ProjectSection>
    </>
  );
};

export default Project;
