import React, { useState, useEffect } from "react";
import styled from "styled-components";
import blob from "../images/blob.svg";
import ProjectItem from "./ProjectItem";

const ProjectSection = styled.div` 
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  width: 100%;
  //   min-width: 500px;
  //   max-width: 500px;
  height: auto;
  padding: 0px 10% 0px 10%;
  margin: 200px 0 200px 0;
  }
`;

const Header = styled.div`
  display: row;
  flex-direction: column;
  // min-width: 350px;
  // max-width: 350px;
  margin: 0 0 0 0;
  padding: 0;

  h1 {
    font-size: 4em;
    margin: 0 0 25px 0;
  }
`;

const Project = () => {
  return (
    <>
      <ProjectSection>
        <Header>
          <h1 id="projects">Projects</h1>
        </Header>
        <ProjectItem />
      </ProjectSection>
    </>
  );
};

export default Project;
