import React from "react";
import { styled, createGlobalStyle } from "styled-components";

export const light = {
  main1: "#E5E5E5", //darkest
  main2: "#FAFAFA", // 2nd darkest
  main3: "#fff", // 3rd darkest
  secondary: "#F6773D",
  background: "#FAFFFD",
  fontColor: "#342E37",
  menu: "#FAFAFA",
  content: "#E5E5E5",
};

export const dark = {
  main1: "#212121", //darkest
  main2: "#303030", // 2nd darkest
  main3: "#424242", // 3rd darkest
  secondary: "#F6773D",
  background: "#303030",
  fontColor: "#ededed",
  menu: "#212121",
  content: "#424242",
};

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none; 
  }

  html { 
    height: 100%;
    font-family: 'Montserrat', sans-serif; 
    -webkit-font-smoothing: antialiased;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: grayscale;
    // overflow-x: hidden;
    font-size: 16px; 
    
  }

  body {
    min-height: 100%;
    width: 100%;
    background-color: rgba(200, 200, 200, 1);
    color: ${(props) => props.theme.fontColor};

    #root {
      height: 100%;
      min-width: 100%;
  }
`;
