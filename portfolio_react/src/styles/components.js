import React from "react";
import { styled, createGlobalStyle } from "styled-components";

export const light = {
  main1: "#E5E5E5", //darkest
  main2: "#FAFAFA", // 2nd darkest
  main3: "#fff", // 3rd darkest
  secondary: "#F6773D",
  background: "#FAFFFD",
  //   fontColor: "#303030",
  fontColor: "#342E37",
  menu: "#FAFAFA",
  content: "#E5E5E5",
  hover: "#86CDCA",
  active: "",
  teal: "#54B9B5",
  white: "#fff",
  yellow: "#E2E700",
  formBg: "#fff",
  boxShadow: "3px 5px 3px 0px rgba(0,0,0,.3)",
  boxShadowSoft: "0px 15px 25px 8px rgba(0,0,0,.1)",
  modalBg: "rgba(243, 243, 243, 0.7)",
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
  hover: "#54B9B5",
  active: "#303030",
  teal: "#54B9B5",
  yellow: "#E2E700",
  white: "#fff",
  formBg: "#424242",
  boxShadow: "15px 5px 3px 10px rgba(5,5,5,5)",
  boxShadowSoft: "10px 10px 15px 8px rgba(10,10,10,.5)",
  modalBg: "rgba(150, 150, 150, 0.5)",
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
    // height: 100%; 
    min-height: 100%;
    width: 100%;
    background-color: rgba(200, 200, 200, 1);
    color: ${(props) => props.theme.fontColor};
    // background-color: ${(props) => props.theme.background};
    // background-image: linear-gradient(#FAFFFD, #FAFFFD, #52AD9C );
    // background-image: linear-gradient(120deg, rgba(255, 255,255, 1),rgba(240, 240, 240, .5),rgba(240, 240, 240, .9), rgba(240, 240, 240, .9));
  
    #root {
    height: 100%;
    min-width: 100%;
    
  }
`;
